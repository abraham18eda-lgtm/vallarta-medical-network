import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const place = await prisma.place.findUnique({
    where: { id },
    include: {
      doctors: {
        include: { doctor: true }
      }
    }
  })

  return NextResponse.json(place)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const updated = await prisma.place.update({
    where: { id },
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

  // 🔥 limpiar y reinsertar relaciones
  await prisma.doctorPlace.deleteMany({
    where: { placeId: id }
  })

  if (body.doctorIds?.length) {
    await prisma.doctorPlace.createMany({
      data: body.doctorIds.map((docId: string) => ({
        doctorId: docId,
        placeId: id
      }))
    })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.doctorPlace.deleteMany({
    where: { placeId: id }
  })

  await prisma.place.delete({
    where: { id }
  })

  return NextResponse.json({ success: true })
}