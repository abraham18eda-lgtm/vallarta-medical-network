import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { slugify } from "@/lib/slugify"

// GET (listar)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error cargando categorías" },
      { status: 500 }
    )
  }
}


// POST (crear)
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: slugify(body.name),
        parentId: body.parentId || null,
        type: body.type || "DOCTOR"
      }
    })

    return NextResponse.json(category)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error creando categoría" },
      { status: 500 }
    )
  }
}