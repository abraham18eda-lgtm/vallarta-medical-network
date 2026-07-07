import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const used = await prisma.block.findMany({
    select: { type: true, locale: true }
  })

  return NextResponse.json(used)
}