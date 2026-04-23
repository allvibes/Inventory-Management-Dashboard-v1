import { Request, Response } from "express"
import Inventory, { IInventory } from "../models/inventory.model"

// ---------------------------
// GET INVENTORY (search + pagination)
// ---------------------------
export const getInventory = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string; search?: string }>,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search || ""

    // Search by name or SKU
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } }
      ]
    }

    const total = await Inventory.countDocuments(query)

    const items = await Inventory.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })

    res.json({
      data: items,
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error })
  }
}

// ---------------------------
// CREATE INVENTORY ITEM
// ---------------------------
export const createInventory = async (
  req: Request<{}, {}, Partial<IInventory>>,
  res: Response
) => {
  try {
    const {
      name = "",
      quantity = 0,
      price = 0,
      category = "",
      supplier = "",
      lowStockThreshold = 5,
      sku
    } = req.body

    // ✅ STOCK STATUS LOGIC
    let stockStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock"
    if (quantity === 0) stockStatus = "Out of Stock"
    else if (quantity <= lowStockThreshold) stockStatus = "Low Stock"

    // ✅ SKU HANDLING (HYBRID SYSTEM)
    let finalSku = sku

    // If no SKU provided → auto-generate
    if (!finalSku || finalSku.trim() === "") {
      const random = Math.random().toString(36).substring(2, 8).toUpperCase()
      finalSku = `SKU-${random}`
    }

    // ✅ ENSURE SKU IS UNIQUE
    const existingSku = await Inventory.findOne({ sku: finalSku })
    if (existingSku) {
      return res.status(400).json({
        message: "SKU already exists. Please use a different one."
      })
    }

    const item = await Inventory.create({
      name,
      quantity,
      price,
      category,
      supplier,
      lowStockThreshold,
      sku: finalSku,
      stockStatus
    })

    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: "Error creating inventory item", error })
  }
}

// ---------------------------
// UPDATE INVENTORY ITEM
// ---------------------------
export const updateInventory = async (
  req: Request<{ id: string }, {}, Partial<IInventory>>,
  res: Response
) => {
  try {
    const { id } = req.params
    const {
      quantity = 0,
      lowStockThreshold = 5,
      ...rest
    } = req.body

    let stockStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock"
    if (quantity === 0) stockStatus = "Out of Stock"
    else if (quantity <= lowStockThreshold) stockStatus = "Low Stock"

    const item = await Inventory.findByIdAndUpdate(
      id,
      { ...rest, quantity, lowStockThreshold, stockStatus },
      { new: true }
    )

    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory item", error })
  }
}

// ---------------------------
// DELETE INVENTORY ITEM
// ---------------------------
export const deleteInventory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params
    await Inventory.findByIdAndDelete(id)
    res.json({ message: "Item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item", error })
  }
}

// ---------------------------
// DASHBOARD STATS (for charts)
// ---------------------------
export const getInventoryStats = async (req: Request, res: Response) => {
  try {
    const totalProducts = await Inventory.countDocuments()

    const lowStock = await Inventory.countDocuments({
      stockStatus: "Low Stock"
    })

    const outOfStock = await Inventory.countDocuments({
      stockStatus: "Out of Stock"
    })

    const categories = await Inventory.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ])

    res.json({
      totalProducts,
      lowStock,
      outOfStock,
      categories
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory stats", error })
  }
}