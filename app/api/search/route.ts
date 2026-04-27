import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""

  if (!q) return NextResponse.json([])

  // 🔍 DOCTORES
  const doctors = await prisma.doctor.findMany({
    where: {
      name: { contains: q, mode: "insensitive" }
    },
    take: 5
  })

  // 🔍 CATEGORÍAS Y SUB
  const categories = await prisma.category.findMany({
    where: {
      name: { contains: q, mode: "insensitive" },
      type: "DOCTOR"
    },
    take: 5
  })

  const results = [
    ...doctors.map(d => ({
      id: d.id,
      name: d.name,
      type: "Doctor"
    })),
    ...categories.map(c => ({
      id: c.id,
      name: c.name,
      type: "Especialidad"
    }))
  ]

  return NextResponse.json(results)
}