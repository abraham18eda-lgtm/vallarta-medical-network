// export const dynamic = "force-dynamic"

// import Link from "next/link";
// import { prisma } from "@/lib/prisma";
// import SlideActions from "@/components/admin/SlideActions";

// export default async function SlidesPage() {
//   const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
//   const now = new Date();
//   const canAddSlide = slides.length < 3;

//   return (
//     <div className="p-8 min-h-screen bg-gray-50">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Slides</h1>
//         {canAddSlide && (
//           <Link href="/admin/slides/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//             + Agregar Slide
//           </Link>
//         )}
//       </div>

//       <div className="bg-white rounded-xl border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Imagen</th>
//               <th className="p-3 text-left">Título</th>
//               <th className="p-3 text-center">Locale</th>
//               <th className="p-3 text-center">Orden</th>
//               <th className="p-3 text-center">Activo</th>
//               <th className="p-3 text-center">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {slides.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center text-gray-500">
//                   No hay slides aún
//                 </td>
//               </tr>
//             )}
//             {slides.map((slide) => {
//               const active =
//                 slide.isActive &&
//                 (!slide.startAt || slide.startAt <= now) &&
//                 (!slide.endAt || slide.endAt >= now);

//               return (
//                 <tr key={slide.id} className="border-t">
//                   <td className="p-3">
//                     <img
//                       src={slide.imageDesktop || slide.image || ""}
//                       className="w-20 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-3">{slide.title}</td>
//                   <td className="p-3 text-center">{slide.locale}</td>
//                   <td className="p-3 text-center">{slide.order}</td>
//                   <td className="p-3 text-center">
//                     <span
//                       className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full ${
//                         active ? "bg-green-100 text-green-500" : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       {active && (
//                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" />
//                         </svg>
//                       )}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     <SlideActions id={String(slide.id)} />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import SlideActions from "@/components/admin/SlideActions"

export default async function SlidesPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  })

  const now = new Date()

  // return (
  //   <div className="p-8 bg-gray-50 min-h-screen">

  //     {/* HEADER */}
  //     <div className="flex justify-between items-center mb-6">
  //       <div>
  //         <h1 className="text-3xl font-bold">Hero Slides</h1>
  //         <p className="text-gray-500 text-sm">
  //           Administra banners del home
  //         </p>
  //       </div>

  //       <Link
  //         href="/admin/slides/new"
  //         className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
  //       >
  //         + Nuevo Slide
  //       </Link>
  //     </div>

  //     {/* TABLE */}
  //     <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

  //       <table className="w-full text-sm">
  //         <thead className="bg-gray-100 text-gray-600">
  //           <tr>
  //             <th className="p-4 text-left">Preview</th>
  //             <th className="p-4 text-left">Título</th>
  //             <th className="p-4 text-center">Locale</th>
  //             <th className="p-4 text-center">Orden</th>
  //             <th className="p-4 text-center">Estado</th>
  //             <th className="p-4 text-center">Acciones</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {slides.map((slide) => {

  //             const active =
  //               slide.isActive &&
  //               (!slide.startAt || slide.startAt <= now) &&
  //               (!slide.endAt || slide.endAt >= now)

  //             return (
  //               <tr key={slide.id} className="border-t hover:bg-gray-50">

  //                 {/* IMAGE */}
  //                 <td className="p-4">
  //                   <img
  //                     src={slide.image}
  //                     className="w-24 h-14 object-cover rounded-lg border"
  //                   />
  //                 </td>

  //                 <td className="p-4 font-medium">
  //                   {slide.title}
  //                 </td>

  //                 <td className="p-4 text-center">
  //                   {slide.locale}
  //                 </td>

  //                 <td className="p-4 text-center">
  //                   {slide.order}
  //                 </td>

  //                 {/* STATUS */}
  //                 <td className="p-4 text-center">
  //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
  //                     active
  //                       ? "bg-green-100 text-green-600"
  //                       : "bg-gray-100 text-gray-500"
  //                   }`}>
  //                     {active ? "Activo" : "Inactivo"}
  //                   </span>
  //                 </td>

  //                 {/* ACTIONS */}
  //                 {/* <td className="p-4 text-center">
  //                   <Link
  //                     href={`/admin/slides/${slide.id}/edit`}
  //                     className="text-blue-600 hover:underline"
  //                   >
  //                     Editar
  //                   </Link>
  //                 </td> */}
  //                 <td className="p-3 text-center">
  //                   <SlideActions id={String(slide.id)} />
  //                 </td>

  //               </tr>
  //             )
  //           })}
  //         </tbody>
  //       </table>

  //     </div>
  //   </div>
  // )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hero Slides</h1>
          <p className="text-gray-500">CMS de banners</p>
        </div>

        <Link
          href="/admin/slides/new"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          + Nuevo
        </Link>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Imagen</th>
              <th className="p-4">Título</th>
              <th className="p-4">Orden</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {slides.map((slide) => (
              <tr key={slide.id} className="border-t">

                <td className="p-4">
                  <img
                    src={slide.image}
                    className="w-24 h-14 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4">{slide.title}</td>
                <td className="p-4 text-center">{slide.order}</td>

                <td className="p-4 text-center">
                  {slide.isActive ? "Activo" : "Inactivo"}
                </td>

                <td className="p-4">
                  <SlideActions id={String(slide.id)} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}