import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// ✅ GET (listar)
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

// ✅ POST (crear)
export async function POST(req: Request) {
  const body = await req.json()

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.name.toLowerCase().replace(/\s+/g, "-"),
      parentId: body.parentId || null
    }
  })

  return NextResponse.json(category)
}