import express from "express"
import { login, register, getCurrentUser } from "../controllers/auth.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

// AUTH
router.post("/register", register)
router.post("/login", login)

// ✅ SESSION RESTORE ROUTE (NEW)
router.get("/me", authMiddleware, getCurrentUser)

export default router