"use client"

import { useState, memo } from "react"
import { useAddItemMutation } from "../features/inventoryApi"

function AddInventoryForm() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
  })

  const [addItem, { isLoading }] = useAddItemMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.name || !form.quantity) return

    await addItem({
      name: form.name,
      quantity: Number(form.quantity),
    })

    setForm({ name: "", quantity: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">

      <h3 className="text-lg font-semibold">
        Add Inventory Item
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          placeholder="Item name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="input"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="input"
        />

      </div>

      <button
        disabled={isLoading}
        className="btn btn-primary w-fit"
      >
        {isLoading ? "Adding..." : "Add Item"}
      </button>

    </form>
  )
}

export default memo(AddInventoryForm)