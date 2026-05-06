"use client"

import AuthGuard from "../components/AuthGuard"
import InventoryTable from "../components/InventoryTable"
import StatsCharts from "../components/StatsCharts"
import AddInventoryForm from "../components/AddInventoryForm"
import { useGetInventoryQuery } from "../features/inventoryApi"

export default function Dashboard() {
  const { data = [], isLoading, error } = useGetInventoryQuery()

  return (
    <AuthGuard>
      <div className="space-y-6">

        {isLoading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            Error loading inventory
          </p>
        )}

        {!isLoading && !error && (
          <div className="space-y-6">
            <StatsCharts data={data} />
            <AddInventoryForm />
            <InventoryTable items={data} />
          </div>
        )}

      </div>
    </AuthGuard>
  )
}