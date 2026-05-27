import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const categories = await prisma.category.findMany({
    where: {
      type: "DOCTOR"
    },
    orderBy: {
      name: "asc"
    }
  })

  return NextResponse.json(categories)
}