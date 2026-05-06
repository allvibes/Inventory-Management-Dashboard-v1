"use client"

import { useState } from "react"
import { Users, Eye, XCircle } from "lucide-react"

export default function UsersPage() {
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Sam Eleboda", email: "sam@example.com", status: "Active" },
  ])

  const toggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    )
  }

  return (
    <div className="page-container">
      <h1 className="section-title flex items-center gap-2">
        <Users size={24} /> Users
      </h1>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border border-gray-200 dark:border-zinc-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 dark:border-zinc-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700">
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}