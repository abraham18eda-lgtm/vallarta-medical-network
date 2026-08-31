import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token)
    : null

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

// ======================================================
// GET - OBTENER PLACE
// ======================================================

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

    const place = await prisma.place.findUnique({
      where: {
        id,
      },

      include: {
        // ----------------------------------------------
        // TRADUCCIONES
        // ----------------------------------------------

        translations: true,

        // ----------------------------------------------
        // DOCTORES
        // ----------------------------------------------

        doctors: {
          include: {
            doctor: true,
          },
        },

        // ----------------------------------------------
        // CATEGORÍAS
        // ----------------------------------------------

        categories: {
          include: {
            category: true,
          },
        },

        // ----------------------------------------------
        // HOME FEATURED
        // ----------------------------------------------

        homeFeatured: true,

        // ----------------------------------------------
        // NAVIGATION
        // ----------------------------------------------

        navigationItems: true,

        // ----------------------------------------------
        // IMÁGENES
        // ----------------------------------------------

        images: true,

        // ----------------------------------------------
        // TRATAMIENTOS
        // ----------------------------------------------

        treatments: true,
      },
    })

    if (!place) {
      return NextResponse.json(
        { error: "Lugar no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(place)

  } catch (error) {
    console.error("GET PLACE ERROR:", error)

    return NextResponse.json(
      { error: "Error cargando lugar" },
      { status: 500 }
    )
  }
}


// ======================================================
// PUT - ACTUALIZAR PLACE
// ======================================================

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

    // ==================================================
    // VALIDACIONES
    // ==================================================

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

    if (!body.type) {
      return NextResponse.json(
        { error: "El tipo de lugar es obligatorio" },
        { status: 400 }
      )
    }

    if (!body.categoryIds?.length) {
      return NextResponse.json(
        { error: "Selecciona al menos una especialidad" },
        { status: 400 }
      )
    }

    // ==================================================
    // TRANSACTION
    // ==================================================

    const updatedPlace = await prisma.$transaction(
      async (tx) => {

        // ==============================================
        // ACTUALIZAR PLACE
        // ==============================================

        await tx.place.update({
          where: {
            id,
          },

          data: {

            // ------------------------------------------
            // CAMPOS GENERALES
            // ------------------------------------------

            type: body.type,

            email:
              body.email?.trim() || null,

            phone:
              body.phone?.trim() || null,

            mobile:
              body.mobile?.trim() || null,

            phone2:
              body.phone2?.trim() || null,

            image:
              body.image || null,

            facebook:
              body.facebook?.trim() || null,

            instagram:
              body.instagram?.trim() || null,

            twitter:
              body.twitter?.trim() || null,

            youtube:
              body.youtube?.trim() || null,

            website:
              body.website?.trim() || null,

            postalCode:
              body.postalCode?.trim() || null,

            locale:
              body.locale || "es",

            isActive:
              typeof body.isActive === "boolean"
                ? body.isActive
                : true,

            showInNavbar:
              typeof body.showInNavbar === "boolean"
                ? body.showInNavbar
                : false,

            navbarOrder:
              typeof body.navbarOrder === "number"
                ? body.navbarOrder
                : 0,

            // ------------------------------------------
            // TRADUCCIÓN
            // ------------------------------------------

            translations: {
              upsert: {
                where: {
                  placeId_locale: {
                    placeId: id,
                    locale: body.translation.locale,
                  },
                },

                update: {
                  name:
                    body.translation.name.trim(),

                  slug:
                    body.translation.slug?.trim() ||
                    undefined,

                  description:
                    body.translation.description?.trim() ||
                    null,

                  city:
                    body.translation.city?.trim() ||
                    null,

                  state:
                    body.translation.state?.trim() ||
                    null,

                  address:
                    body.translation.address?.trim() ||
                    null,
                },

                create: {
                  locale:
                    body.translation.locale,

                  name:
                    body.translation.name.trim(),

                  slug:
                    body.translation.slug?.trim() ||
                    body.translation.name
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, "-"),

                  description:
                    body.translation.description?.trim() ||
                    null,

                  city:
                    body.translation.city?.trim() ||
                    null,

                  state:
                    body.translation.state?.trim() ||
                    null,

                  address:
                    body.translation.address?.trim() ||
                    null,
                },
              },
            },
          },
        })


        // ==============================================
        // DOCTORES
        // ==============================================

        await tx.doctorPlace.deleteMany({
          where: {
            placeId: id,
          },
        })

        if (
          Array.isArray(body.doctorIds) &&
          body.doctorIds.length > 0
        ) {
          await tx.doctorPlace.createMany({
            data: body.doctorIds.map(
              (doctorId: string) => ({
                doctorId,
                placeId: id,
              })
            ),
          })
        }


        // ==============================================
        // CATEGORÍAS
        // ==============================================

        await tx.placeCategory.deleteMany({
          where: {
            placeId: id,
          },
        })

        if (
          Array.isArray(body.categoryIds) &&
          body.categoryIds.length > 0
        ) {
          await tx.placeCategory.createMany({
            data: body.categoryIds.map(
              (categoryId: string) => ({
                placeId: id,
                categoryId,
              })
            ),
          })
        }


        // ==============================================
        // DEVOLVER PLACE ACTUALIZADO
        // ==============================================

        return await tx.place.findUnique({
          where: {
            id,
          },

          include: {
            translations: true,

            doctors: {
              include: {
                doctor: true,
              },
            },

            categories: {
              include: {
                category: true,
              },
            },

            homeFeatured: true,

            navigationItems: true,

            images: true,

            treatments: true,
          },
        })
      }
    )


    // ==================================================
    // RESPUESTA
    // ==================================================

    return NextResponse.json({
      success: true,
      place: updatedPlace,
    })

  } catch (error) {

    console.error(
      "ERROR ACTUALIZANDO PLACE:",
      error
    )

    return NextResponse.json(
      { error: "Error actualizando lugar" },
      { status: 500 }
    )
  }
}


// ======================================================
// DELETE - ELIMINAR PLACE
// ======================================================

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

    await prisma.$transaction(
      async (tx) => {

        // ----------------------------------------------
        // HOME FEATURED
        // ----------------------------------------------

        await tx.homeFeatured.deleteMany({
          where: {
            placeId: id,
          },
        })


        // ----------------------------------------------
        // DOCTORES
        // ----------------------------------------------

        await tx.doctorPlace.deleteMany({
          where: {
            placeId: id,
          },
        })


        // ----------------------------------------------
        // CATEGORÍAS
        // ----------------------------------------------

        await tx.placeCategory.deleteMany({
          where: {
            placeId: id,
          },
        })


        // ----------------------------------------------
        // PLACE
        // ----------------------------------------------

        await tx.place.delete({
          where: {
            id,
          },
        })
      }
    )


    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(
      "DELETE PLACE ERROR:",
      error
    )

    return NextResponse.json(
      { error: "Error eliminando lugar" },
      { status: 500 }
    )
  }
}
