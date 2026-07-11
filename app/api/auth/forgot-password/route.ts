import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"
import { Resend } from "resend"

const resend = new Resend(
  process.env.RESEND_API_KEY
)


export async function POST(req: Request) {

  try {

    const { email } = await req.json()


    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })


    // Por seguridad no decimos si existe
    if(!user){

      return NextResponse.json({
        ok:true
      })

    }


    const token = crypto
      .randomBytes(32)
      .toString("hex")


    await prisma.passwordResetToken.create({

      data:{
        token,
        userId:user.id,
        expiresAt:new Date(
          Date.now() + 1000 * 60 * 60
        )
      }

    })



    const resetUrl =
      `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`



    await resend.emails.send({

      from:
      "Vallarta Medical Network <noreply@tudominio.com>",

      to:user.email,

      subject:
      "Recuperar contraseña",

      html:`

      <h2>Recuperación de contraseña</h2>

      <p>
      Haz clic en el siguiente enlace para crear una nueva contraseña:
      </p>

      <a href="${resetUrl}">
      Cambiar contraseña
      </a>

      <p>
      El enlace expira en 1 hora.
      </p>

      `

    })


    return NextResponse.json({
      ok:true
    })


  } catch(error){

    console.error(error)

    return NextResponse.json(
      {
        error:"Error enviando correo"
      },
      {
        status:500
      }
    )

  }

}