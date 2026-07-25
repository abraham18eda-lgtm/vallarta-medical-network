
// import { prisma } from "@/lib/prisma"
// import { notFound, redirect } from "next/navigation"
// import ImageUpload  from "@/components/admin/ImageUploadPreview"
// import { CalendarDays } from "lucide-react"
// import DatePicker from "react-datepicker"
// import { Switch } from "@headlessui/react"
// import { useState } from "react"

// export default async function EditBlockAd({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const numericId = Number(id)

//   if (isNaN(numericId)) return notFound()

//   const block = await prisma.block.findUnique({
//     where: { id: numericId },
//   })

//   if (!block) return notFound()

//   // Convertimos JSON a objeto usable
//   const data = block.data as {
//     title?: string
//     description?: string
//     image?: string
//     link?: string
//     alt?: string
//     locale?: string
//   }
  

//   async function updateBlock(formData: FormData) {
//     "use server"
    
//     // let imagePath = data.image ?? "";

//     const imagePath = (formData.get("image") as string) ||  data.image ||  "";

//     // if (file && file.size > 0) {
//     //   const bytes = await file.arrayBuffer()
//     //   const buffer = Buffer.from(bytes)

//     //   const fileName = `${Date.now()}-${file.name}`
//     //   const uploadPath = path.join(
//     //     process.cwd(),
//     //     "public/uploads",
//     //     fileName
//     //   )

//     //   await writeFile(uploadPath, buffer)

//     //   imagePath = `/uploads/${fileName}`
//     // }
    
//     await prisma.block.update({
//       where: { id: numericId },
//       data: {
//         locale: formData.get("locale") as string || data.locale,
//         order: Number(formData.get("order")) || 0,
//         isActive: formData.get("isActive") === "on",
//         startAt: formData.get("startAt")
//           ? new Date(formData.get("startAt") as string)
//           : null,
//         endAt: formData.get("endAt")
//           ? new Date(formData.get("endAt") as string)
//           : null,
//         data: {
//           title: formData.get("title") as string || "",
//           description: formData.get("description") as string || "",
//           image: imagePath,
//           alt: formData.get("alt") as string || "",
//           link: formData.get("link") as string || "",
//         },
//       },
//     });

//     redirect("/admin/block-ads")
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex justify-center py-10 px-4">

//       <form
//         action={updateBlock}
//         className="
//           w-full
//           max-w-3xl
//           bg-white
//           p-6
//           md:p-8
//           rounded-2xl
//           shadow-xl
//           space-y-6
//         "
//       >

//         <h1 className="text-2xl font-bold text-slate-800">
//           Editar Block Ad
//         </h1>


//         {/* Tipo */}
//         <div
//           className="
//             bg-sky-50
//             border
//             border-sky-100
//             text-sky-700
//             p-4
//             rounded-2xl
//             text-sm
//           "
//         >
//           Tipo:
//           <strong className="ml-2">
//             {block.type}
//           </strong>
//         </div>


//         {/* Titulo */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Título
//           </label>

//           <input
//             name="title"
//             defaultValue={data?.title ?? ""}
//             placeholder="Título"
//             className="
//               w-full
//               rounded-2xl
//               border
//               border-slate-200
//               px-4
//               py-3
//               shadow-sm
//               outline-none
//               transition
//               focus:border-sky-400
//               focus:ring-4
//               focus:ring-sky-100
//             "
//           />
//         </div>


//         {/* Descripción */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Descripción
//           </label>

//           <textarea
//             name="description"
//             defaultValue={data?.description ?? ""}
//             placeholder="Descripción"
//             className="
//               w-full
//               h-32
//               rounded-2xl
//               border
//               border-slate-200
//               px-4
//               py-3
//               shadow-sm
//               outline-none
//               resize-none
//               transition
//               focus:border-sky-400
//               focus:ring-4
//               focus:ring-sky-100
//             "
//           />
//         </div>


//         {/* Imagen */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Imagen
//           </label>

//           <ImageUpload
//             defaultImage={data?.image ?? ""}
//             name="image"
//           />
//         </div>


//         {/* Alt */}
//         <input
//           name="alt"
//           defaultValue={data?.alt ?? ""}
//           placeholder="Texto alternativo"
//           className="
//             w-full
//             rounded-2xl
//             border
//             border-slate-200
//             px-4
//             py-3
//             shadow-sm
//             outline-none
//             focus:border-sky-400
//             focus:ring-4
//             focus:ring-sky-100
//           "
//         />


//         {/* Link */}
//         <input
//           name="link"
//           defaultValue={data?.link ?? ""}
//           placeholder="Link"
//           className="
//             w-full
//             rounded-2xl
//             border
//             border-slate-200
//             px-4
//             py-3
//             shadow-sm
//             outline-none
//             focus:border-sky-400
//             focus:ring-4
//             focus:ring-sky-100
//           "
//         />


//         {/* Locale */}
//         <input
//           name="locale"
//           defaultValue={block.locale}
//           placeholder="Locale (es / en)"
//           className="
//             w-full
//             rounded-2xl
//             border
//             border-slate-200
//             px-4
//             py-3
//             shadow-sm
//             outline-none
//             focus:border-sky-400
//             focus:ring-4
//             focus:ring-sky-100
//           "
//         />


//         {/* Orden */}
//         <input
//           type="number"
//           name="order"
//           defaultValue={block.order ?? 0}
//           placeholder="Orden"
//           className="
//             w-full
//             rounded-2xl
//             border
//             border-slate-200
//             px-4
//             py-3
//             shadow-sm
//             outline-none
//             focus:border-sky-400
//             focus:ring-4
//             focus:ring-sky-100
//           "
//         />


//         {/* Fechas */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Fecha inicio
//             </label>

//             <input
//               type="datetime-local"
//               name="startAt"
//               defaultValue={
//                 block.startAt
//                   ? new Date(block.startAt)
//                       .toISOString()
//                       .slice(0, 16)
//                   : ""
//               }
//               className="
//                 w-full
//                 rounded-2xl
//                 border
//                 border-slate-200
//                 px-4
//                 py-3
//                 shadow-sm
//                 outline-none
//                 focus:border-sky-400
//                 focus:ring-4
//                 focus:ring-sky-100
//               "
//             />
//           </div>


//           <div className="space-y-2">

//             <label className="text-sm font-medium text-gray-700">
//               Fecha finalización
//             </label>

//             <input
//               type="datetime-local"
//               name="endAt"
//               defaultValue={
//                 block.endAt
//                   ? new Date(block.endAt)
//                       .toISOString()
//                       .slice(0, 16)
//                   : ""
//               }
//               className="
//                 w-full
//                 rounded-2xl
//                 border
//                 border-slate-200
//                 px-4
//                 py-3
//                 shadow-sm
//                 outline-none
//                 focus:border-sky-400
//                 focus:ring-4
//                 focus:ring-sky-100
//               "
//             />

//           </div>

//         </div>


//         {/* Estado */}
//         <div className="flex items-center gap-3">
//         <Switch
//           checked={enabled}
//           onChange={setEnabled}
//           className={`${
//             enabled
//               ? "bg-green-600"
//               : "bg-gray-300"
//           }
//           relative inline-flex
//           h-6
//           w-11
//           items-center
//           rounded-full
//           transition`}
//         >
//           <span
//             className={`${
//               enabled
//                 ? "translate-x-6"
//                 : "translate-x-1"
//             }
//             inline-block
//             h-4
//             w-4
//             transform
//             rounded-full
//             bg-white
//             transition`}
//           />
//         </Switch>


//         <span className="text-sm font-medium text-gray-700">
//           Activo
//         </span>

//       </div>


//       <input
//         type="hidden"
//         name="isActive"
//         value={enabled ? "true" : "false"}
//       />


//         {/* Botón */}
//         <button
//           type="submit"
//           className="
//             w-full
//             rounded-2xl
//             bg-gradient-to-r
//             from-sky-500
//             to-cyan-500
//             px-6
//             py-3
//             font-semibold
//             text-white
//             shadow-xl
//             transition
//             hover:-translate-y-1
//             hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.6)]
//           "
//         >
//           Guardar cambios
//         </button>

//       </form>

//     </div>
//   )
//   // return (
//   //   <form action={updateBlock} className="space-y-6 max-w-3xl">
//   //     <h1 className="text-2xl font-bold">
//   //       Editar Block Ad
//   //     </h1>

//   //     {/* Tipo (solo lectura) */}
//   //     <div className="bg-gray-100 p-3 rounded">
//   //       Tipo: <strong>{block.type}</strong>
//   //     </div>

//   //     <input
//   //       name="title"
//   //       defaultValue={data?.title ?? ""}
//   //       placeholder="Título"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     <textarea
//   //       name="description"
//   //       defaultValue={data?.description ?? ""}
//   //       placeholder="Descripción"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     <ImageUpload
//   //       defaultImage={data?.image ?? ""}
//   //       name="image"
//   //     />
//   //     <input
//   //       name="alt"
//   //       defaultValue={data?.alt ?? ""}
//   //       placeholder="Alt"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     <input
//   //       name="link"
//   //       defaultValue={data?.link ?? ""}
//   //       placeholder="Link"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     <input
//   //       name="locale"
//   //       defaultValue={block.locale}
//   //       placeholder="Locale (es / en)"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     <input
//   //       type="number"
//   //       name="order"
//   //       defaultValue={block.order ?? 0}
//   //       placeholder="Orden"
//   //       className="w-full border p-3 rounded-lg"
//   //     />

//   //     {/* Fechas */}
//   //     <div className="grid grid-cols-2 gap-4">
//   //       <input
//   //         type="datetime-local"
//   //         name="startAt"
//   //         defaultValue={
//   //           block.startAt
//   //             ? new Date(block.startAt).toISOString().slice(0, 16)
//   //             : ""
//   //         }
//   //         className="border p-3 rounded-lg"
//   //       />

//   //       <input
//   //         type="datetime-local"
//   //         name="endAt"
//   //         defaultValue={
//   //           block.endAt
//   //             ? new Date(block.endAt).toISOString().slice(0, 16)
//   //             : ""
//   //         }
//   //         className="border p-3 rounded-lg"
//   //       />
//   //     </div>

//   //     <label className="flex items-center gap-2">
//   //       <input
//   //         type="checkbox"
//   //         name="isActive"
//   //         defaultChecked={block.isActive}
//   //       />
//   //       Activo
//   //     </label>

//   //     <button
//   //       type="submit"
//   //       className="bg-primary text-white px-6 py-2 rounded-lg"
//   //     >
//   //       Guardar cambios
//   //     </button>
//   //   </form>
//   // )
// }

import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import BlockEditForm from "@/components/admin/BlockEditForm"


export default async function EditBlockAd({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const numericId = Number(id)

  if (isNaN(numericId)) {
    return notFound()
  }


  const block = await prisma.block.findUnique({
    where: {
      id: numericId,
    },
  })


  if (!block) {
    return notFound()
  }



  const data = block.data as {
    title?: string
    description?: string
    image?: string
    link?: string
    alt?: string
    locale?: string
  }



  async function updateBlock(
    formData: FormData
  ) {

    "use server"


    const imagePath =
      (formData.get("image") as string) ||
      data.image ||
      ""



    await prisma.block.update({

      where: {
        id: numericId,
      },


      data: {

        locale:
          (formData.get("locale") as string) ||
          data.locale ||
          "",


        order:
          Number(formData.get("order")) || 0,


        isActive:
          formData.get("isActive") === "true",


        startAt:
          formData.get("startAt")
            ? new Date(
                formData.get("startAt") as string
              )
            : null,


        endAt:
          formData.get("endAt")
            ? new Date(
                formData.get("endAt") as string
              )
            : null,


        data: {

          title:
            (formData.get("title") as string) ||
            "",


          description:
            (formData.get("description") as string) ||
            "",


          image: imagePath,


          alt:
            (formData.get("alt") as string) ||
            "",


          link:
            (formData.get("link") as string) ||
            "",

        },

      },

    })



    redirect("/admin/block-ads")
  }



  return (

    <BlockEditForm

      block={block}

      data={data}

      updateBlock={updateBlock}

    />

  )
}