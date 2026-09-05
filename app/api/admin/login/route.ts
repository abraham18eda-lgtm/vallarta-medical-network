import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const admin = await db.user.findUnique({
    where: { email },
  })

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  if (!admin.password) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const valid = await bcrypt.compare(password, admin.password)

  if (!valid) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  if (admin.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const token = await signToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  })

  const response = NextResponse.json({
    ok: true,
  })

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
