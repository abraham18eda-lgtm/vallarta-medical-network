import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    // Primero borrar relaciones
    await prisma.placeTreatment.deleteMany({
      where: {
        treatmentId: params.id
      }
    })

    // Luego borrar tratamiento
    await prisma.treatment.delete({
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
        error: "Error deleting treatment"
      },
      { status: 500 }
    )
  }
}