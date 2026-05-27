"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Search } from "lucide-react"

type Treatment = {
  id: string
  name: string
  slug: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [name, setName] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const res = await fetch("/api/admin/treatments")
    const data = await res.json()
    setTreatments(data)
  }

  useEffect(() => {
    load()
  }, [])

  const addTreatment = async () => {
    if (!name.trim()) return

    setLoading(true)

    await fetch("/api/admin/treatments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        slug: slugify(name)
      })
    })

    setName("")
    await load()
    setLoading(false)
  }

  const removeTreatment = async (id: string) => {
    if (!confirm("¿Eliminar tratamiento?")) return

    await fetch(`/api/admin/treatments/${id}`, {
      method: "DELETE"
    })

    load()
  }

  const filtered = treatments.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Tratamientos
          </h1>
          <p className="text-slate-500 mt-2">
            Administra el catálogo médico
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-5">
            Agregar tratamiento
          </h2>

          <div className="flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Ortodoncia Invisible"
              className="flex-1 px-4 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={addTreatment}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-2xl flex items-center gap-2 transition"
            >
              <Plus size={18} />
              Agregar
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-sm border p-4 flex items-center gap-3">
          <Search className="text-slate-400" size={18} />

          <input
            placeholder="Buscar tratamiento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* LIST */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">
              Listado
            </h2>

            <span className="text-sm text-slate-500">
              {filtered.length} tratamientos
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              No hay tratamientos registrados
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {t.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      /{t.slug}
                    </p>
                  </div>

                  <button
                    onClick={() => removeTreatment(t.id)}
                    className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}