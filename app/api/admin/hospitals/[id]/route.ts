import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const updated = await prisma.hospital.update({
    where: { id },
    data: body
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.hospitalImage.deleteMany({
    where: { hospitalId: id }
  })

  await prisma.hospital.delete({
    where: { id }
  })

  return NextResponse.json({ success: true })
}