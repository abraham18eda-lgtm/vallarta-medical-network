import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { sendDoctorInvitationEmail } from "@/lib/email"
import crypto from "crypto"

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

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const { id } = await context.params

    /*
     * ============================
     * BUSCAR DOCTOR
     * ============================
     */

    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    if (!doctor) {
      return NextResponse.json(
        {
          error: "Doctor no encontrado",
        },
        { status: 404 }
      )
    }

    /*
     * ============================
     * COMPROBAR EMAIL
     * ============================
     */

    if (!doctor.user.email) {
      return NextResponse.json(
        {
          error: "El doctor no tiene un email asociado",
        },
        { status: 400 }
      )
    }

    /*
     * ============================
     * GENERAR NUEVO TOKEN
     * ============================
     */

    const invitationToken = crypto
      .randomBytes(32)
      .toString("hex")

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24
    )

    /*
     * ============================
     * BUSCAR INVITACIÓN
     * ============================
     */

    const existingInvitation =
      await prisma.doctorInvitation.findUnique({
        where: {
          userId: doctor.userId,
        },
      })

    let invitation

    if (existingInvitation) {
      /*
       * Ya existe una invitación.
       * La renovamos.
       */

      invitation =
        await prisma.doctorInvitation.update({
          where: {
            userId: doctor.userId,
          },
          data: {
            token: invitationToken,
            expiresAt,
            usedAt: null,
          },
        })
    } else {
      /*
       * Por si el doctor no tiene
       * invitación por alguna razón.
       */

      invitation =
        await prisma.doctorInvitation.create({
          data: {
            token: invitationToken,
            userId: doctor.userId,
            expiresAt,
          },
        })
    }

    /*
     * ============================
     * ENVIAR EMAIL
     * ============================
     */

    try {
      await sendDoctorInvitationEmail({
        email: doctor.user.email,
        doctorName: doctor.name,
        token: invitation.token,
      })
    } catch (emailError) {
      console.error(
        "ERROR ENVIANDO INVITACIÓN:",
        emailError
      )

      return NextResponse.json(
        {
          error:
            "La invitación fue actualizada, pero no se pudo enviar el correo.",
        },
        { status: 500 }
      )
    }

    /*
     * ============================
     * RESPUESTA
     * ============================
     */

    return NextResponse.json({
      success: true,
      message:
        "La invitación fue enviada nuevamente.",
    })
  } catch (error) {
    console.error(
      "ERROR REENVIANDO INVITACIÓN:",
      error
    )

    return NextResponse.json(
      {
        error: "Error reenviando invitación",
      },
      { status: 500 }
    )
  }
}