import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    // verificar usuario
    let user = await prisma.user.findUnique({
      where: { email }
    })

    // si no existe → crear
    if (!user) {
      const hashed = await bcrypt.hash(password, 10)

      user = await prisma.user.create({
        data: {
          email,
          password: hashed,
          role: "USER"
        }
      })
    }

    // verificar si ya tiene doctor
    // let doctor = await prisma.doctor.findUnique({
    //   where: { userId: user.id }
    // })

    // si no tiene → crear
    // if (!doctor) {
    //   doctor = await prisma.doctor.create({
    //     data: {
    //       name,
    //       slug: name.toLowerCase().replace(/\s+/g, "-"),
    //       email,
    //       userId: user.id
    //     }
    //   })
    // }

    // login automático
    const token = await signToken({
      id: user.id,
      role: user.role
    })

    const res = NextResponse.json({ ok: true })

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    return res

  } catch (error) {
    console.error("REGISTER ERROR:", error)

    return NextResponse.json(
      { error: "Error en registro" },
      { status: 500 }
    )
  }
}