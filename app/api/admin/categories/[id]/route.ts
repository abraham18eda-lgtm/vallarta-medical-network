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
      parentId: body.parentId || null
    }
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔥 CAMBIO AQUÍ
) {
  const { id } = await context.params // 🔥 FIX REAL

  console.log("DELETE ID:", id)

  if (!id) {
    return NextResponse.json(
      { error: "ID no recibido" },
      { status: 400 }
    )
  }

  try {
    await prisma.$transaction(async (tx) => {

      await tx.doctorCategory.deleteMany({
        where: { categoryId: id }
      })

      await tx.blog.updateMany({
        where: { categoryId: id },
        data: { categoryId: null }
      })

      await tx.category.deleteMany({
        where: { parentId: id }
      })

      await tx.category.delete({
        where: { id }
      })

    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("DELETE ERROR:", error)

    return NextResponse.json(
      { error: "No se pudo eliminar" },
      { status: 500 }
    )
  }
}