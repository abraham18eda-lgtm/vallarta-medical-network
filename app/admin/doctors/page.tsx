"use client"

import { useEffect, useState } from "react"
import EditDoctorModal from "@/components/ui/EditDoctorModal"


function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export default function AdminDoctorsPage() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    image: ""
  })
  
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 🔄 cargar categorías
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories/tree")

      // ❗ valida si la respuesta es OK
      if (!res.ok) {
        throw new Error("Error al cargar categorías")
      }

      const data = await res.json()

      // ❗ valida que sea array
      if (!Array.isArray(data)) {
        console.error("Respuesta inválida:", data)
        setCategories([])
        return
      }

      setCategories(data)

    } catch (error) {
      console.error("Error categories:", error)
      setCategories([]) // Evita que rompa el .map
    }
  }


  // 🔄 cargar doctores
  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors")

      if (!res.ok) {
        throw new Error("Error al cargar doctores")
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        console.error("Respuesta inválida:", data)
        setDoctors([])
        return
      }

      setDoctors(data)

    } catch (error) {
      console.error("Error doctors:", error)
      setDoctors([])
    }
  }


  // 🚀 cargar al montar
  useEffect(() => {
    loadCategories()
    loadDoctors()
  }, [])
 

  // 📤 subir imagen
  const handleImageUpload = async (file: File) => {
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    setForm(prev => ({
      ...prev,
      image: data.url
    }))

    setLoading(false)
  }

  // 💾 guardar doctor
  const handleSubmit = async () => {
    if (!form.name || !selectedCategory) {
      alert("Nombre y categoría son obligatorios")
      return
    }

    const slug = generateSlug(form.name)

    await fetch("/api/admin/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        slug,
        categories: [selectedCategory]
      })
    })

    // reset
    setForm({ name: "", city: "", image: "" })
    setPreview(null)
    setSelectedCategory(null)

    loadDoctors()
  }

  // ❌ eliminar doctor
  const removeDoctor = async (id: string) => {
    if (!confirm("¿Eliminar doctor?")) return

    await fetch(`/api/admin/doctors/${id}`, {
      method: "DELETE"
    })

    loadDoctors()
  }

  
  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">
      
      {/* ================= FORM ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Crear Doctor</h2>

        <input
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Ciudad"
          className="w-full border p-2 rounded"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        {/* 🖼 Imagen */}
        <div>
          <p className="font-semibold mb-1">Imagen</p>

          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return

              setPreview(URL.createObjectURL(file))
              await handleImageUpload(file)
            }}
          />

          {loading && <p className="text-sm text-gray-500">Subiendo...</p>}

          {preview && (
            <img
              src={preview}
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          )}
        </div>

        {/* 🧠 Categorías */}
        <div>
          <p className="font-semibold mb-2">Especialidad</p>

          {categories
            .find((cat: any) => cat.slug === "especialidades") // 👈 clave
            ?.children?.map((sub: any) => (
              <label key={sub.id} className="block text-sm cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={sub.id}
                  checked={selectedCategory === sub.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                {sub.name}
              </label>
            ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>

      {/* ================= TABLA ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">Listado de Doctores</h2>

        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th>Ciudad</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc: any) => (
              <tr key={doc.id} className="border-t">
                <td className="p-2">{doc.name}</td>
                <td>{doc.city}</td>
                <td>
                {doc.categories?.length ? (
                  doc.categories.map((c: any) => (
                    <span
                      key={c.category.id}
                      className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded mr-1 text-xs"
                    >
                      {c.category.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Sin especialidad</span>
                )}
                </td>
                <td className="space-x-2">
                  <button
                      onClick={() => setEditingDoctor(doc.id)}
                      className="text-blue-600"
                    >
                      Editar
                  </button>
                  {/* <a
                    href={`/admin/doctors/${doc.id}`}
                    className="text-blue-600"
                    target="_blank"
                  >
                    Ver
                  </a> */}

                  <button
                    onClick={() => removeDoctor(doc.id)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No hay doctores aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingDoctor && (
        <EditDoctorModal
          doctorId={editingDoctor}
          onClose={() => setEditingDoctor(null)}
          onSaved={loadDoctors}
        />
      )}

    </div>
  )
}