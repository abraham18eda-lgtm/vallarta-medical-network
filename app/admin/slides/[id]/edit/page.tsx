// import { prisma } from "@/lib/prisma"
// import SlideEditForm from "@/components/admin/SlideEditForm"

// export default async function EditSlidePage({
//   params,
// }: {
//   params: { id: string }
// }) {
//   const id = Number(params.id)

//   if (!Number.isInteger(id)) {
//     return <div>ID inválido</div>
//   }

//   const slide = await prisma.heroSlide.findUnique({
//     where: { id },
//   })

//   if (!slide) {
//     return <div>Slide no encontrado</div>
//   }

//   const handleUpdate = async (data: any) => {
//     "use server"
//     await prisma.heroSlide.update({
//       where: { id },
//       data,
//     })
//   }

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Editar Slide</h1>

//       <SlideEditForm
//         mode="edit"
//         slide={slide}
//         onSubmit={handleUpdate}
//       />
//     </div>
//   )
// }
export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import SlideEditForm from "@/components/admin/SlideEditForm"
import { redirect } from "next/navigation"

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)

  if (!numericId || isNaN(numericId)) {
    return (
      <div className="p-6 text-red-500 font-bold">
        ID inválido
      </div>
    )
  }

  const slideData = await prisma.heroSlide.findUnique({
    where: { id: numericId },
  })

  if (!slideData) {
    return (
      <div className="p-6 text-gray-500">
        Slide no encontrado
      </div>
    )
  }

  const slide = {
    ...slideData,

    startAt: slideData.startAt
      ? slideData.startAt.toISOString()
      : null,

    endAt: slideData.endAt
      ? slideData.endAt.toISOString()
      : null,
  }

  const updateSlide = async (data: any) => {
  "use server"

  await prisma.heroSlide.update({
    where: {
      id: numericId
    },
    data: {
      ...data,

      startAt: data.startAt
        ? new Date(data.startAt)
        : null,

      endAt: data.endAt
        ? new Date(data.endAt)
        : null,
    },
  })
   redirect("/admin/slides")
}

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Editar Slide
        </h1>

        {/* <SlideEditForm mode="edit" slide={slide} /> */}
        <SlideEditForm
          mode="edit"
          slide={slide}
          onSubmit={updateSlide}   
        />
      </div>
    </div>
  )
}