"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function InventoryChart({ data }: { data: any[] }) {
  return (
    <div className="card h-96 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-[var(--text)] tracking-tight">
          Inventory Levels
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] bg-[var(--bg-soft)] px-2 py-1 rounded-md">
          Live Status
        </span>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* Horizontal lines matching your border color */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--border)" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />

            <Tooltip 
              cursor={{ fill: "var(--bg-soft)", opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--text)",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "var(--primary)" }}
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
  )
}