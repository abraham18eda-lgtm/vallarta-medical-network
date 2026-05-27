import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params
  try {
   
    // Primero borrar relaciones
    await prisma.placeTreatment.deleteMany({
      where: {
        treatmentId: id
      }
    })

    // Luego borrar tratamiento
    await prisma.treatment.delete({
      where: {
        id
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