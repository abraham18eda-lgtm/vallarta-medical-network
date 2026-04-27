import { prisma } from "@/lib/prisma"
import ContactForm from "@/components/form/ContactForm"

export default async function Page({ params }: any) {
  const { slug } = params

  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: {
      categories: {
        include: { category: true }
      }
    }
  })

  if (!doctor) return <div>No encontrado</div>

   return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <img
        src={doctor.image || "/doctor.jpg"}
        className="w-full h-64 object-cover rounded-xl"
      />

      <h1 className="text-2xl font-bold">{doctor.name}</h1>

      <p className="text-gray-600">{doctor.city}</p>

      <p>{doctor.description}</p>

      {/* FORM */}
      <form className="border p-4 rounded-xl space-y-3">
        <input placeholder="Nombre" className="w-full border p-2 rounded" />
        <input placeholder="Email" className="w-full border p-2 rounded" />
        <textarea placeholder="Mensaje" className="w-full border p-2 rounded" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Contactar
        </button>
      </form>

    </div>
  )
}

// "use client"
// import { useEffect, useState } from "react"
// import Link from "next/link"
// import DoctorsFilters from "@/components/form/ContactForm"

// export default function DoctorsList({ page, search, city }: any) {
//   const [data, setData] = useState<any>(null)

//   const load = async () => {
//     const res = await fetch(
//       `/api/doctors?page=${page}&search=${search}&city=${city}`
//     )
//     const json = await res.json()
//     setData(json)
//   }

//   useEffect(() => {
//     load()
//   }, [page, search, city])

//   if (!data) return <p>Cargando...</p>

//   return (
//     <div className="grid md:grid-cols-4 gap-6">

//       {/* SIDEBAR */}
//       <div>
//         <DoctorsFilters />
//       </div>

//       {/* LIST */}
//       <div className="md:col-span-3 space-y-6">

//         {data.doctors.map((doc: any) => (
//           <Link
//             key={doc.id}
//             href={`/directorio/${doc.slug}`}
//             className="bg-white p-4 rounded-xl shadow flex gap-4 hover:shadow-lg transition"
//           >
//             <img
//               src={doc.image || "/placeholder.jpg"}
//               className="w-24 h-24 rounded-xl object-cover"
//             />

//             <div className="flex-1">
//               <h3 className="font-semibold text-lg">
//                 {doc.name}
//               </h3>

//               <p className="text-sm text-gray-500">
//                 {doc.city}
//               </p>

//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {doc.categories.map((c: any) => (
//                   <span
//                     key={c.category.id}
//                     className="text-xs bg-blue-100 px-2 py-1 rounded"
//                   >
//                     {c.category.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </Link>
//         ))}

//         {/* PAGINACIÓN */}
//         <div className="flex gap-2">
//           {Array.from({ length: data.pages }).map((_, i) => (
//             <a
//               key={i}
//               href={`?page=${i + 1}`}
//               className="px-3 py-1 border rounded"
//             >
//               {i + 1}
//             </a>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }