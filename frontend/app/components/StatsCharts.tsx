"use client"

import { memo, useMemo } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

type Item = {
  _id: string
  name: string
  quantity: number
}

function StatsCharts({ data = [] }: { data?: Item[] }) {
  const { totalProducts, lowStock, outOfStock, chartData } = useMemo(() => {
    const safeData = Array.isArray(data) ? data : []

    const totalProducts = safeData.length
    const lowStock = safeData.filter(
      (item) => item.quantity > 0 && item.quantity <= 5
    ).length
    const outOfStock = safeData.filter((item) => item.quantity === 0).length

    const chartData = safeData.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    }))

    return { totalProducts, lowStock, outOfStock, chartData }
  }, [data])

  return (
    <div className="space-y-6 fade-in">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm opacity-70 uppercase tracking-wider">Total Products</h3>
          <p className="text-3xl font-bold mt-1">{totalProducts}</p>
        </div>

        <div className="card">
          <h3 className="text-sm opacity-70 uppercase tracking-wider">Low Stock</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-1">{lowStock}</p>
        </div>

        <div className="card">
          <h3 className="text-sm opacity-70 uppercase tracking-wider">Out Of Stock</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">{outOfStock}</p>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="card">
        <h3 className="text-sm mb-6 opacity-70 uppercase tracking-wider">
          Inventory Levels
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {/* Subtle grid lines that match your border token */}
              <CartesianGrid 
                vertical={false} 
                stroke="var(--border)" 
                strokeDasharray="3 3" 
              />
              
              <XAxis 
                dataKey="name" 
                stroke="var(--text-muted)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip 
                cursor={{ fill: "var(--bg-soft)", opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: "var(--bg-elevated)", 
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                itemStyle={{ 
                  color: "var(--primary)", 
                  fontWeight: "bold",
                  fontSize: "12px" 
                }}
                labelStyle={{
                  color: "var(--text)",
                  marginBottom: "4px",
                  fontWeight: "600"
                }}
              />

              <Bar 
                dataKey="quantity" 
                fill="var(--primary)" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default memo(StatsCharts)