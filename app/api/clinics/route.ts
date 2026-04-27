import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || 1)
  const take = 12
  const skip = (page - 1) * take

  const where: any = {
    name: {
      contains: search,
      mode: "insensitive"
    }
  }

  const [clinics, total] = await Promise.all([
    prisma.clinic.findMany({
      where,
      include: {
        images: true
      },
      take,
      skip,
      orderBy: { createdAt: "desc" }
    }),
    prisma.clinic.count({ where })
  ])

  return NextResponse.json({
    clinics,
    total,
    pages: Math.ceil(total / take)
  })
}