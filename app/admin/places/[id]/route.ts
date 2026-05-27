import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

// GET
export async function GET(req: Request, { params }: any) {
  const token = (await cookies()).get("token")?.value
  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const place = await prisma.place.findUnique({
    where: { id: params.id },
    include: {
      doctors: {
        include: { doctor: true }
      }
    }
  })

  return NextResponse.json(place)
}

// PUT
export async function PUT(req: Request, { params }: any) {
  const token = (await cookies()).get("token")?.value
  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()

  const updated = await prisma.place.update({
    where: { id: params.id },
    data: {
      name: body.name,
      type: body.type
    }
  })

  if (Array.isArray(body.doctorIds)) {
    await prisma.placeDoctor.deleteMany({
      where: { placeId: params.id }
    })

    await prisma.placeDoctor.createMany({
      data: body.doctorIds.map((doctorId: string) => ({
        placeId: params.id,
        doctorId
      }))
    })
  }

  return NextResponse.json(updated)
}

// DELETE
export async function DELETE(req: Request, { params }: any) {
  const token = (await cookies()).get("token")?.value
  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  await prisma.place.delete({
    where: { id: params.id }
  })

  return NextResponse.json({ ok: true })
}