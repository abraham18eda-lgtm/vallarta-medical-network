"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Props = {
  locale: "es" | "en"
  initialDoctors:  any[];
  title: string
}

export default function DoctorsList({ locale,  initialDoctors,
  title, }: Props) {
 
  const [categories, setCategories] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  // Cargar categorías
  const loadCategories = async () => {
    const res = await fetch("/api/categories/tree?type=DOCTOR")
    const data = await res.json()
    setCategories(data || [])
    // console.log("CATEGORIES", data)
  }

  // Cargar doctores
  const loadDoctors = async () => {
    setLoading(true)

    // const res = await fetch(
    //   `/api/doctors?locale=${locale}&page=${page}&category=${selectedCategory}`
    // )
    const res = await fetch(
      `/api/doctors?locale=${locale}&page=${page}&category=${selectedCategory}&search=${search}`
    )

    const data = await res.json()

    setDoctors(data.doctors || [])
    // console.log("DOCTORS", data.doctors)
    setPages(data.pages || 1)

    setLoading(false)
  }

  // REACTIVO
  useEffect(() => {
    loadDoctors()
  }, [selectedCategory, page, search])

  useEffect(() => {
    loadCategories()
  }, [])
  

  return (
    <div className="max-w-7xl mx-auto p-6 py-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Directorio Médico
        </h1>

        <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
          Encuentra médicos por nombre o especialidad.
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gray-50 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-700">
                Filtros
              </h2>

              <p className="mt-1 text-sm text-gray-700">
                Busca por especialidad
              </p>
            </div>

            <div className="p-5">
              {/* Buscador */}
              <div className="relative mb-6">
                <input
                  placeholder="Buscar doctor..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Especialidades
              </h3>

              {/* <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {categories
                  .find((cat: any) => cat.slug === "especialidades")
                  ?.children?.map((sub: any) => (
                    <label
                      key={sub.id}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={sub.slug}
                        checked={selectedCategory === sub.slug}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value)
                          setPage(1)
                        }}
                        className="h-4 w-4 accent-[#0F4C81]"
                      />

                      <span className="text-sm text-slate-700">
                        {sub.name}
                      </span>
                    </label>
                  ))}
              </div> */}

              <div className=" max-h-[500px] overflow-y-auto pr-2">
                {categories.map((cat: any) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.slug}
                      checked={selectedCategory === cat.slug}
                      onChange={(e) => {
                        console.log("Seleccionada:", e.target.value)
                        setSelectedCategory(e.target.value)
                        setPage(1)
                      }}
                      className="h-4 w-4 accent-[#0F4C81]"
                    />

                    <span className="text-sm text-slate-700">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("")
                  setSearch("")
                  setPage(1)
                }}
                className="mt-5 text-sm text-[#0F4C81] hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </aside>

        {/* Resultados */}
        <div>
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <p className="text-slate-500">Cargando médicos...</p>
            </div>
          ) : doctors.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {doctors.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={doc.image || "/doctor.jpg"}
                        alt={doc.translations?.[0]?.name}
                        className="h-64 w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900">
                        {doc.translations?.[0]?.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {doc.translations?.[0]?.city}
                      </p>

                      {doc.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {doc.categories.map((cat: any) => (
                            <span
                              key={cat.category.id}
                              className="rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-medium text-[#0F4C81]"
                            >
                              {cat.category.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/${locale}/directorio/${doc.slug}`}
                        className="mt-5 inline-flex items-center text-sm font-medium text-[#0F4C81] hover:underline"
                      >
                        Ver perfil →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-xl border border-slate-200 px-5 py-3 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  ← Anterior
                </button>

                <span className="text-sm text-slate-600">
                  Página {page} de {pages}
                </span>

                <button
                  disabled={page === pages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-xl border border-slate-200 px-5 py-3 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  Siguiente →
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                <h3 className="text-lg font-semibold text-slate-700">
                  No encontramos médicos
                </h3>

                <p className="mt-2 text-slate-500">
                  Intenta cambiar el nombre o seleccionar otra especialidad.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="grid md:grid-cols-4 gap-6 p-6">

  //     {/* SIDEBAR */}
  //     <aside className="md:col-span-1 bg-white p-4 rounded-2xl shadow-sm space-y-2 sticky top-4 h-fit">
  //       <div className="mb-4 lg:mb-b">
  //         <h2 className="font-bold text-lg ">Especialidades</h2>
  //       </div>
  //       {/* {categories.map((cat) => (
  //         <div key={cat.id}>
  //           <p className="text-sm font-semibold">{cat.name}</p>

  //           {cat.children?.map((sub: any) => (
  //             <label key={sub.id} className="block text-sm cursor-pointer">
  //               <input
  //                 type="radio"
  //                 name="category"
  //                 value={sub.slug}
  //                 checked={selectedCategory === sub.slug}
  //                 onChange={(e) => {
  //                   setSelectedCategory(e.target.value)
  //                   setPage(1)
  //                 }}
  //                 className="mr-2"
  //               />
  //               {sub.name}
  //             </label>
  //           ))}
  //         </div>
  //       ))} */}
      
  //        {categories
  //           .find((cat: any) => cat.slug === "especialidades") // clave
  //           ?.children?.map((sub: any) => (
  //             <label key={sub.id} className="block text-sm cursor-pointer">
  //               <input
  //                 type="radio"
  //                 name="category"
  //                 value={sub.slug}
  //                 checked={selectedCategory === sub.slug}
  //                 onChange={(e) => setSelectedCategory(e.target.value)}
  //                 className="mr-2"
  //               />
  //               {sub.name}
  //             </label>
  //           ))}
        
  //       <button
  //         onClick={() => {
  //           setSelectedCategory("")
  //           setPage(1)
  //         }}
  //         className="text-sm text-blue-600 !mt:mt-2 lg:!mt-4"
  //       >
  //         Limpiar filtros
  //       </button>
  //     </aside>

  //     {/* 🩺 RESULTADOS */}
  //     <div className="md:col-span-3 space-y-6">

  //       {loading && <p>Cargando...</p>}

  //       <div className="grid md:grid-cols-3 gap-6">
  //         {doctors.map((doc) => {
  //           console.log("DOC:", doc)
  //           const categorySlug =
  //             doc.categories?.[0]?.category?.slug || "general"

  //           return (
  //             <div
  //               key={doc.id}
  //               className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
  //             >
  //               <div className="overflow-hidden">
  //                 <img
  //                   src={doc.image || "/doctor.jpg"}
  //                   className="w-full h-56 object-cover hover:scale-105 transition"
  //                 />
  //               </div>

  //               <div className="p-4">
  //                 <h3 className="font-bold"> {doc.translations[0]?.name}</h3>
  //                 <p className="text-sm text-gray-500"> {doc.translations[0]?.city}</p>
              
  //                 <Link href={`/${locale}/directorio/${doc.slug}`}
  //                   className="text-blue-600 text-sm mt-2 inline-block"
  //                 >
  //                   Ver perfil
  //                 </Link>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>

  //       {/* PAGINACIÓN */}
  //       <div className="flex justify-center items-center gap-4 mt-10">
  //         <button
  //           disabled={page === 1}
  //           onClick={() => setPage(page - 1)}
  //           className="px-4 py-2 border rounded disabled:opacity-50"
  //         >
  //           ← Anterior
  //         </button>

  //         <span>
  //           Página {page} de {pages}
  //         </span>

  //         <button
  //           disabled={page === pages}
  //           onClick={() => setPage(page + 1)}
  //           className="px-4 py-2 border rounded disabled:opacity-50"
  //         >
  //           Siguiente →
  //         </button>
  //       </div>

  //     </div>
  //   </div>
  // )
}