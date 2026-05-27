"use client"

import { useEffect, useState } from "react"

type CategoryType = "DOCTOR" | "BLOG"

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

      console.log({
        name,
        parentId,
        type,
        editing
      })
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

  // return (
  //   <div className="p-6 max-w-3xl space-y-6">

  //     <h1 className="text-2xl font-bold">Categorías</h1>

  //     {/* FORM */}
  //     <div className="border p-4 rounded-xl space-y-3 bg-white">
  //       <input
  //         className="w-full border p-2 rounded"
  //         placeholder="Nombre"
  //         value={name}
  //         onChange={e => setName(e.target.value)}
  //       />

  //       <select
  //         className="w-full border p-2 rounded"
  //         value={parentId}
  //         onChange={e => setParentId(e.target.value)}
  //       >
  //         <option value="">Sin padre</option>
  //         {parents.map(cat => (
  //           <option key={cat.id} value={cat.id}>
  //             {cat.name}
  //           </option>
  //         ))}
  //       </select>

  //       <div className="flex gap-2">
  //         <button
  //           onClick={save}
  //           className="bg-blue-600 text-white px-4 py-2 rounded"
  //         >
  //           {editing ? "Actualizar" : "Crear"}
  //         </button>

  //         {editing && (
  //           <button
  //             onClick={reset}
  //             className="border px-4 py-2 rounded"
  //           >
  //             Cancelar
  //           </button>
  //         )}
  //       </div>
  //     </div>

  //     {/* LISTADO */}
  //     <div className="border p-4 rounded-xl bg-white">
  //       {parents.map(cat => {
  //         const children = categories.filter(
  //           c => c.parentId === cat.id
  //         )

  //         return (
  //           <div key={cat.id} className="border-b p-2 bg-white">

  //             <div className="flex justify-between">
  //               {cat.name}

  //               <div className="space-x-2">
  //                 <button onClick={() => startEdit(cat)}>
  //                   Editar
  //                 </button>

  //                 <button
  //                   className="text-red-600"
  //                   onClick={() => remove(cat.id)}
  //                 >
  //                   Eliminar
  //                 </button>
  //               </div>
  //             </div>

  //             {children.length > 0 && (
  //               <div className="ml-4 mt-2">
  //                 {children.map(sub => (
  //                   <div
  //                     key={sub.id}
  //                     className="flex justify-between text-sm"
  //                   >
  //                     <span>• {sub.name}</span>

  //                     <div>
  //                       <button onClick={() => startEdit(sub)}>
  //                         Editar
  //                       </button>

  //                       <button
  //                         className="text-red-600"
  //                         onClick={() => remove(sub.id)}
  //                       >
  //                         Eliminar
  //                       </button>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         )
  //       })}
  //     </div>

  //   </div>
  // )
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
              className="p-2 border-b"
            >

              {/* HEADER CATEGORY */}
              <div className="flex justify-between items-center">

                <div className="flex gap-2 items-center">
                  <span className="font-semibold">
                    {cat.name}
                  </span>

                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {cat.type}
                  </span>
                </div>

                <div className="space-x-2 text-sm">
                  <button onClick={() => startEdit(cat)}>
                    Editar
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => remove(cat.id)}
                  >
                    Eliminar
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