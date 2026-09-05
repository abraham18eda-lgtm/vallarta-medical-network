import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"

type Locale = "es" | "en"

function resolveDoctorLocale(
  doctor: {
    locale: string
    translations: { locale: string }[]
  } | null
): Locale {
  if (!doctor) {
    return "es"
  }

  // 1. Preferencia explícita del doctor
  if (doctor.locale === "es" || doctor.locale === "en") {
    return doctor.locale
  }

  // 2. Revisar traducciones disponibles
  const locales = doctor.translations.map(
    (translation) => translation.locale
  )

  // 3. Solo inglés
  if (locales.includes("en") && !locales.includes("es")) {
    return "en"
  }

  // 4. Español disponible
  if (locales.includes("es")) {
    return "es"
  }

  // 5. Fallback
  return "es"
}

export async function POST(req: Request) {
  const { email, password } = await req.json()
  // console.log("EMAIL RECIBIDO:", email)
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      doctor: {
        include: {
          translations: {
            select: {
              locale: true,
            },
          },
        },
      },
    },
  })
  // console.log("USERS:", user)
  if (!user) {
    return NextResponse.json({ error: "Usuario no existe" }, { status: 401 })
  }

  if (!user.password) { return new Response("Unauthorized",{status: 401}) }
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return NextResponse.json({ error: "Password incorrecto" }, { status: 401 })
  }

  const token = await signToken({
    id: user.id,
    email: user.email,
    role: user.role
  })
  
  const doctorLocale = user.role === "DOCTOR" ? resolveDoctorLocale(user.doctor) : null
  const res = NextResponse.json({ ok: true, role: user.role,  locale: doctorLocale, })

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return res
}