"use client"

import { useGetInventoryQuery } from "./features/inventoryApi"
import Container from "./components/ui/Container"
import Confetti from "react-confetti"
import { useState } from "react"

export default function Dashboard() {
  const { data = [], isLoading, error } = useGetInventoryQuery()
  const [celebrate, setCelebrate] = useState(false)

  const totalItems = data.length
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0)
  const lowStock = data.filter((item) => item.quantity < 5)

  if (isLoading) {
    return (
      <Container>
        <p className="animate-pulse text-[var(--text-muted)] text-sm">
          Loading inventory...
        </p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <p className="text-red-600 dark:text-red-400 font-semibold">
          ⚠️ Failed to load inventory
        </p>
      </Container>
    )
  }

  return (
    <Container>
      {celebrate && <Confetti recycle={false} numberOfPieces={300} />}

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text)]">
          Inventory Dashboard
        </h1>

        <p className="mt-2 text-sm text-[var(--text-muted)] max-w-xl">
          Real-time overview of stock levels, performance, and supply health
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        {/* CARD */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm hover:shadow-md transition">
          <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
            Total Products
          </p>
          <p className="text-3xl font-bold mt-2 text-[var(--text)]">
            {totalItems}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm hover:shadow-md transition">
          <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
            Total Quantity
          </p>
          <p className="text-3xl font-bold mt-2 text-[var(--text)]">
            {totalQuantity}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm hover:shadow-md transition">
          <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
            Low Stock Alerts
          </p>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {lowStock.length}
          </p>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[var(--text)]">
          Inventory Items
        </h2>

        <span className="text-xs text-[var(--text-muted)]">
          Live dataset
        </span>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item) => (
          <div
            key={item._id}
            className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {/* NAME */}
            <h2 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition">
              {item.name}
            </h2>

            {/* QUANTITY */}
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Quantity:{" "}
              <span
                className={
                  item.quantity < 5
                    ? "text-red-500 font-bold"
                    : "text-[var(--text)] font-bold"
                }
              >
                {item.quantity}
              </span>
            </p>

            {/* PRICE */}
            <p className="mt-2 text-sm font-semibold text-[var(--text)]">
              ${item.price}
            </p>

            {/* LOW STOCK */}
            {item.quantity < 5 && (
              <p className="mt-3 text-xs font-semibold text-red-500">
                Low stock warning
              </p>
            )}
          </div>
        ))}
      </div>

      {/* MILESTONE */}
      {data.length >= 10 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setCelebrate(true)}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transition"
          >
            🎉 Milestone Reached
          </button>
        </div>
      )}

      {/* ALERT */}
      {lowStock.length > 0 && (
        <div className="mt-12 p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300">
          ⚠️ <span className="font-semibold">{lowStock.length}</span> products are running low on stock.
        </div>
      )}
    </Container>
  )
}