import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    // valido que exista
    const currentItem =
      await prisma.navigationItem.findUnique({
        where: {
          id
        }
      })

    if (!currentItem) {

      return NextResponse.json(
        {
          error:
            "El elemento no existe."
        },
        {
          status: 404
        }
      )
    }

    // valido el orden
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
    // valido el order

    const existingOrder =
      await prisma.navigationItem.findFirst({
        where: {
          order: order,

          // Ignorar el registro actual
          NOT: {
            id
          }
        }
      })

    if (existingOrder) {

      return NextResponse.json(
        {
          error:
            `El orden ${order} ya existe. Elige otro número.`
        },
        {
          status: 409
        }
      )
    }

    const slug = body.slug
    // valido ruta duplicada
    const existingRoute =
      await prisma.navigationItem.findFirst({
        where: {
          locale: body.locale,
          slug: slug,

          // Ignorar el registro actual
          NOT: {
            id
          }
        }
      })

    if (existingRoute) {

      return NextResponse.json(
        {
          error:
            `La ruta /${body.locale}/${slug} ya existe.`
        },
        {
          status: 409
        }
      )
    }

    // actualizo

    const updated =
      await prisma.navigationItem.update({
        where: { id },
        data: {
          title: body.title,
          slug: slug,
          url: body.url,
          locale: body.locale,
          placeId: body.placeId || null,
          isActive: body.isActive
        }
      })

    return NextResponse.json(updated)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Error actualizando"
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  
  try {
    const { id } = await params
    
    await prisma.navigationItem.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Error eliminando"
      },
      {
        status: 500
      }
    )
  }
}