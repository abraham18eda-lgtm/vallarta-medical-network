"use client"

import { useEffect, useState } from "react"

export default function EditDoctorModal({ doctorId, onClose, onSaved }: any) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    image: ""
  })

  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔹 cargar doctor
  useEffect(() => {
    const loadDoctor = async () => {
      const res = await fetch(`/api/admin/doctors/${doctorId}`)
      const data = await res.json()

      setForm({
        name: data.name || "",
        city: data.city || "",
        image: data.image || ""
      })

      setPreview(data.image || "")

      const catId = data.categories?.[0]?.categoryId
      if (catId) setSelectedCategory(catId)
    }

    const loadCategories = async () => {
      const res = await fetch("/api/categories/tree")
      const data = await res.json()
      setCategories(data)
    }

    loadDoctor()
    loadCategories()
  }, [doctorId])

  // 🔹 guardar cambios
  const handleSave = async () => {
    setLoading(true)

    await fetch(`/api/admin/doctors/${doctorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        categories: selectedCategory ? [selectedCategory] : []
      })
    })

    setLoading(false)
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-xl rounded-2xl p-6 space-y-4 shadow-xl">

        <h2 className="text-xl font-bold">Editar Doctor</h2>

        {/* NOMBRE */}
        <input
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Nombre"
        />

        {/* CIUDAD */}
        <input
          className="w-full border p-2 rounded"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          placeholder="Ciudad"
        />

        {/* IMAGEN */}
        <div>
          <p className="font-semibold mb-1">Imagen</p>

          <input
            type="file"
            onChange={(e: any) => {
              const file = e.target.files?.[0]
              if (!file) return

              const url = URL.createObjectURL(file)
              setPreview(url)

              // 👉 aquí puedes integrar Cloudinary si quieres
              setForm({ ...form, image: url })
            }}
          />

          {preview && (
            <img
              src={preview}
              className="w-full h-40 object-cover rounded-xl mt-2"
            />
          )}
        </div>

        {/* ESPECIALIDAD */}
        <div>
          <p className="font-semibold mb-2">Especialidad</p>

          {categories
            .find((cat: any) => cat.slug === "especialidades")
            ?.children?.map((sub: any) => (
              <label key={sub.id} className="block text-sm">
                <input
                  type="radio"
                  value={sub.id}
                  checked={selectedCategory === sub.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                {sub.name}
              </label>
            ))}
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}