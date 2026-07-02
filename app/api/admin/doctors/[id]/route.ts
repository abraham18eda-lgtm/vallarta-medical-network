import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await params

    const doctor = await prisma.doctor.findUnique({
      where: { id },

      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(doctor)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error cargando doctor" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await params

    const body = await req.json()

    const updatedDoctor =
      await prisma.doctor.update({

        where: { id },

        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          city: body.city,
          state: body.state,
          image: body.image,
          description: body.description,          
        }
      })

      // HOME FEATURED
      const existing = await prisma.homeFeatured.findFirst({
        where: { doctorId: id }
      })

      if (body.featuredHome) {
        if (!existing) {
          await prisma.homeFeatured.create({
            data: {
              type: "doctor",
              doctorId: id,
              order: 999,
            }
          })
        }
      } else {
        if (existing) {
          await prisma.homeFeatured.delete({
            where: { id: existing.id }
          })
        }
      }     

    return NextResponse.json(updatedDoctor)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error actualizando doctor" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await params

    await prisma.doctorCategory.deleteMany({
      where: {
        doctorId: id
      }
    })

    await prisma.doctor.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error eliminando doctor" },
      { status: 500 }
    )
  }
}