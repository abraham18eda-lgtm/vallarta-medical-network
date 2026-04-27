import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const slugify = (text: string) =>
  text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")

// 📥 GET (listar)
export async function GET() {
  const data = await prisma.hospital.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(data)
}

// 📤 POST (crear)
export async function POST(req: Request) {
  const body = await req.json()

  const hospital = await prisma.hospital.create({
    data: {
      name: body.name,
      slug: slugify(body.name),
      city: body.city,
      state: body.state,
      description: body.description,
      image: body.image
    }
  })

  return NextResponse.json(hospital)
}