import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { token, password } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetExpires: { gt: new Date() }
    }
  })

  if (!user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hash,
      resetToken: null,
      resetExpires: null
    }
  })

  return NextResponse.json({ ok: true })
}