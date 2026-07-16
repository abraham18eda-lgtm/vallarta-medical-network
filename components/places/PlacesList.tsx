"use client"

import { useEffect, useState } from "react"
import PlaceCard from "@/components/places/PlaceCard"

export default function PlacesList({ initialPlaces,categories,title, }: any) {

  const [places, setPlaces] = useState(initialPlaces)
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Funcion del checkbox
  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    )
  } 

  // FILTRO EN VIVO
  useEffect(() => {
    let filtered = initialPlaces

    if (search) {
      filtered = filtered.filter(
        (p:any)=>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.city?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if(selectedCategories.length){
        filtered = filtered.filter((place:any)=>
            place.categories.some((c:any)=>
                selectedCategories.includes(c.category.slug)
            )
        )
    }
    setPlaces(filtered)

  },[search,selectedCategories,initialPlaces])

  // useEffect(() => {
  //   if (!search) {
  //     setPlaces(initialPlaces)
  //     return
  //   }

  //   const filtered = initialPlaces.filter((p: any) =>
  //     p.name.toLowerCase().includes(search.toLowerCase()) ||
  //     p.city?.toLowerCase().includes(search.toLowerCase())
  //   )

  //   setPlaces(filtered)
  // }, [search, initialPlaces])

//   return (
//     // <div className="max-w-7xl mx-auto p-6 space-y-6">

//     //   {/* 🔝 HEADER */}
//     //   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

//     //     <h1 className="text-2xl font-bold capitalize">
//     //       Lugares disponibles
//     //     </h1>

//     //     {/* 🔍 BUSCADOR */}
//     //     <input
//     //       placeholder="Buscar clínica..."
//     //       className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600"
//     //       value={search}
//     //       onChange={(e) => setSearch(e.target.value)}
//     //     />

//     //   </div>

//     //   {/* 📊 CONTADOR */}
//     //   <p className="text-sm text-gray-500">
//     //     {places.length} resultados encontrados
//     //   </p>

//     //   {/* 🏥 GRID */}
//     //   {places.length > 0 ? (
//     //     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//     //       {places.map((place: any) => (
//     //         <PlaceCard key={place.id} place={place} />
//     //       ))}

//     //     </div>
//     //   ) : (
//     //     <div className="text-center text-gray-400 py-20">
//     //       No se encontraron resultados
//     //     </div>
//     //   )}

//     // </div>
//     <div className="max-w-7xl mx-auto p-6 py-20">
//       <div className="mb-10 text-center">
//         <h1 className="text-4xl font-bold tracking-tight text-slate-900">
//           {title}
//         </h1>

//         <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
//           Encuentra {title.toLowerCase()} por nombre o especialidad médicaa.
//         </p>
//       </div>

//     {/* <div className="mb-8">

//         <input
//             placeholder="Buscar clínica..."
//             value={search}
//             onChange={(e)=>setSearch(e.target.value)}
//             className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-600"
//         />

//     </div> */}

//     <div className="grid lg:grid-cols-[280px_1fr] gap-8">

//         {/* Sidebar */}
//         {/* <aside className="hidden lg:block">
//           <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

//           <div className="bg-gray-50 px-6 py-3">

//             <h2 className="text-sm font-semibold text-gray-700">
//               Busca por especialidad
//             </h2>

//           </div>

//           <div className="p-5">

//             <div className="relative mb-6">

//               <input
//                 placeholder="Buscar clínica..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20"
//               />

//             </div>

//             <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
//               Especialidades
//             </h3>

//             <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">

//               {categories.map((cat: any) => (

//                 <label
//                   key={cat.id}
//                   className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"
//                 >

//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(cat.slug)}
//                     onChange={() => toggleCategory(cat.slug)}
//                     className="h-4 w-4 accent-[#0F4C81]"
//                   />

//                   <span className="text-sm text-slate-700">
//                     {cat.name}
//                   </span>

//                 </label>

//               ))}

//             </div> 

//           </div>

//           </div>
//         </aside> */}

//         {/* Cards */}

//         <div>
//           {/* <p className="mt-1 text-sm text-slate-500 py-2">
//             {places.length} resultados encontrados
//           </p> */}
//           <div>
//              <div className="relative mb-6">

//               <input
//                 placeholder="Buscar clínica..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20"
//               />

//             </div>
//           </div>

//           {places.length > 0 ? (
//             <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
//               {places.map((place: any) => (
//                 <PlaceCard key={place.id} place={place} />
//               ))}
//             </div>
//           ) : (
//               <div className="col-span-full flex justify-center">
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center w-full">
//                 <h3 className="text-lg font-semibold text-slate-700">
//                   No encontramos clínicas
//                 </h3>

//                 <p className="mt-2 text-slate-500">
//                   Intenta cambiar el nombre o seleccionar otra especialidad.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//     </div>

// </div>
//   )

  return (
  <div className="max-w-7xl mx-auto px-6 py-20">

    {/* HEADER */}
    <section className="mb-14 text-center">

      <h1
        className="
          text-4xl
          md:text-5xl
          font-extrabold
          tracking-tight
          text-slate-900
        "
      >
        {title || "Clínicas"}
      </h1>


      <p
        className="
          mt-4
          max-w-2xl
          mx-auto
          text-base
          md:text-lg
          leading-relaxed
          text-slate-500
        "
      >
        Encuentra {title.toLowerCase()} por nombre o especialidad médica.
      </p>

    </section>



    {/* LISTADO HEADER + BUSCADOR */}
    <section>

      <div
        className="
          mb-4
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-end
          md:justify-end
        "
      >
      
        {/* BUSCADOR */}
        <div
          className="
            w-full
            md:w-80
          "
        >

          <input
            placeholder="Buscar clínica..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              text-slate-700
              shadow-sm
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#0F4C81]
              focus:ring-4
              focus:ring-[#0F4C81]/10
            "
          />

        </div>


      </div>




      {/* CONTADOR */}
      <div className="mb-2 flex">

        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-[#0F4C81]/5
            px-4
            py-2
            text-sm
            font-semibold
            text-[#0F4C81]
          "
        >
          Resultados {":"}  {places.length} {title.toLowerCase()}
        </span>

      </div>




      {/* GRID CLINICAS */}
      {
        places.length > 0 ? (

          <div
            className="
              grid
              gap-8
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {
              places.map((place:any)=>(
                
                <PlaceCard
                  key={place.id}
                  place={place}
                />

              ))
            }


          </div>


        ) : (


          <div
            className="
              flex
              justify-center
            "
          >

            <div
              className="
                w-full
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                py-24
                text-center
              "
            >

              <h3
                className="
                  text-xl
                  font-bold
                  text-slate-700
                "
              >
                No encontramos clínicas
              </h3>


              <p
                className="
                  mt-3
                  text-slate-500
                "
              >
                Intenta cambiar el nombre de búsqueda.
              </p>


            </div>


          </div>


        )
      }


    </section>


  </div>
)
}