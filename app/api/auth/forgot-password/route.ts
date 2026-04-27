import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ ok: true })
  }

  const token = randomBytes(32).toString("hex")

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetExpires: new Date(Date.now() + 1000 * 60 * 30) // 30 min
    }
  })

  console.log("Reset link:")
  console.log(`http://localhost:3000/reset-password?token=${token}`)

  return NextResponse.json({ ok: true })
}