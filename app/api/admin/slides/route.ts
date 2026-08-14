import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // validar order
     const order = Number(body.order)

    if (
      !Number.isInteger(order) ||
      order < 1 ||
      order > 99
    ) {

      return NextResponse.json(
        {
          error:
            "El orden debe ser un número entero entre 1 y 99."
        },
        {
          status: 400
        }
      )
    }


    // locale  

    const locale = body.locale || "es"

   
    // validar el orden existente

    const existingOrder =
      await prisma.heroSlide.findFirst({
        where: {
          locale: locale,
          order: order
        }
      })

    if (existingOrder) {

      return NextResponse.json(
        {
          error:
            `El orden ${order} ya existe para ${locale.toUpperCase()}.`
        },
        {
          status: 409
        }
      )
    }


    const slide = await prisma.heroSlide.create({
      data: {
        image: body.image,
        title: body.title,
        highlight: body.highlight || null,
        description: body.description || null,
        link: body.link || null,
        locale: locale,
        order: order,
        startAt: body.startAt ? new Date(body.startAt) : null,
        endAt: body.endAt ? new Date(body.endAt) : null,
        isActive: body.isActive ?? true,

        imageMobile: body.imageMobile || null,

        imageTablet: body.imageTablet || null
      }
    })

    return NextResponse.json(slide, { status: 201 })
  } catch (error: any) {
    console.error(error)

    if (
      error?.code === "P2002"
    ) {

      return NextResponse.json(
        {
          error:
            "El orden seleccionado ya existe para este idioma."
        },
        {
          status: 409
        }
      )
    }
      
    return NextResponse.json(
      { error: "Error creando slide" },
      { status: 500 }
    )
  }
}