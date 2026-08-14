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

  // const updateSlide = async (data: any) => {
  //   "use server"

  //   try {

  //     // valido el order
  //     const order = Number(data.order)

  //     if (
  //       !Number.isInteger(order) ||
  //       order < 1 ||
  //       order > 20
  //     ) {
  //       return {
  //         success: false,
  //         error:
  //           "El orden debe ser un número entero entre 1 y 20."
  //       }
  //     }

  //     //  valido existe order

  //     const existingOrder =
  //       await prisma.heroSlide.findFirst({
  //         where: {
  //           locale: data.locale,
  //           order: order,

  //           // ignorar el slide que estamos editando
  //           NOT: {
  //             id: numericId
  //           }
  //         }
  //       })

  //     if (existingOrder) {
  //       return {
  //         success: false,
  //         error:
  //           `El orden ${order} ya existe para ${data.locale.toUpperCase()}.`
  //       }
  //     }

  //     // actualizo

  //     await prisma.heroSlide.update({
  //       where: {
  //         id: numericId
  //       },

  //       data: {
  //         ...data,

  //         order,

  //         startAt: data.startAt
  //           ? new Date(data.startAt)
  //           : null,

  //         endAt: data.endAt
  //           ? new Date(data.endAt)
  //           : null,
  //       },
  //     })

  //     return {
  //       success: true
  //     }

  //   } catch (error: any) {

  //     console.error(error)

  //     if (error?.code === "P2002") {
  //       return {
  //         success: false,
  //         error:
  //           `El orden ${data.order} ya existe para ${data.locale?.toUpperCase()}.`
  //       }
  //     }

  //     return {
  //       success: false,
  //       error:
  //         "Error actualizando el slide."
  //     }
  //   }
  // }

  const updateSlide = async (data: any) => {
    "use server"

    try {

      // ORDER

      const order = Number(data.order)

      if (
        !Number.isInteger(order) ||
        order < 1 ||
        order > 99
      ) {

        return {
          success: false,
          error:
            "El orden debe ser un número entero entre 1 y 99."
        }
      }

      // VALIDAR ORDEN EXISTENTE

      const existingOrder =
        await prisma.heroSlide.findFirst({
          where: {
            locale: data.locale,
            order: order,

            NOT: {
              id: numericId
            }
          }
        })

      if (existingOrder) {

        return {
          success: false,
          error:
            `El orden ${order} ya existe para ${data.locale.toUpperCase()}.`
        }
      }

      // actualizo

      await prisma.heroSlide.update({

        where: {
          id: numericId
        },

        data: {
          image: data.image,
          imageTablet: data.imageTablet || null,
          imageMobile: data.imageMobile || null,

          title: data.title,
          highlight: data.highlight || null,
          description: data.description || null,

          link: data.link || null,

          locale: data.locale,

          order: order,

          isActive: data.isActive,

          startAt: data.startAt
            ? new Date(data.startAt)
            : null,

          endAt: data.endAt
            ? new Date(data.endAt)
            : null,
        }
      })

      return {
        success: true
      }

    } catch (error: any) {

      console.error(
        "ERROR ACTUALIZANDO SLIDE:",
        error
      )

      // UNIQUE

      if (
        error?.code === "P2002"
      ) {

        return {
          success: false,
          error:
            "El orden seleccionado ya existe para este idioma."
        }
      }

      return {
        success: false,
        error:
          "Error actualizando el slide."
      }
    }
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