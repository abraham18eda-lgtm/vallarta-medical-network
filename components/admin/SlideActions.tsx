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
    <div className="flex justify-center gap-3">

      {/* EDIT */}
      <Link
        href={`/admin/slides/${id}/edit`}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
      >
        <Pencil size={16} />
        Editar
      </Link>

      {/* DELETE */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 size={16} />
        {loading ? "..." : "Eliminar"}
      </button>

    </div>
  )
}