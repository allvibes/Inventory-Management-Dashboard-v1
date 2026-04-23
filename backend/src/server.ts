import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes"
import inventoryRoutes from "./routes/inventory.routes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoutes)






mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(5000, () => console.log("Server running on 5000"))