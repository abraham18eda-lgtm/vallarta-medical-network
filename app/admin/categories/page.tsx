"use client"

import { useEffect, useState } from "react"

type CategoryType = "DOCTOR" | "BLOG"  | "PLACE"

function generateSlug(text: string) {
  return text
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres raros
    .replace(/\s+/g, "-") // espacios a guiones
    .replace(/-+/g, "-"); // evita guiones dobles
}

export default function CategoriesAdmin() {
  const [name, setName] = useState("")
  const [parentId, setParentId] = useState("")
  const [type, setType] = useState<CategoryType>("DOCTOR")

  const [categories, setCategories] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  const [tab, setTab] = useState<"DOCTOR" | "BLOG" | "ALL">("ALL")
  const [search, setSearch] = useState("")

  const load = async () => {
    const res = await fetch("/api/admin/categories", {
      cache: "no-store"
    })

    const data = await res.json()
    setCategories(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    load()
  }, [])

  
  // crear / editar
  const save = async () => {
    if (!name) return alert("Nombre requerido")

    setLoading(true)

    const method = editing ? "PUT" : "POST"
    const url = editing
      ? `/api/admin/categories/${editing.id}`
      : `/api/admin/categories`

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        parentId: parentId === "" ? null : parentId,
        type: type ?? editing?.type        
      })
    })

    reset()
    load()
    setLoading(false)
  }

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar categoría?")) return

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE"
    })

    load()
  }

  const startEdit = (cat: any) => {
    setEditing(cat)
    setName(cat.name)
    setParentId(cat.parentId || "")
    setType(cat.type ?? "DOCTOR")
  }

  const reset = () => {
    setEditing(null)
    setName("")
    setParentId("")
    setType("DOCTOR")
  }

  // FILTERS
  const filtered = categories.filter(cat => {
    const matchTab = tab === "ALL" ? true : cat.type === tab
    const matchSearch = cat.name
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchTab && matchSearch
  })

  const parents = filtered.filter(c => !c.parentId)
  // const parents = categories.filter(c => !c.parentId)

   return (
    <div className="min-h-screen flex justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl space-y-6">
  
      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Categories CMS
      </h1>

      {/* TABS + SEARCH */}
      <div className="flex justify-between items-center">

        <div className="flex gap-2">
          {["ALL", "DOCTOR", "BLOG"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                tab === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          placeholder="Buscar categoría..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      {/* FORM */}
      <div className="border rounded-xl p-4 bg-white space-y-3">

        <input
          className="w-full border p-2 rounded"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {/* TYPE SELECT */}
        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={e => setType(e.target.value as CategoryType)}
        >
          <option value="DOCTOR">Doctor</option>
          <option value="BLOG">Blog</option>
        </select>

        <select
          className="w-full border p-2 rounded"
          value={parentId}
          onChange={e => setParentId(e.target.value)}
        >
          <option value="">Sin padre</option>
          {parents.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Actualizar" : "Crear"}
          </button>

          {editing && (
            <button
              onClick={reset}
              className="border px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="border rounded-2xl bg-white hover:shadow-sm transition">

        {parents.map(cat => {
          const children = categories.filter(
            c => c.parentId === cat.id
          )

          return (
            <div
              key={cat.id}
              className="p-2 border-b px-4"
            >

              {/* HEADER CATEGORY */}
              <div className="flex justify-between items-center">

                <div className="flex gap-2 items-center">
                  <span className="font-semibold">
                    {cat.name}
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-slate-700 font-medium">
                    {cat.type}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {/* EDITAR */}
                  <button
                    onClick={() => startEdit(cat)}
                    className="
                      flex items-center justify-center
                      w-8 h-8 rounded-full
                      bg-blue-50 text-blue-600
                      hover:bg-blue-100 hover:text-blue-700
                      transition-colors duration-200
                    "
                    title="Editar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>


                  {/* ELIMINAR */}
                  <button
                    onClick={() => remove(cat.id)}
                    className="
                      flex items-center justify-center
                      w-8 h-8 rounded-full
                      bg-red-50 text-red-600
                      hover:bg-red-100 hover:text-red-700
                      transition-colors duration-200
                    "
                    title="Eliminar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>

                </div>
              </div>

              {/* CHILDREN */}
              {children.length > 0 && (
                <div className="">

                  <p className="text-xs text-gray-500 mb-2">
                    Subcategorías
                  </p>

                  <div className="space-y-1">
                    {children.map(sub => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-gray-50 transition"
                      >

                        {/* NAME */}
                        <span className="text-sm text-gray-700">
                          • {sub.name}
                        </span>

                        {/* ACTIONS */}
                        <div className="flex gap-3 text-xs">
                          <button
                            onClick={() => startEdit(sub)}
                            className="text-blue-600 hover:underline"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => remove(sub.id)}
                            className="text-red-600 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>   
  </div>
  )
}