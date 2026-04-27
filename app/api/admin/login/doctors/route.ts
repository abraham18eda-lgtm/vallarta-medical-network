import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//
// GET → listar doctores (para tabla admin)
//
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener doctores" },
      { status: 500 }
    )
  }
}

//
// 🔹 POST → crear doctor
//
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // validación básica
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "Nombre y slug son requeridos" },
        { status: 400 }
      )
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: body.name,
        slug: body.slug,
        city: body.city,
        image: body.image,

        categories: body.categoryIds?.length
          ? {
              create: body.categoryIds.map((id: string) => ({
                categoryId: id
              }))
            }
          : undefined
      }
    })

    return NextResponse.json(doctor)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error al crear doctor" },
      { status: 500 }
    )
  }
}