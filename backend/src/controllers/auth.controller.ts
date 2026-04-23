import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.model"
import { generateToken } from "../utils/generateToken"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    const token = generateToken(user._id.toString(), user.role)

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      token,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = generateToken(user._id.toString(), user.role)

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      token,
    })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

//
// ✅ NEW: GET CURRENT USER (SESSION RESTORE)
//

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // 👇 req.user comes from your auth middleware (protect)
    const user = await User.findById((req as any).user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}