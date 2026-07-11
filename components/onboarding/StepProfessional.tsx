"use client"

import { useEffect, useState } from "react"

export default function StepProfessional({ form, update, next, prev }: any) {
  // return (
  //   <div className="space-y-4">

  //     <textarea
  //       placeholder="Descripción profesional"
  //       value={form.description || ""}
  //       onChange={e => update({ description: e.target.value })}
  //       className="w-full border p-2 rounded"
  //     />

  //     {/* aquí luego metes especialidades */}

  //     <div className="flex justify-between">
  //       <button onClick={prev}>Atrás</button>
  //       <button onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded">
  //         Continuar
  //       </button>
  //     </div>

  //   </div>
  // )

  const [query, setQuery] = useState("")
  const selected = form.categories || []
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/categories/doctor")

        // console.log("STATUS:", res.status)

        const data = await res.json()

        // console.log("DATA:", data)

        setCategories(Array.isArray(data) ? data : [])

      } catch (err) {
        console.error(err)
      }
    }

    load()

  }, [])

  const toggle = (id: string) => {
    const current = form.categories || []

    const exists = current.includes(id)

    update({
      categories: exists
        ? current.filter((c: string) => c !== id)
        : [...current, id]
    })
  }

  const filtered = categories.filter((cat) => {
  const alreadySelected = selected.includes(cat.id)

    return (
      !alreadySelected &&
      cat.name.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">

      <div>
        <label className="text-sm font-medium">
          Descripción profesional
        </label>

        <textarea
          rows={5}
          placeholder="Cuéntanos sobre tu experiencia..."
          value={form.description || ""}
          onChange={e => update({ description: e.target.value })}
          className="w-full mt-1 border p-3 rounded-xl"
        />
      </div>

      {/* ESPECIALIDADES */}
      {/* <div>
        <label className="text-sm font-medium text-gray-700">
          Especialidades médicas
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = form.categories?.includes(cat.id)

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggle(cat.id)}
                className={`
                  px-4 py-2 rounded-full border transition
                  text-sm font-medium
                  ${active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-50"
                  }
                `}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div> */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Especialidades médicas
        </label>

        {/* SELECTED TAGS */}
        <div className="flex flex-wrap gap-2 mt-3">

          {selected.map((id: string) => {

            const cat = categories.find(c => c.id === id)

            if (!cat) return null

            return (
              <div
                key={id}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                <span>{cat.name}</span>

                <button
                  type="button"
                  onClick={() => toggle(id)}
                  className="text-blue-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative mt-3">

          <input
            type="text"
            placeholder="Buscar especialidad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          {/* RESULTS */}
          {query && filtered.length > 0 && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-auto">

              {filtered.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    toggle(cat.id)
                    setQuery("")
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b last:border-none"
                >
                  {cat.name}
                </button>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {query && filtered.length === 0 && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow p-4 text-sm text-gray-500">
              No se encontraron especialidades
            </div>
          )}
        </div>
      </div>

      { /* BOTONES */}    
      <div className="flex justify-between">

        <button
          onClick={prev}
          className="px-5 py-3 rounded-xl border"
        >
          Atrás
        </button>

        <button
          onClick={next}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Continuar
        </button>

      </div>

    </div>
  )
}