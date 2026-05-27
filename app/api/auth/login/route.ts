import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  // console.log("EMAIL RECIBIDO:", email)
  const user = await prisma.user.findUnique({
    where: { email }
  })
  // console.log("USERS:", user)
  if (!user) {
    return NextResponse.json({ error: "Usuario no existe" }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return NextResponse.json({ error: "Password incorrecto" }, { status: 401 })
  }

  const token = await signToken({
    id: user.id,
    email: user.email,
    role: user.role
  })

  const res = NextResponse.json({ ok: true, role: user.role })

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: false, // localhost
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return res
}