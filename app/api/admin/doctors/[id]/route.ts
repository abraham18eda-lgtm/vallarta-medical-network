import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user =
    token
      ? await verifyToken(token)
      : null

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin()

  if (!user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    // const { searchParams } = new URL(req.url)

    // const locale =
    //   searchParams.get("locale") || "es"

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        translations: true,
        categories: {
          include: {
            category: true,
          },
        },
        homeFeatured: true,

        places: {
            include: {
              place: true
            }
          },

          media: {
            orderBy: {
              order: "asc"
            }
          },
      },
    })
    // console.log("info:", doctor)
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

   const user = await requireAdmin()

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

  try {
    const { id } = await params
    const body = await req.json()

     const translation = body.translation

    if (!body.email) {
      return NextResponse.json(
        { error: "El email es obligatorio" },
        { status: 400 }
      )
    }

    if (!body.translation?.name) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      )
    }

    if (!body.translation?.locale) {
      return NextResponse.json(
        { error: "El idioma es obligatorio" },
        { status: 400 }
      )
    }

    if (!body.categories?.length) {
      return NextResponse.json(
        { error: "Selecciona al menos una especialidad" },
        { status: 400 }
      )
    }

    const updatedDoctor = await prisma.$transaction(async (tx) => {
    
      // ACTUALIZAR DOCTOR
      await tx.doctor.update({
        where: {
          id,
        },
        data: {
          email: body.email.trim(),

          phone:
            body.phone?.trim() || null,

          image:
            body.image || null,

          gender:
            body.gender || null,  

          isActive:
            typeof body.isActive === "boolean"
              ? body.isActive
              : true,
        },
      })

      await tx.doctorTranslation.upsert({
        where: {
          doctorId_locale: {
            doctorId: id,
            locale: translation.locale,
          },
        },

        update: {
          name: translation.name.trim(),
          description:
            translation.description?.trim() || null,
          city:
            translation.city?.trim() || null,
          state:
            translation.state?.trim() || null,
        },

        create: {
          doctorId: id,
          locale: translation.locale,
          name: translation.name.trim(),
          description:
            translation.description?.trim() || null,
          city:
            translation.city?.trim() || null,
          state:
            translation.state?.trim() || null,
        },
      })


      // ACTUALIZAR CATEGORÍAS

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

    
      // HOME FEATURED    
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

      return await tx.doctor.findUnique({
        where: { id },
        include: {
          translations: true,
          categories: {
            include: {
              category: true,
            },
          },
          homeFeatured: true,
          places: {
            include: {
              place: true,
            },
          },
          media: {
            orderBy: {
              order: "asc",
            },
          },
        },
      })
    })

    return NextResponse.json({
      success: true,
      doctor: updatedDoctor,
    })
    
  } catch (error) {
    console.error(
      "ERROR ACTUALIZANDO DOCTOR:",
      error
    )

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

   const user = await requireAdmin()

  if (!user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const { id } = await params

    await prisma.$transaction(async (tx) => {
      await tx.homeFeatured.deleteMany({
        where: {
          doctorId: id,
        },
      })

      await tx.doctorCategory.deleteMany({
        where: {
          doctorId: id
        }
      })  

      await tx.doctorPlace.deleteMany({
        where: {
          doctorId: id
        }
      })

      await tx.doctorMedia.deleteMany({
        where: {
          doctorId: id,
        },
      })

       await tx.analytics.deleteMany({
        where: {
          doctorId: id,
        },
      })

      await tx.doctor.delete({
        where: { id },
      })
    })

    return NextResponse.json({
      success: true,
    })

  } catch (error) {
    console.error(
      "DELETE DOCTOR ERROR:",
      error
    )

    return NextResponse.json(
      { error: "Error eliminando doctor" },
      { status: 500 }
    )
  }
}