"use client"

import Link from "next/link"
import { useState } from "react"

type ActionButtonsProps = {
  editHref: string
  deleteAction: () => Promise<void>
}

export default function ActionButtons({
  editHref,
  deleteAction,
}: ActionButtonsProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este banner?"
    )

    if (!confirmed) return

    try {
      setLoading(true)
      await deleteAction()
    } catch (error) {
      console.error("Error al eliminar:", error)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">

      {/* EDITAR */}
      <Link
        href={editHref}
        title="Editar"
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          bg-blue-50 text-blue-600
          hover:bg-blue-100 hover:text-blue-700
          transition-colors duration-200
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      </Link>

      {/* ELIMINAR */}
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Eliminar"
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          bg-red-50 text-red-600
          hover:bg-red-100 hover:text-red-700
          transition-colors duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <span className="text-xs font-bold">...</span>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        )}
      </button>
    </div>
  )
}