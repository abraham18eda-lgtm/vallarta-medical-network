"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DoctorsList() {
  const [categories, setCategories] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // 🔄 Cargar categorías
  const loadCategories = async () => {
    const res = await fetch("/api/categories/tree")
    const data = await res.json()
    setCategories(data || [])
  }

  // 🔄 Cargar doctores
  const loadDoctors = async () => {
    setLoading(true)

    const res = await fetch(
      `/api/doctors?page=${page}&category=${selectedCategory}`
    )

    const data = await res.json()

    setDoctors(data.doctors || [])
    setPages(data.pages || 1)

    setLoading(false)
  }

  // 🔥 REACTIVO
  useEffect(() => {
    loadDoctors()
  }, [selectedCategory, page])

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="grid md:grid-cols-4 gap-6 p-6">

      {/* 🧠 SIDEBAR */}
      <aside className="md:col-span-1 bg-white p-4 rounded-2xl shadow-sm space-y-2 sticky top-4 h-fit">
        <div className="mb-4 lg:mb-b">
          <h2 className="font-bold text-lg ">Especialidades</h2>
        </div>
        {/* {categories.map((cat) => (
          <div key={cat.id}>
            <p className="text-sm font-semibold">{cat.name}</p>

            {cat.children?.map((sub: any) => (
              <label key={sub.id} className="block text-sm cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={sub.slug}
                  checked={selectedCategory === sub.slug}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setPage(1)
                  }}
                  className="mr-2"
                />
                {sub.name}
              </label>
            ))}
          </div>
        ))} */}
      
         {categories
            .find((cat: any) => cat.slug === "especialidades") // 👈 clave
            ?.children?.map((sub: any) => (
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
        
        <button
          onClick={() => {
            setSelectedCategory("")
            setPage(1)
          }}
          className="text-sm text-blue-600 !mt:mt-2 lg:!mt-4"
        >
          Limpiar filtros
        </button>
      </aside>

      {/* 🩺 RESULTADOS */}
      <div className="md:col-span-3 space-y-6">

        {loading && <p>Cargando...</p>}

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doc) => {
            console.log("DOC:", doc)
            const categorySlug =
              doc.categories?.[0]?.category?.slug || "general"

            return (
              <div
                key={doc.id}
                className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="overflow-hidden">
                  <img
                    src={doc.image || "/doctor.jpg"}
                    className="w-full h-56 object-cover hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.city}</p>
              
                  <Link href={`/es/directorio/${doc.slug}`}
                    className="text-blue-600 text-sm mt-2 inline-block"
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            ← Anterior
          </button>

          <span>
            Página {page} de {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>

      </div>
    </div>
  )
}