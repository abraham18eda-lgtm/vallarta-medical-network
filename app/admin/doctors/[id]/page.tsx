"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditDoctorPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    city: ""
  })

  const [loading, setLoading] = useState(false)

  // 🔹 cargar doctor
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/doctors/${id}`)
      const data = await res.json()

      setForm({
        name: data.name || "",
        city: data.city || ""
      })
    }

    if (id) load()
  }, [id])

  // 🔹 guardar cambios
  const handleUpdate = async () => {
    setLoading(true)

    await fetch(`/api/admin/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    setLoading(false)
    router.push("/admin/doctors")
  }

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Editar Doctor</h1>

      <input
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        placeholder="Nombre"
      />

      <input
        className="w-full border p-2 rounded"
        value={form.city}
        onChange={(e) =>
          setForm({ ...form, city: e.target.value })
        }
        placeholder="Ciudad"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Guardando..." : "Actualizar"}
      </button>
    </div>
  )
}