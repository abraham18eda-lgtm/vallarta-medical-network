"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function DoctorsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 📦 estados
  const [categories, setCategories] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  )

  const [city, setCity] = useState(
    searchParams.get("city") || ""
  )

  const [page, setPage] = useState(
    Number(searchParams.get("page") || 1)
  )

  const [totalPages, setTotalPages] = useState(1)

  // 🔄 cargar categorías
  useEffect(() => {
    fetch("/api/categories/tree")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
  }, [])

  // 🔁 reset página si cambian filtros
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, city])

  // 🔄 fetch doctores + actualizar URL
  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategory) params.set("category", selectedCategory)
    if (city) params.set("city", city)
    if (page) params.set("page", String(page))

    router.push(`/especialidad?${params.toString()}`)

    setLoading(true)

    fetch(`/api/doctors?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data.data || [])
        setTotalPages(data.totalPages || 1)
        setLoading(false)
      })

  }, [selectedCategory, city, page])

  return (
    <div className="grid md:grid-cols-4 gap-6 p-6">

      {/* 🧠 SIDEBAR */}
      <aside className="md:col-span-1 bg-white p-4 rounded-2xl shadow-sm h-fit space-y-6">

        <h2 className="font-bold text-lg">Filtros</h2>

        {/* ESPECIALIDAD */}
        <div>
          <p className="font-semibold mb-2">Especialidad</p>

          {categories.map((cat: any) => (
            <div key={cat.id}>
              <p className="text-sm font-medium">{cat.name}</p>

              {cat.children.map((sub: any) => (
                <label key={sub.id} className="block text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={sub.slug}
                    checked={selectedCategory === sub.slug}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  {sub.name}
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* CIUDAD */}
        <div>
          <p className="font-semibold mb-2">Ciudad</p>

          <select
            className="w-full border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="CDMX">CDMX</option>
            <option value="Guadalajara">Guadalajara</option>
          </select>
        </div>

        {/* LIMPIAR */}
        <button
          onClick={() => {
            setSelectedCategory("")
            setCity("")
          }}
          className="text-sm text-blue-600"
        >
          Limpiar filtros
        </button>
      </aside>

      {/* 🩺 RESULTADOS */}
      <div className="md:col-span-3 space-y-4">

        {loading && (
          <p className="text-gray-500">Cargando doctores...</p>
        )}

        {!loading && doctors.length === 0 && (
          <p className="text-gray-500">No hay resultados</p>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-4">
          {doctors.map((doc: any) => (
            <div
              key={doc.id}
              className="border p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={doc.image || "/doctor.jpg"}
                className="w-full h-40 object-cover rounded-xl"
              />

              <h3 className="font-bold mt-2">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.city}</p>

              <a
                href={`/especialidad/${doc.categorySlug}/${doc.slug}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                Ver perfil
              </a>
            </div>
          ))}
        </div>

        {/* 🔢 PAGINACIÓN */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-xl bg-white shadow disabled:opacity-40"
          >
            ← Anterior
          </button>

          <span className="text-sm">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-xl bg-white shadow disabled:opacity-40"
          >
            Siguiente →
          </button>

        </div>
      </div>
    </div>
  )
}