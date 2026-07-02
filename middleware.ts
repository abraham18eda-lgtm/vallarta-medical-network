import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async  function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value
  const user = token ? await verifyToken(token) : null

  const { pathname } = req.nextUrl

  // 🔥 permitir rutas públicas SIEMPRE
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/upload")
  ) {
    return NextResponse.next()
  }
  
  // detectar locale (/es, /en, etc)
  const localeMatch = pathname.match(/^\/(es|en)/)
  const locale = localeMatch ? `/${localeMatch[1]}` : ""

  const isAdmin = pathname.startsWith(`${locale}/admin`)
  const isLogin = pathname.startsWith(`${locale}/login`)

  //  proteger admin
  if (isAdmin) {
    return NextResponse.next()
  } 

  // evitar login si ya está logeado
  if (isLogin && user) {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL(`${locale}/admin`, req.url))
    }

    if (user.role === "DOCTOR") {
      return NextResponse.redirect(new URL(`${locale}/dashboard`, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/:locale/admin/:path*",
    "/login",
    "/:locale/login"
  ]
}