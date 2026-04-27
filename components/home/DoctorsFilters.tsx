"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function DoctorsFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const [categories, setCategories] = useState<any[]>([])
  const [search, setSearch] = useState(params.get("search") || "")

  useEffect(() => {
    fetch("/api/categories/tree")
      .then(res => res.json())
      .then(setCategories)
  }, [])

  const applyFilters = () => {
    router.push(`/directorio?search=${search}`)
  }

  const applyCategory = (slug: string) => {
    router.push(`/directorio?category=${slug}`)
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow space-y-6 sticky top-6">

      {/* 🔎 BUSCADOR */}
      <div>
        <p className="font-semibold mb-2">Buscar doctor</p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ej. Cardiólogo"
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={applyFilters}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg"
        >
          Buscar
        </button>
      </div>

      {/* 🧠 ESPECIALIDADES */}
      <div>
        <p className="font-semibold mb-2">Especialidades</p>

        {categories.map((cat: any) => (
          <div key={cat.id} className="mb-2">

            <p className="text-sm font-medium">{cat.name}</p>

            {cat.children?.map((sub: any) => (
              <button
                key={sub.id}
                onClick={() => applyCategory(sub.slug)}
                className="block text-sm ml-2 mt-1 text-gray-600 hover:text-blue-600"
              >
                {sub.name}
              </button>
            ))}

          </div>
        ))}
      </div>

    </div>
  )
}