import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { doctorId, type } = body

  if (!doctorId || !type) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }

  await prisma.analytics.create({
    data: {
      doctorId,
      type
    }
  })

  return NextResponse.json({ ok: true })
}