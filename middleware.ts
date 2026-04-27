import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value
  const user = token ? verifyToken(token) : null

  const { pathname } = req.nextUrl

  // detectar locale (/es, /en, etc)
  const localeMatch = pathname.match(/^\/(es|en)/)
  const locale = localeMatch ? `/${localeMatch[1]}` : ""

  const isAdmin = pathname.startsWith(`${locale}/admin`)
  const isLogin = pathname.startsWith(`${locale}/login`)

  // 🔒 proteger admin
  if (isAdmin && !user) {
    return NextResponse.redirect(new URL(`${locale}/login`, req.url))
  }

  // 🔁 evitar login si ya está logeado
  if (isLogin && user) {
    return NextResponse.redirect(new URL(`${locale}/admin`, req.url))
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