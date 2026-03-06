import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  const blog = await prisma.blog.create({
    data,
  })

  return NextResponse.json(blog)
}