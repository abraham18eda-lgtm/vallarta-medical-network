import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  const cookieStore = await cookies()

  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ user: null })
  }

  const user = await verifyToken(token)

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({ user })
}
