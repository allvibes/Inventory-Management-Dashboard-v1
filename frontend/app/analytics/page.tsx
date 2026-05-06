"use client"

import {
  BarChart3,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    /* We use 'fade-in' from your CSS. 
       Note: We removed hardcoded bg-gray-50 so it uses your --bg variable from globals.css 
    */
    <div className="min-h-screen w-full transition-colors fade-in">
      
      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Real-time insights into your inventory performance
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Revenue - Using your .card class */}
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-muted)]">Revenue</p>
            <DollarSign className="text-green-500" size={18} />
          </div>
          <h2 className="text-2xl font-bold mt-2">
            $24,500
          </h2>
          <p className="text-xs text-green-500 mt-1">+12.4% this month</p>
        </div>

        {/* Sales */}
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-muted)]">Sales</p>
            <ShoppingCart className="text-blue-500" size={18} />
          </div>
          <h2 className="text-2xl font-bold mt-2">
            1,240
          </h2>
          <p className="text-xs text-blue-500 mt-1">+8.1% this month</p>
        </div>

        {/* Products */}
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-muted)]">Products</p>
            <Package className="text-purple-500" size={18} />
          </div>
          <h2 className="text-2xl font-bold mt-2">
            356
          </h2>
          <p className="text-xs text-purple-500 mt-1">+3 new added</p>
        </div>

        {/* Users */}
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-muted)]">Users</p>
            <Users className="text-orange-500" size={18} />
          </div>
          <h2 className="text-2xl font-bold mt-2">
            892
          </h2>
          <p className="text-xs text-orange-500 mt-1">+5.7% growth</p>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="px-6 mt-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Performance Overview
            </h2>
            <BarChart3 className="text-[var(--text-muted)]" />
          </div>

          {/* Chart Bars using your --primary yellow */}
          <div className="h-56 flex items-end gap-2">
            {[40, 70, 55, 90, 60, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md transition-all opacity-85 hover:opacity-100"
                style={{ 
                  height: `${h}%`, 
                  backgroundColor: 'var(--primary)' 
                }}
              />
            ))}
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-4">
            Weekly performance snapshot (mock data)
          </p>
        </div>
      </div>

      {/* INSIGHTS SECTION */}
      <div className="px-6 mt-8 pb-10 grid lg:grid-cols-2 gap-4">
        
        <div className="card">
          <h3 className="font-semibold mb-2">
            Top Insight
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Your inventory turnover rate is increasing. Fast-moving products
            are contributing 62% of total revenue.
          </p>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">
            Recommendation
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Restock high-demand items before the next cycle to avoid potential
            stockouts and revenue loss.
          </p>
        </div>

      </div>
    </div>
  )
}