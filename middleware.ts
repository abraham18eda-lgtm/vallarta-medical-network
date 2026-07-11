import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)


export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl

  // RUTAS ADMIN SIN LOCALE
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard")
    
  ) {

    const token = req.cookies.get("token")?.value
    const user = token ? await verifyToken(token) : null


    // Proteger CMS
    if (pathname.startsWith("/admin")) {
      if (!user) {
        return NextResponse.redirect(
          new URL("/login", req.url)
        )
      }
      if (user.role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/login", req.url)
        )
      }
      return NextResponse.next()
    }


    // Evitar login si ya está autenticado
    if (pathname === "/login" && user) {

      if (user.role === "ADMIN") {
        return NextResponse.redirect(
          new URL("/admin", req.url)
        )
      }
    }
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
    "/((?!api|_next|.*\\..*).*)"
  ]
}