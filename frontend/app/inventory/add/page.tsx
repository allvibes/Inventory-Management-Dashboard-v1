"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import { useAddInventoryMutation } from "@/features/inventoryApi"

export default function AddInventoryPage() {
  const router = useRouter()
  const [addInventory] = useAddInventoryMutation()

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await addInventory(form)

    router.push("/inventory")
  }

  return (
    <Container>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-zinc-800 rounded-xl shadow">

        <h1 className="text-xl font-bold mb-6">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Product Name"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <Button type="submit">
            Add Product
          </Button>

        </form>

      </div>
    </Container>
  )
}