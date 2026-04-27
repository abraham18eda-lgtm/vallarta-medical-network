import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true
    }
  })

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name) {
    return NextResponse.json({ error: "Nombre requerido" }, { status: 400 })
  }

  // generar slug automático
  const slug = body.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      parentId: body.parentId || null
    }
  })

  return NextResponse.json(category)
}