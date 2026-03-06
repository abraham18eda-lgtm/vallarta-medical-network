import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar archivos estáticos y Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // <- CLAVE: ignora archivos como .png .jpg .ico
  ) {
    return
  }

  // Si ya tiene locale, no hacer nada
  if (pathname.startsWith("/es") || pathname.startsWith("/en")) {
    return
  }

  // Redirigir solo páginas
  return NextResponse.redirect(new URL(`/es${pathname}`, request.url))
}

export const config = {
  matcher: [
    "/((?!api|_next|admin|.*\\..*).*)",
  ],
}