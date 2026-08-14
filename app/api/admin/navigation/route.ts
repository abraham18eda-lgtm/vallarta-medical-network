import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const items = await prisma.navigationItem.findMany({
    include: {
      place: true
    },
    orderBy: {
      order: "asc"
    }
  })

  return NextResponse.json(items)
}

export async function POST(req: Request) {

  try {

    const body = await req.json()

    //valido el order
    const order = Number(body.order)

    if (
      !Number.isInteger(order) ||
      order < 1 ||
      order > 99
    ) {
      return NextResponse.json(
        {
          error:
            "El orden debe ser un número entero entre 1 y 99"
        },
        {
          status: 400
        }
      )
    }
    //compruevo si existe
    const existing =
      await prisma.navigationItem.findFirst({
        where: {
          order: order
        }
      })

    if (existing) {

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

    // validar ruta
    const existingRoute =
      await prisma.navigationItem.findFirst({
        where: {
          slug: body.slug
        }
      })

    if (existingRoute) {
      return NextResponse.json(
        {
          error:
            `La ruta /${body.locale}/${body.slug} ya existe.`
        },
        {
          status: 409
        }
      )
    }

    // creo el item 
    const item = await prisma.navigationItem.create({
      data: {
        title: body.title,
        slug: body.slug,
        url: body.url,
        locale: body.locale,
        order: order,
        isActive: body.isActive,

        placeId: body.placeId || null
      }
    })

    return NextResponse.json(item)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error creando item" },
      { status: 500 }
    )
  }
}