import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      orderBy: {
        createdAt: "desc"
      },

      include: {
        places: {
          include: {
            place: true
          }
        }
      }
    })

    return NextResponse.json(treatments)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Error loading treatments"
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Nombre requerido"
        },
        { status: 400 }
      )
    }

    const slug = slugify(body.name)

    const exists = await prisma.treatment.findUnique({
      where: {
        slug
      }
    })

    if (exists) {
      return NextResponse.json(
        {
          error: "El tratamiento ya existe"
        },
        { status: 400 }
      )
    }

    const treatment = await prisma.treatment.create({
      data: {
        name: body.name,
        slug
      }
    })

    return NextResponse.json(treatment)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Error creating treatment"
      },
      { status: 500 }
    )
  }
}