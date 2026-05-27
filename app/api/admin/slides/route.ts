import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const slide = await prisma.heroSlide.create({
      data: {
        image: body.image,
        title: body.title,
        highlight: body.highlight,
        description: body.description,
        link: body.link,
        locale: body.locale || "es",
        order: body.order || 0,
        startAt: body.startAt ? new Date(body.startAt) : null,
        endAt: body.endAt ? new Date(body.endAt) : null,
        isActive: body.isActive ?? true
      }
    })

    return NextResponse.json(slide)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error creando slide" },
      { status: 500 }
    )
  }
}