import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

export async function PUT(
  req: Request,
  { params }: Params
) {
  try {

    const body = await req.json()

    const updated =
      await prisma.navigationItem.update({
        where: {
          id: params.id
        },

        data: {
          title: body.title,
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
  { params }: Params
) {

  try {

    await prisma.navigationItem.delete({
      where: {
        id: params.id
      }
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