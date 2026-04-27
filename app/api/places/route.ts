import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get("search") || ""
  const type = searchParams.get("type")
  const page = Number(searchParams.get("page") || 1)

  const take = 12
  const skip = (page - 1) * take

  const where: any = {
    name: { contains: search, mode: "insensitive" }
  }

  if (type) {
    where.type = type
  }

  const [places, total] = await Promise.all([
    prisma.place.findMany({
      where,
      include: { images: true },
      take,
      skip
    }),
    prisma.place.count({ where })
  ])

  return NextResponse.json({
    places,
    total,
    pages: Math.ceil(total / take)
  })
}