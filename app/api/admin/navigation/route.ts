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

    const item = await prisma.navigationItem.create({
      data: {
        title: body.title,
        slug: body.slug,
        url: body.url,
        locale: body.locale,
        order: body.order || 0,
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