"use client"

import React from "react"

interface TableProps {
  headers: string[]
  children: React.ReactNode
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-zinc-800 rounded-xl shadow">
      <table className="w-full text-sm text-left">

        <thead className="border-b dark:border-zinc-700">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>

      </table>
    </div>
  )
}