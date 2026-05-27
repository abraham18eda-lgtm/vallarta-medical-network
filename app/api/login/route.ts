import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(req: Request) {

  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: "Usuario no existe" }, { status: 400 })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json({ error: "Password incorrecto" }, { status: 400 })
    }

    // JWT
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    // COOKIE
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 días
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        email: user.email
      }
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error login" },
      { status: 500 }
    )
  }
}