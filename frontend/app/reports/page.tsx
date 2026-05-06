"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import Container from "../components/ui/Container"

const inventoryData = [
  { name: "In Stock", value: 65 },
  { name: "Low Stock", value: 20 },
  { name: "Out of Stock", value: 15 },
]

const revenueData = [
  { name: "Electronics", value: 40 },
  { name: "Fashion", value: 30 },
  { name: "Groceries", value: 20 },
  { name: "Others", value: 10 },
]

/** * Using your --primary for the main slice, 
 * and standard SaaS colors for the rest.
 */
const COLORS = ["var(--primary)", "#3b82f6", "#ef4444", "#10b981"]

export default function ReportsPage() {
  return (
    <Container>
      {/* HEADER */}
      <div className="mb-10 fade-in">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Reports
        </h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Visual breakdown of inventory performance, stock health, and revenue distribution
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* INVENTORY PIE */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">
            Inventory Status
          </h2>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={3}
                  stroke="none"
                >
                  {inventoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                {/* Tooltip styled via CSS variables for perfect dark mode visibility */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />

                <Legend 
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-4">
            Breakdown of stock health across all products
          </p>
        </div>

        {/* REVENUE PIE */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">
            Revenue Distribution
          </h2>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={3}
                  stroke="none"
                >
                  {revenueData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />

                <Legend 
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-4">
            Revenue contribution by product category
          </p>
        </div>
      </div>

      {/* INSIGHT SECTION */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 pb-10">

        <div className="card">
          <h3 className="font-semibold mb-2">
            Key Insight
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Electronics dominate revenue streams, but also show higher stock volatility compared to other categories.
          </p>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">
            Recommendation
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Increase stock buffer for high-demand categories and optimize slow-moving inventory to improve cash flow.
          </p>
        </div>

      </div>
    </Container>
  )
}