import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const places = await prisma.place.findMany({
    include: {
      doctors: {
        include: { doctor: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(places)
}

export async function POST(req: Request) {
  const body = await req.json()

  const place = await prisma.place.create({
    data: {
      name: body.name,
      slug: body.slug,
      type: body.type,
      city: body.city,
      address: body.address,
      phone: body.phone,
      image: body.image
    }
  })

  // Relación doctores
  if (body.doctorIds?.length) {
    await prisma.doctorPlace.createMany({
      data: body.doctorIds.map((docId: string) => ({
        doctorId: docId,
        placeId: place.id
      }))
    })
  }

  // categories
  if (body.categoryIds?.length) {
    await prisma.placeCategory.createMany({
      data: body.categoryIds.map((categoryId: string) => ({
        placeId: place.id,
        categoryId,
      })),
    });
  }

  return NextResponse.json(place)
}