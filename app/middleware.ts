import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value

  const user = token ? await verifyToken(token) : null

  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/login") && user) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"]
}