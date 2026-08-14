import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params

    const numericId = Number(id)

    if (!Number.isInteger(numericId)) {
      return NextResponse.json(
        {
          error: "ID inválido"
        },
        {
          status: 400
        }
      )
    }

    const slide =
      await prisma.heroSlide.findUnique({
        where: {
          id: numericId
        }
      })

    if (!slide) {
      return NextResponse.json(
        {
          error: "Slide no encontrado"
        },
        {
          status: 404
        }
      )
    }

    await prisma.heroSlide.delete({
      where: {
        id: numericId
      }
    })

    return NextResponse.json({
      success: true,
      message: "Slide eliminado correctamente"
    })

  } catch (error) {

    console.error(
      "Error eliminando slide:",
      error
    )

    return NextResponse.json(
      {
        error: "Error eliminando slide"
      },
      {
        status: 500
      }
    )
  }
}