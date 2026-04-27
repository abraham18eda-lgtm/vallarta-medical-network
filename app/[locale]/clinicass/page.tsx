// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"

// export default function ClinicsPage() {
//   const [clinics, setClinics] = useState<any[]>([])
//   const [search, setSearch] = useState("")
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const loadClinics = async () => {
//     const res = await fetch(
//       `/api/clinics?search=${search}&page=${page}`
//     )
//     const data = await res.json()

//     setClinics(data.clinics)
//     setTotalPages(data.pages)
//   }

//   useEffect(() => {
//     loadClinics()
//   }, [search, page])

//   return (
//     <div className="grid md:grid-cols-4 gap-6 p-6">

//       {/* 🔍 SIDEBAR */}
//       <aside className="bg-white p-4 rounded-2xl shadow-sm space-y-4">

//         <h2 className="font-bold text-lg">Buscar clínica</h2>

//         <input
//           placeholder="Ej: Hospital Ángeles"
//           className="w-full border p-2 rounded"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value)
//             setPage(1)
//           }}
//         />

//       </aside>

//       {/* 🏥 RESULTADOS */}
//       <div className="md:col-span-3 space-y-4">

//         <div className="grid md:grid-cols-3 gap-4">
//           {clinics.map((clinic) => (
//             <div
//               key={clinic.id}
//               className="bg-white rounded-2xl shadow-sm overflow-hidden"
//             >
//               <img
//                 src={clinic.image || "/clinic.jpg"}
//                 className="w-full h-48 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-bold">{clinic.name}</h3>

//                 <p className="text-sm text-gray-500">
//                   {clinic.city}
//                 </p>

//                 <Link
//                   href={`/es/clinicas/${clinic.slug}`}
//                   className="text-blue-600 text-sm mt-2 block"
//                 >
//                   Ver perfil →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* PAGINACIÓN */}
//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//           >
//             ←
//           </button>

//           <span>{page} / {totalPages}</span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//           >
//             →
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }