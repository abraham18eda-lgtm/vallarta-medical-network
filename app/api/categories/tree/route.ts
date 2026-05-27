import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { CategoryType } from "@prisma/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const rawType = searchParams.get("type")

  const type =
    rawType === CategoryType.BLOG || rawType === CategoryType.DOCTOR
      ? rawType
      : undefined

  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
      ...(type ? { type } : {})
    },
    include: {
      children: true
    }
  })

  return NextResponse.json(categories)
}

// export async function GET() {
//   const categories = await prisma.category.findMany({
//     where: {
//       parentId: null,
//       type: "DOCTOR" // 🔥 SOLO DOCTORES
//     },
//     include: {
//       children: true
//     }
//   })

//   return NextResponse.json(categories)
// }