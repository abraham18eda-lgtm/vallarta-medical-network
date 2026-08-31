import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

async function requireAdmin() {

  const cookieStore = await cookies()

  const token =
    cookieStore.get("token")?.value

  const user =
    token
      ? await verifyToken(token)
      : null

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}


// ========================================
// POST / CREATE OR UPDATE TRANSLATION
// ========================================

export async function POST(
  req: Request,
  {
    params
  }: {
    params: Promise<{ id: string }>
  }
) {

  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json(
      {
        error: "No autorizado"
      },
      {
        status: 401
      }
    )
  }

  try {

    const { id } = await params

    const body = await req.json()

    const doctorId = id

    // ==============================
    // VALIDAR DOCTOR
    // ==============================

    const doctor =
      await prisma.doctor.findUnique({
        where: {
          id: doctorId
        }
      })

    if (!doctor) {
      return NextResponse.json(
        {
          error: "Doctor no encontrado"
        },
        {
          status: 404
        }
      )
    }


    // ==============================
    // VALIDACIONES
    // ==============================

    const name =
      body.name?.trim()

    if (!name) {
      return NextResponse.json(
        {
          error:
            "El nombre de la traducción es obligatorio"
        },
        {
          status: 400
        }
      )
    }


    // ==============================
    // UPSERT
    // ==============================

    const translation =
      await prisma.doctorTranslation.upsert({

        where: {
          doctorId_locale: {
            doctorId,
            locale: "en"
          }
        },

        create: {
          doctorId,
          locale: "en",
          name,
          description:
            body.description?.trim() || null,
          city:
            body.city?.trim() || null,
          state:
            body.state?.trim() || null
        },

        update: {
          name,
          description:
            body.description?.trim() || null,
          city:
            body.city?.trim() || null,
          state:
            body.state?.trim() || null
        }

      })


    return NextResponse.json(
      translation
    )

  } catch (error) {

    console.error(
      "ERROR GUARDANDO TRADUCCIÓN:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Error guardando traducción"
      },
      {
        status: 500
      }
    )
  }
}
