"use client"

import { useState } from "react"
import InventoryTable from "../components/InventoryTable"
import { useGetInventoryQuery } from "../features/inventoryApi"
import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm } from "../store/slices/searchSlice"
import { Search } from "lucide-react"

export default function InventoryPage() {
  const dispatch = useDispatch()
  const { data = [], error, isLoading } = useGetInventoryQuery()

  // Global search state
  const searchTerm = useSelector((state: any) => state.search?.term || "")

  // Local input state
  const [input, setInput] = useState("")

  // 🔍 SEARCH HANDLER
  const handleSearch = () => {
    dispatch(setSearchTerm(input))
  }

  // Handle "Enter" key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const filteredData = data.filter((item: any) => {
    if (!searchTerm) return true
    return item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="px-6 pt-8 pb-10 fade-in">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Manage and track your stock levels across all categories
        </p>
      </div>

      {/* ✅ SEARCH BAR - Using your .input and .btn classes */}
      <div className="flex items-center gap-3 mb-8 max-w-md">
        <div className="relative flex-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search inventory..."
            className="input" // Using your Design System class
          />
        </div>

        <button
          onClick={handleSearch}
          className="btn btn-primary flex items-center justify-center aspect-square p-2.5"
          title="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {/* STATUS STATES */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-[var(--text-muted)] animate-pulse">Loading inventory...</p>
        </div>
      )}

      {error && (
        <div className="card border-red-500/20 bg-red-500/5">
          <p className="text-red-500 font-medium">
            Failed to load inventory. Please check your connection or login again.
          </p>
        </div>
      )}

      {/* TABLE SECTION */}
      {!isLoading && !error && (
        <div className="card p-0 overflow-hidden"> 
          {/* We wrap the table in a card but use p-0 so the table borders hit the edges nicely */}
          {filteredData.length > 0 ? (
            <InventoryTable items={filteredData} />
          ) : (
            <div className="p-10 text-center">
              <p className="text-[var(--text-muted)]">
                {searchTerm
                  ? `No results found for "${searchTerm}"`
                  : "Your inventory is currently empty."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}