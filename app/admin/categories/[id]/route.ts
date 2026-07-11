import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  // console.log("BODY:", body)
  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 })
  }

  if (!body.type) {
    return NextResponse.json({ error: "Type requerido" }, { status: 400 })
  }

  if (!["DOCTOR", "BLOG"].includes(body.type)) {
    return NextResponse.json({ error: "Type inválido" }, { status: 400 })
  }

  const type = String(body.type || "").toUpperCase()

  if (!["DOCTOR", "BLOG"].includes(type)) {
    return NextResponse.json(
      { error: "Type inválido" },
      { status: 400 }
    )
  }

  const updated = await prisma.category.update({
    where: { id  },
    data: {
      name: body.name,
      slug: body.name.toLowerCase().replace(/\s+/g, "-"),
      parentId: body.parentId ? body.parentId : null,
      type: body.type
    }
  })

  // console.log("UPDATED:", updated)
  
  return NextResponse.json(updated)
}



// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany({
//       orderBy: { createdAt: "desc" }
//     })

//     return NextResponse.json({
//       count: categories.length,
//       data: categories
//     })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json(
//       { error: "Error cargando categorías" },
//       { status: 500 }
//     )
//   }
// }