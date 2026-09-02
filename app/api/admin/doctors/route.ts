import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { sendDoctorInvitationEmail } from "@/lib/email"
import crypto from "crypto"

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

/**
 * GET
 * Lista todos los doctores
 */
export async function GET() {
  const user = await requireAdmin()

  if (!user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        translations: true,
        categories: {
          include: {
            category: true,
          },
        },
        homeFeatured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(doctors)
  } catch (error) {
    console.error("ERROR CARGANDO DOCTORES:", error)

    return NextResponse.json(
      {
        error: "Error cargando doctores",
      },
      {
        status: 500,
      }
    )
  }
}

/**
 * POST
 * Crear doctor + usuario + invitación
 */
export async function POST(req: Request) {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()

    // ============================
    // DATOS
    // ============================

    const email = body.email?.trim()
    const name = body.translation?.name?.trim()
    const phone = body.phone?.trim()
    const locale = body.translation?.locale
    const slug = body.slug?.trim()

    // ============================
    // VALIDACIONES
    // ============================

    const EMAIL_REGEX =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    const PHONE_REGEX =
      /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}(?:\s ext\. \d{1,6})?$/

    if (!name) {
      return NextResponse.json(
        {
          error: "El nombre es obligatorio",
        },
        { status: 400 }
      )
    }

    if (name.length < 3) {
      return NextResponse.json(
        {
          error:
            "El nombre debe tener al menos 3 caracteres",
        },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        {
          error: "El email es obligatorio",
        },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          error:
            "El email no tiene un formato válido",
        },
        { status: 400 }
      )
    }

    if (!locale) {
      return NextResponse.json(
        {
          error: "El idioma es obligatorio",
        },
        { status: 400 }
      )
    }

    if (!slug) {
      return NextResponse.json(
        {
          error: "El slug es obligatorio",
        },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        {
          error: "El teléfono es obligatorio",
        },
        { status: 400 }
      )
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        {
          error:
            "El teléfono no tiene un formato válido",
        },
        { status: 400 }
      )
    }

    if (!body.categories?.length) {
      return NextResponse.json(
        {
          error:
            "Debes seleccionar una especialidad",
        },
        { status: 400 }
      )
    }

    // ============================
    // COMPROBAR SLUG
    // ============================

    const existingDoctor =
      await prisma.doctor.findUnique({
        where: {
          slug,
        },
      })

    if (existingDoctor) {
      return NextResponse.json(
        {
          error:
            "Ya existe un doctor con ese slug",
        },
        {
          status: 400,
        }
      )
    }

    // ============================
    // COMPROBAR EMAIL
    // ============================

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Ese email ya está registrado",
        },
        {
          status: 400,
        }
      )
    }

    // ============================
    // TOKEN DE INVITACIÓN
    // ============================

    const invitationToken =
      crypto.randomBytes(32).toString("hex")

    // ============================
    // CREAR TODO EN TRANSACCIÓN
    // ============================

    const result = await prisma.$transaction(
      async (tx) => {
        // 1. Crear usuario

        const newUser = await tx.user.create({
          data: {
            email,
            password: null,
            role: "DOCTOR",
          },
        })

        // 2. Crear doctor

        const doctor = await tx.doctor.create({
          data: {
            name,
            slug,
            userId: newUser.id,
            email,
            phone,
            image: body.image || null,
            gender: body.gender || null,
            description:
              body.translation?.description?.trim() ||
              null,
            city:
              body.translation?.city?.trim() ||
              null,
            state:
              body.translation?.state?.trim() ||
              null,
            isActive: body.isActive ?? true,

            translations: {
              create: {
                locale,
                name,
                description:
                  body.translation?.description?.trim() ||
                  null,
                city:
                  body.translation?.city?.trim() ||
                  null,
                state:
                  body.translation?.state?.trim() ||
                  null,
              },
            },
          },
        })

        // 3. Crear categorías

        await tx.doctorCategory.createMany({
          data: body.categories.map(
            (categoryId: string) => ({
              doctorId: doctor.id,
              categoryId,
            })
          ),
        })

        // 4. Crear Home Featured

        if (body.featuredHome) {
          const last =
            await tx.homeFeatured.findFirst({
              orderBy: {
                order: "desc",
              },
            })

          await tx.homeFeatured.create({
            data: {
              type: "doctor",
              doctorId: doctor.id,
              order: (last?.order ?? 0) + 1,
            },
          })
        }

        // 5. Crear invitación

        const invitation =
          await tx.doctorInvitation.create({
            data: {
              token: invitationToken,
              userId: newUser.id,
              expiresAt: new Date(
                Date.now() +
                  1000 * 60 * 60 * 24
              ),
            },
          })

        return {
          user: newUser,
          doctor,
          invitation,
        }
      }
    )

    // ============================
    // ENVIAR EMAIL
    // ============================

    try {
      await sendDoctorInvitationEmail({
        email,
        doctorName: name,
        token: invitationToken,
      })
    } catch (emailError) {
      console.error(
        "ERROR ENVIANDO INVITACIÓN:",
        emailError
      )

      return NextResponse.json(
        {
          success: true,
          warning:
            "El doctor fue creado, pero no se pudo enviar el correo de invitación.",
          doctor: result.doctor,
        },
        {
          status: 201,
        }
      )
    }

    // ============================
    // RESPUESTA
    // ============================

    return NextResponse.json(
      {
        success: true,
        message:
          "Doctor creado y correo de invitación enviado.",
        doctor: result.doctor,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(
      "ERROR CREANDO DOCTOR:",
      error
    )

    return NextResponse.json(
      {
        error: "Error creando doctor",
      },
      {
        status: 500,
      }
    )
  }
}