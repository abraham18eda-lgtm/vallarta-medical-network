import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const locale =
    searchParams.get("locale") || "es"

  const items =
    await prisma.navigationItem.findMany({
      where: {
        locale,
        isActive: true
      },
      orderBy: {
        order: "asc"
      },
      include: {
        place: true
      }
    })

  return NextResponse.json(items)
}