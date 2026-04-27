// "use client"
// import { useEffect, useState } from "react"

// export default function CategoriesAdmin() {
//   const [name, setName] = useState("")
//   const [parentId, setParentId] = useState("")
//   const [categories, setCategories] = useState<any[]>([])
//   const [editing, setEditing] = useState<any>(null)

//   const load = async () => {
//     const res = await fetch("/api/categories/tree")
//     const data = await res.json()
//     setCategories(Array.isArray(data) ? data : [])
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   // ✅ CREAR / EDITAR
//   const save = async () => {
//     if (!name) return alert("Nombre requerido")

//     const method = editing ? "PUT" : "POST"
//     const url = editing
//       ? `/api/admin/categories/${editing.id}`
//       : `/api/admin/categories`

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, parentId })
//     })

//     setName("")
//     setParentId("")
//     setEditing(null)

//     load()
//   }

//   // ❌ ELIMINAR
//   const remove = async (id: string) => {
//     if (!confirm("¿Eliminar categoría?")) return

//     await fetch(`/api/admin/categories/${id}`, {
//       method: "DELETE"
//     })

//     load()
//   }

//   // ✏️ EDITAR
//   const startEdit = (cat: any) => {
//     setEditing(cat)
//     setName(cat.name)
//     setParentId(cat.parentId || "")
//   }

//   return (
//     <div className="p-6 max-w-2xl space-y-6">
//       <h1 className="text-xl font-bold">Categorías</h1>

//       {/* FORM */}
//       <div className="space-y-2 border p-4 rounded-xl">
//         <input
//           placeholder="Nombre"
//           className="w-full border p-2 rounded"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />

//         <select
//           className="w-full border p-2 rounded"
//           value={parentId}
//           onChange={e => setParentId(e.target.value)}
//         >
//           <option value="">Categoría padre (opcional)</option>

//           {categories.map((cat: any) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={save}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {editing ? "Actualizar" : "Crear"}
//         </button>
//       </div>

//       {/* LISTADO */}
//       <div className="space-y-4">
//         {categories.map((cat: any) => (
//           <div key={cat.id} className="border p-4 rounded-xl">
//             <div className="flex justify-between items-center">
//               <p className="font-bold">{cat.name}</p>

//               <div className="space-x-2">
//                 <button
//                   onClick={() => startEdit(cat)}
//                   className="text-blue-600"
//                 >
//                   Editar
//                 </button>

//                 <button
//                   onClick={() => remove(cat.id)}
//                   className="text-red-600"
//                 >
//                   Eliminar
//                 </button>
//               </div>
//             </div>

//             {/* SUBCATEGORÍAS */}
//             {cat.children?.length > 0 && (
//               <div className="ml-4 mt-2 space-y-1">
//                 {cat.children.map((sub: any) => (
//                   <div
//                     key={sub.id}
//                     className="flex justify-between text-sm"
//                   >
//                     <span>• {sub.name}</span>

//                     <div className="space-x-2">
//                       <button
//                         onClick={() => startEdit(sub)}
//                         className="text-blue-600"
//                       >
//                         Editar
//                       </button>

//                       <button
//                         onClick={() => remove(sub.id)}
//                         className="text-red-600"
//                       >
//                         Eliminar
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"

export default function CategoriesAdmin() {
  const [name, setName] = useState("")
  const [parentId, setParentId] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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
        parentId: parentId || null
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
  }

  const reset = () => {
    setEditing(null)
    setName("")
    setParentId("")
  }

  const parents = categories.filter(c => !c.parentId)

  return (
    <div className="p-6 max-w-3xl space-y-6">

      <h1 className="text-2xl font-bold">Categorías</h1>

      {/* FORM */}
      <div className="border p-4 rounded-xl space-y-3 bg-white">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />

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

      {/* LISTADO */}
      <div className="space-y-4">
        {parents.map(cat => {
          const children = categories.filter(
            c => c.parentId === cat.id
          )

          return (
            <div key={cat.id} className="border p-4 rounded-xl bg-white">

              <div className="flex justify-between">
                <b>{cat.name}</b>

                <div className="space-x-2">
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

              {children.length > 0 && (
                <div className="ml-4 mt-2">
                  {children.map(sub => (
                    <div
                      key={sub.id}
                      className="flex justify-between text-sm"
                    >
                      <span>• {sub.name}</span>

                      <div>
                        <button onClick={() => startEdit(sub)}>
                          Editar
                        </button>

                        <button
                          className="text-red-600"
                          onClick={() => remove(sub.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}