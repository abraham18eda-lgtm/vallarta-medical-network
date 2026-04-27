import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()

  // eliminar relaciones actuales
  await prisma.doctorCategory.deleteMany({
    where: { doctorId: params.id }
  })

  const doctor = await prisma.doctor.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      city: body.city,
      image: body.image,

      categories: {
        create: body.categoryIds?.map((id: string) => ({
          categoryId: id
        }))
      }
    }
  })

  return NextResponse.json(doctor)
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.doctor.delete({
    where: { id: params.id }
  })

  return NextResponse.json({ ok: true })
}