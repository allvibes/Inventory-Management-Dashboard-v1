"use client"

import { useDeleteItemMutation } from "../features/inventoryApi"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { addNotification } from "../features/notificationSlice"

function InventoryTable({ items }: any) {
  const [deleteItem] = useDeleteItemMutation()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id)
      dispatch(addNotification("Item deleted successfully"))
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {/* Added px-4 to match td padding exactly */}
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item._id} className="table-row-hover group border-b border-[var(--border)] last:border-0">
              {/* Vertical alignment center and consistent horizontal padding */}
              <td className="px-4 py-4 align-middle">
                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--text)] leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5">
                    ID: {item._id.slice(-6)}
                  </span>
                </div>
              </td>
              
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${item.quantity < 10 ? 'text-orange-500' : 'text-[var(--text)]'}`}>
                    {item.quantity}
                  </span>
                  {item.quantity < 10 && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full font-bold uppercase">
                      <AlertCircle size={10} /> Low
                    </span>
                  )}
                </div>
              </td>

              <td className="px-4 py-4 align-middle text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => router.push(`/inventory/edit/${item._id}`)}
                    className="p-2 rounded-md hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    title="Edit Item"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-md hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable