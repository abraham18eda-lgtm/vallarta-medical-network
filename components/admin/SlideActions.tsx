"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Pencil } from "lucide-react"
import { useState } from "react"

export default function SlideActions({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm("¿Eliminar este slide?")
    if (!confirmDelete) return

    setLoading(true)

    try {
      await fetch(`/api/admin/slides/${id}`, {
        method: "DELETE",
      })

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Error al eliminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">

      {/* EDIT */}
       <Link
        href={`/admin/slides/${id}/edit`}
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          bg-blue-50 text-blue-600
          hover:bg-blue-100 hover:text-blue-700
          transition-colors duration-200
        "
        title="Editar"
      >
      <Pencil size={16} />
    </Link>

      {/* DELETE */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          bg-red-50 text-red-600
          hover:bg-red-100 hover:text-red-700
          transition-colors duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        title="Eliminar"
      >
        {loading ? (
          <span className="text-xs font-bold">...</span>
        ) : (
          <Trash2 size={16} />
        )}
      </button>

    </div>
  )
}