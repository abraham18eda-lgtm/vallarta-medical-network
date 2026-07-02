import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

   try {
    const place = await prisma.place.findUnique({
      where: { id },
       include: {
        doctors: {
          include: { doctor: true }
        },
        categories: {
          include: { category: true }
        }
      }
    })

    if (!place) {
      return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 })
    }

    return NextResponse.json(place)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error cargando lugar" }, { status: 500 })
  }

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
      state: body.state,
      address: body.address,
      phone: body.phone,
      mobile: body.mobile,
      phone2: body.phone2,
      postalCode: body.postalCode,
      image: body.image,
      facebook: body.facebook,
      instagram: body.instagram,
      twitter: body.twitter,
      youtube: body.youtube,
      website: body.website,
      description: body.description
    }
  })

  // Limpiar y reinsertar relaciones
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

   // Limpiar y reinsertar categorias
  await prisma.placeCategory.deleteMany({
    where: { placeId: id },
  });

  if (body.categoryIds?.length) {
    await prisma.placeCategory.createMany({
      data: body.categoryIds.map((categoryId: string) => ({
        placeId: id,
        categoryId,
      })),
    });
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