import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)

    const locale =
      searchParams.get("locale") || "es"

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        translations:{
          where:{
            locale
          }
        },
        categories: {
          include: {
            category: true,
          },
        },
        homeFeatured: true,
      },
    })

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(doctor)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error cargando doctor" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const updatedDoctor = await prisma.$transaction(async (tx) => {
      // ===========================
      // ACTUALIZAR DOCTOR
      // ===========================
      const doctor = await prisma.doctor.update({
        where: { id },

        data: {
          // Campos generales
          email: body.email,
          phone: body.phone,
          image: body.image,

          // Compatibilidad temporal (elimínalos cuando quites estos campos de Doctor)
          name: body.translation.name,
          description: body.translation.description,
          city: body.translation.city,
          state: body.translation.state,

          // Traducciones
          translations: {
            upsert: {
              where: {
                doctorId_locale: {
                  doctorId: id,
                  locale: body.translation.locale,
                },
              },

              update: {
                name: body.translation.name,
                description: body.translation.description,
                city: body.translation.city,
                state: body.translation.state,
              },

              create: {
                locale: body.translation.locale,
                name: body.translation.name,
                description: body.translation.description,
                city: body.translation.city,
                state: body.translation.state,
              },
            },
          },
        },
      })

      // ===========================
      // ACTUALIZAR CATEGORÍAS
      // ===========================
      await tx.doctorCategory.deleteMany({
        where: {
          doctorId: id,
        },
      })

      if (body.categories?.length) {
        await tx.doctorCategory.createMany({
          data: body.categories.map((categoryId: string) => ({
            doctorId: id,
            categoryId,
          })),
        })
      }

      // ===========================
      // HOME FEATURED
      // ===========================
      const existing = await tx.homeFeatured.findFirst({
        where: {
          doctorId: id,
        },
      })

      if (body.featuredHome) {
        if (!existing) {
          const lastFeatured = await tx.homeFeatured.findFirst({
            orderBy: {
              order: "desc",
            },
          })

          const nextOrder = (lastFeatured?.order ?? 0) + 1

          await tx.homeFeatured.create({
            data: {
              type: "doctor",
              doctorId: id,
              order: nextOrder,
            },
          })
        }
      } else {
        if (existing) {
          await tx.homeFeatured.delete({
            where: {
              id: existing.id,
            },
          })
        }
      }

      return doctor
    })

    return NextResponse.json(updatedDoctor)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error actualizando doctor" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.homeFeatured.deleteMany({
      where: {
        doctorId: id,
      },
    })

    await prisma.doctor.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error eliminando doctor" },
      { status: 500 }
    )
  }
}