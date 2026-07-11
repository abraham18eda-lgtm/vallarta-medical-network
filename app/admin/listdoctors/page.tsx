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

  const initialForm = {
    name: "",
    city: "",
    image: "",
    email: "",
    phone: "",
    description: "",
    state: ""
  }

  const [form, setForm] = useState(initialForm)
  
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // cargar categorías
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories/tree")

      // ❗ valida si la respuesta es OK
      if (!res.ok) {
        throw new Error("Error al cargar categorías")
      }

      const data = await res.json()
      // console.log(data)
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


  // cargar doctores
  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors")

      if (!res.ok) {
        throw new Error("Error al cargar doctores")
      }

      const data = await res.json()

      // console.log(data)
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


  // cargar al montar
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

  // guardar doctor
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
    setForm(initialForm)
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
  <div className="p-6 gap-8 bg-gray-50 min-h-screen">

    {/* ================= TABLA ================= */}
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Doctores
        </h2>

        <span className="text-sm text-gray-500">
          {doctors.length} registrados
        </span>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Especialidad</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {doctors.map((doc: any) => (
              <tr
                key={doc.id}
                className="hover:bg-gray-50 transition"
              >

                {/* NOMBRE */}
                <td className="py-3 font-medium text-gray-800">
                  {doc.name}
                </td>

                {/* EMAIL */}
                <td className="text-gray-600">
                  {doc.email?.trim() || "—"}
                </td>

                {/* TEL */}
                <td className="text-gray-600">
                  {doc.phone || "—"}
                </td>

                {/* CIUDAD */}
                <td className="text-gray-600">
                  {doc.city || "—"}
                </td>

                {/* ESTADO */}
                <td className="text-gray-600">
                  {doc.state || "—"}
                </td>

                {/* ESPECIALIDAD */}
                <td>
                  <div className="flex flex-wrap gap-1">

                    {doc.categories?.length ? (
                      doc.categories.map((c: any) => (
                        <span
                          key={c.category.id}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-medium"
                        >
                          {c.category.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">
                        Sin especialidad
                      </span>
                    )}

                  </div>
                </td>

                {/* ACCIONES */}
                <td className="text-right">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => setEditingDoctor(doc.id)}
                      className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => removeDoctor(doc.id)}
                      className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      Eliminar
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      {/* EMPTY STATE */}
      {doctors.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          No hay doctores registrados aún
        </div>
      )}

    </div>

    {/* MODAL */}
    {editingDoctor && (
      <EditDoctorModal
        id={editingDoctor}
        onClose={() => setEditingDoctor(null)}
        onSaved={loadDoctors}
      />
    )}

  </div>
)
}