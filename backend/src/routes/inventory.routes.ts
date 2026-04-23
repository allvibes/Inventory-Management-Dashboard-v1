import express from "express"
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryStats
} from "../controllers/inventory.controller"
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

// ---------------------------
// GET inventory list (with pagination + search)
// Accessible by all authenticated users
// ---------------------------
router.get("/", getInventory)

// ---------------------------
// CREATE new inventory item
// Only accessible by admin
// ---------------------------
router.post("/", authMiddleware, roleMiddleware(["admin"]), createInventory)

// ---------------------------
// UPDATE existing inventory item
// Only accessible by admin
// ---------------------------
router.patch("/:id", authMiddleware, roleMiddleware(["admin"]), updateInventory)

// ---------------------------
// DELETE inventory item
// Only accessible by admin
// ---------------------------
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteInventory)

// ---------------------------
// GET dashboard stats (charts)
// Accessible by all authenticated users
// ---------------------------
router.get("/stats", authMiddleware, getInventoryStats)

export default router