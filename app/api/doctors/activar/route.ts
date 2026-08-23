import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const token = body.token?.trim()
    const password = body.password

    // ============================
    // VALIDACIONES
    // ============================

    if (!token) {
      return NextResponse.json(
        {
          error: "Token de activación requerido.",
        },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        {
          error: "La contraseña es obligatoria.",
        },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      )
    }

    // ============================
    // BUSCAR INVITACIÓN
    // ============================

    const invitation =
      await prisma.doctorInvitation.findUnique({
        where: {
          token,
        },
      })

    if (!invitation) {
      return NextResponse.json(
        {
          error:
            "El enlace de activación no es válido.",
        },
        { status: 400 }
      )
    }

    // ============================
    // COMPROBAR SI YA FUE UTILIZADA
    // ============================

    if (invitation.usedAt) {
      return NextResponse.json(
        {
          error:
            "Esta invitación ya fue utilizada.",
        },
        { status: 400 }
      )
    }

    // ============================
    // COMPROBAR EXPIRACIÓN
    // ============================

    if (invitation.expiresAt < new Date()) {
      return NextResponse.json(
        {
          error:
            "Esta invitación ha expirado. Solicita una nueva invitación.",
        },
        { status: 400 }
      )
    }

    // ============================
    // BUSCAR USUARIO
    // ============================

    const user = await prisma.user.findUnique({
      where: {
        id: invitation.userId,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No se encontró el usuario asociado a esta invitación.",
        },
        { status: 404 }
      )
    }

    // ============================
    // GENERAR PASSWORD
    // ============================

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    // ============================
    // ACTUALIZAR TODO
    // ============================

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
          role: "DOCTOR",
        },
      }),

      prisma.doctorInvitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          usedAt: new Date(),
        },
      }),
    ])

    // ============================
    // RESPUESTA
    // ============================

    return NextResponse.json({
      success: true,
      message:
        "Cuenta activada correctamente.",
    })

  } catch (error) {
    console.error(
      "ERROR ACTIVANDO DOCTOR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "No se pudo activar la cuenta.",
      },
      { status: 500 }
    )
  }
}
