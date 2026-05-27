import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const locale =
    searchParams.get("locale") || "es"

  const places =
    await prisma.place.findMany({
      where: {
        isActive: true,
        showInNavbar: true,
        locale
      },
      orderBy: {
        navbarOrder: "asc"
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })

  return NextResponse.json(places)
}