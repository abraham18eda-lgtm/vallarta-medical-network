import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)

export async function middleware(req: NextRequest) {

const { pathname } = req.nextUrl

// RUTAS ADMIN / AUTH / DASHBOARD SIN LOCALE

if (
  pathname.startsWith("/admin") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/doctor/activar")
) {

const doctorToken = req.cookies.get("token")?.value
const adminToken = req.cookies.get("admin_token")?.value

const doctorUser = doctorToken
  ? await verifyToken(doctorToken)
  : null

const adminUser = adminToken
  ? await verifyToken(adminToken)
  : null

// PROTEGER CMS

if (
  pathname.startsWith("/admin") &&
  pathname !== "/admin/login"
) {

  if (!adminUser || adminUser.role !== "ADMIN") {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    )
  }

  return NextResponse.next()
}


// EVITAR LOGIN DE DOCTOR SI YA ESTÁ AUTENTICADO

if (pathname === "/login" && doctorUser) {

  if (doctorUser.role === "DOCTOR") {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    )
  }

  if (doctorUser.role === "ADMIN") {
    return NextResponse.redirect(
      new URL("/admin", req.url)
    )
  }
}


// CONTINUAR CON LAS RUTAS SIN LOCALE

return NextResponse.next()


}

// API PUBLICAS

if (
  pathname.startsWith("/api/auth") ||
  pathname.startsWith("/api/upload")
) {
  return NextResponse.next()
}

// SITIO PUBLICO CON LOCALES

return handleI18nRouting(req)
}

export const config = {
  matcher: [
  "/((?!api|_next|.\..).*)"
  ]
}