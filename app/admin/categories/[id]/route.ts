import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  const updated = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.name.toLowerCase().replace(/\s+/g, "-"),
      parentId: body.parentId || null // 🔥 FIX CLAVE
    }
  })

  return NextResponse.json(updated)
}

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