"use client"

import { useMemo, useState } from "react"
import { Search, Package, Truck, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled"

type Order = {
  id: string
  customer: string
  date: string
  amount: number
  status: OrderStatus
}

const mockOrders: Order[] = [
  { id: "ORD-1001", customer: "John Doe", date: "2026-04-12", amount: 120, status: "Pending" },
  { id: "ORD-1002", customer: "Sarah Kim", date: "2026-04-10", amount: 340, status: "Shipped" },
  { id: "ORD-1003", customer: "Michael Lee", date: "2026-04-08", amount: 89, status: "Delivered" },
  { id: "ORD-1004", customer: "Aisha Bello", date: "2026-04-07", amount: 210, status: "Cancelled" },
]

// Mapping for cleaner logic
const STATUS_CONFIG = {
  Pending: { icon: Package, color: "text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400" },
  Shipped: { icon: Truck, color: "text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400" },
  Delivered: { icon: CheckCircle, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400" },
  Cancelled: { icon: XCircle, color: "text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400" },
}

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredOrders = useMemo(() => {
    const term = search.toLowerCase()
    return mockOrders.filter((o) => 
      o.customer.toLowerCase().includes(term) || o.id.toLowerCase().includes(term)
    )
  }, [search])

  return (
    <div className="fade-in min-h-screen w-full transition-colors pb-10">
      
      {/* HEADER SECTION */}
      <div className="px-6 py-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <button 
              onClick={() => router.back()}
              className="p-1 -ml-1 rounded-md hover:bg-[var(--bg-soft)] text-[var(--text-muted)]"
             >
               <ArrowLeft size={20} />
             </button>
             <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          </div>
          <p className="text-[var(--text-muted)] text-sm">
            Track and manage customer orders in real time.
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="px-6 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID or customer..."
            className="input pl-10" // Using the .input class from our CSS
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="px-6">
        <div className="card p-0 overflow-hidden overflow-x-auto shadow-sm">
          <table className="table">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {filteredOrders.map((order) => {
                const Config = STATUS_CONFIG[order.status]
                return (
                  <tr key={order.id} className="table-row-hover transition-colors group">
                    <td className="p-4 pl-6 font-semibold">{order.id}</td>
                    <td className="p-4 text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                      {order.customer}
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">{order.date}</td>
                    <td className="p-4 font-medium">${order.amount.toFixed(2)}</td>
                    <td className="p-4 pr-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${Config.color}`}>
                        <Config.icon size={14} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="py-20 text-center">
              <Package className="mx-auto mb-3 text-[var(--border)]" size={40} />
              <p className="text-[var(--text-muted)]">No orders match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}