"use client"

import { useMemo, useState } from "react"
import { Search, Truck, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react"

type SupplierStatus = "Active" | "Inactive" | "Delayed"

type Supplier = {
  id: string
  name: string
  email: string
  phone: string
  products: number
  status: SupplierStatus
  lastSupply: string
}

const mockSuppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Global Agro Ltd",
    email: "contact@globalagro.com",
    phone: "+234 801 234 5678",
    products: 120,
    status: "Active",
    lastSupply: "2026-04-10",
  },
  {
    id: "SUP-002",
    name: "Lagos Wholesale Hub",
    email: "info@lagoswholesale.ng",
    phone: "+234 802 987 6543",
    products: 85,
    status: "Delayed",
    lastSupply: "2026-04-05",
  },
  {
    id: "SUP-003",
    name: "Prime Distributors",
    email: "sales@primedist.com",
    phone: "+234 803 555 1122",
    products: 210,
    status: "Active",
    lastSupply: "2026-04-12",
  },
  {
    id: "SUP-004",
    name: "Urban Supply Co",
    email: "hello@urbansupply.com",
    phone: "+234 804 222 7788",
    products: 40,
    status: "Inactive",
    lastSupply: "2026-03-28",
  },
]

export default function SuppliersPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return mockSuppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const getStatusStyle = (status: SupplierStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "Inactive":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
      case "Delayed":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400"
    }
  }

  const getStatusIcon = (status: SupplierStatus) => {
    switch (status) {
      case "Active": return <CheckCircle size={14} />
      case "Inactive": return <XCircle size={14} />
      case "Delayed": return <Clock size={14} />
    }
  }

  return (
    <div className="min-h-screen w-full transition-colors fade-in">

      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold">
          Suppliers
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Manage your supplier network and track supply performance
        </p>
      </div>

      {/* SEARCH BAR - Using your .input class */}
      <div className="px-6 mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers by name or ID..."
            className="input pl-10 py-3" // Using your .input class
          />
        </div>
      </div>

      {/* GRID CARDS */}
      <div className="px-6 grid md:grid-cols-2 xl:grid-cols-2 gap-6 pb-10">

        {filtered.map((supplier) => (
          <div key={supplier.id} className="card group"> {/* Using your .card class */}
            
            {/* TOP ROW */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">
                  {supplier.name}
                </h2>
                <p className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                  {supplier.id}
                </p>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(supplier.status)}`}>
                {getStatusIcon(supplier.status)}
                {supplier.status}
              </span>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-4 text-sm border-y border-[var(--border)] py-4 my-4">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Email</p>
                <p className="truncate font-medium">{supplier.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Phone</p>
                <p className="font-medium">{supplier.phone}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Products</p>
                <p className="font-medium">{supplier.products} Items</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Last Supply</p>
                <p className="font-medium">{supplier.lastSupply}</p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-2">
              <button className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:opacity-80 transition-opacity">
                VIEW FULL PROFILE
                <ExternalLink size={14} />
              </button>

              <div className="p-2 rounded-lg bg-[var(--bg-soft)] text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                <Truck size={20} />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full card flex flex-col items-center justify-center py-20 text-center">
            <Search className="text-[var(--text-muted)] mb-4" size={40} />
            <p className="text-[var(--text-muted)]">
              No suppliers match your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}