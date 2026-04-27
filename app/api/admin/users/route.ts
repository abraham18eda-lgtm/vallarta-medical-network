import { NextResponse, NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {

  // obtener token correctamente
  const token = req.cookies.get("token")?.value

  const user = token ? await verifyToken(token) : null

  // proteger ruta
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      role: "USER" // siempre forzado
    }
  })

  return NextResponse.json(newUser)
}