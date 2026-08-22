"use client"

import { useState } from "react"

interface Props {
  onDelete: () => Promise<void>
}

export default function DeleteMagazineButton({
  onDelete
}: Props) {

  const [loading, setLoading] = useState(false)

  async function handleDelete() {

    const confirmed = window.confirm(
      "¿Realmente quieres eliminar esta revista?\n\nEsta acción no se puede deshacer."
    )

    if (!confirmed) {
      return
    }

    try {

      setLoading(true)

      await onDelete()

    } catch (error) {

      console.error(error)

      alert(
        "Ocurrió un error al eliminar la revista."
      )

      setLoading(false)
    }
  }

  return (

    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title="Eliminar"
      className="
        flex items-center justify-center
        w-8 h-8 rounded-full
        bg-red-50
        text-red-600
        hover:bg-red-100
        hover:text-red-700
        disabled:opacity-50
        transition-colors
      "
    >

      {loading ? (

        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

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

  )
}
