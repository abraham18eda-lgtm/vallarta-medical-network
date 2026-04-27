import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  console.log("GET ID:", id)

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      categories: {
        include: { category: true }
      }
    }
  })

  return NextResponse.json(doctor)
}

export async function PUT(
  req: Request,
  context : { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    console.log("UPDATE DOCTOR:", id, body)

    // 1️⃣ actualizar doctor
    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: body.name,
        city: body.city,
        image: body.image
      }
    })

    // 2️⃣ eliminar relaciones anteriores
    await prisma.doctorCategory.deleteMany({
      where: { doctorId: id }
    })

    // 3️⃣ crear nuevas relaciones
    if (body.categories?.length) {
      await prisma.doctorCategory.createMany({
        data: body.categories.map((catId: string) => ({
          doctorId: id,
          categoryId: catId
        }))
      })
    }

    return NextResponse.json(updatedDoctor)

  } catch (error) {
    console.error("ERROR UPDATE:", error)

    return NextResponse.json(
      { error: "Error actualizando doctor" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log("DELETE DOCTOR:", id)

    // 1️⃣ eliminar relaciones
    await prisma.doctorCategory.deleteMany({
      where: { doctorId: id }
    })

    // 2️⃣ eliminar doctor
    await prisma.doctor.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("DELETE ERROR:", error)

    return NextResponse.json(
      { error: "Error eliminando doctor" },
      { status: 500 }
    )
  }
}
