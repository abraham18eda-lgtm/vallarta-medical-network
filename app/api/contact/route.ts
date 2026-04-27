import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, phone, message, doctorId } = body

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Campos requeridos" },
      { status: 400 }
    )
  }

  const contact = await prisma.contactRequest.create({
    data: {
      name,
      email,
      phone,
      message,
      doctorId
    }
  })

  return NextResponse.json(contact)
}