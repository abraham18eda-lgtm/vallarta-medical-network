import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const total = await prisma.block.count({
    where: {
      type: {
        in: ["adsection1", "adsection2"],
      },
    },
  })

  if (total >= 4) {
    return Response.json(
      { error: "Límite alcanzado" },
      { status: 400 }
    )
  }

  const exists1 = await prisma.block.findFirst({
    where: { type: "adsection1" },
  })

  const newType = exists1 ? "adsection2" : "adsection1"

  await prisma.block.create({
    data: {
      type: newType,
      locale: "es",
      order: total + 1,
      isActive: false,
      data: {},
    },
  })

  return Response.json({ ok: true })
}