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

  // const categories = await prisma.category.findMany({
  //   where: {
  //     parentId: null,
  //     ...(type ? { type } : {})
  //   },
  //   include: {
  //     children: true
  //   }
  // })
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
        ...(type ? { type } : {})
      },
      include: {
        children: true,
        _count: {
          select: {
            doctors: true
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    })

  // console.log(categories)
  return NextResponse.json(categories)
}

