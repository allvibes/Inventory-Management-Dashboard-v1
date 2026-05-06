"use client"

import React from "react"

interface ModalProps {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-lg p-6">

        {title && (
          <h2 className="text-xl font-semibold mb-4">
            {title}
          </h2>
        )}

        <div className="mb-4">{children}</div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>

      </div>
    </div>
  )
}