import mongoose, { Document } from "mongoose"

export interface IInventory extends Document {
  name: string
  sku: string
  quantity: number
  price: number
  category: string
  supplier: string
  lowStockThreshold: number
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock"
}

const inventorySchema = new mongoose.Schema<IInventory>(
  {
    name: {
      type: String,
      required: true
    },

    sku: {
      type: String,
      required: true,
      unique: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 0
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      default: ""
    },

    supplier: {
      type: String,
      default: ""
    },

    lowStockThreshold: {
      type: Number,
      default: 5
    },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock"
    }
  },
  { timestamps: true }
)

export default mongoose.model<IInventory>("Inventory", inventorySchema)