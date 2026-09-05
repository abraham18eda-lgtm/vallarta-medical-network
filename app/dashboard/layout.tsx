import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { getDoctorByUserId } from "@/lib/doctors"
import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"

import DashboardTopbar from "@/components/dashboard/DashboardTopbar"
import BottonBar from "@/components/layout/Bottombar"
import DashboardBottomBar from "@/components/dashboard/DashboardBottomBar"
import FooterDashboard from "@/components/layout/FooterDashboard" 
import Footer from "@/components/layout/Footer"

type Locale = "es" | "en"

function resolveLocale(
  preferredLocale: string | null | undefined,
  translations: { locale: string }[]
): Locale {

  const availableLocales = translations.map(
    translation => translation.locale
  )

  // 1. Preferencia del doctor
  if (
    preferredLocale === "en" &&
    availableLocales.includes("en")
  ) {
    return "en"
  }

  if (
    preferredLocale === "es" &&
    availableLocales.includes("es")
  ) {
    return "es"
  }

  // 2. Si no existe su preferencia,
  // usar español si existe
  if (availableLocales.includes("es")) {
    return "es"
  }

  // 3. Si solamente existe inglés
  if (availableLocales.includes("en")) {
    return "en"
  }

  // 4. Fallback definitivo
  return "es"
}


export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token) as AuthUser
    : null

  const doctor = user?.id
    ? await getDoctorByUserId(user.id)
    : null

  // =========================
  // IDIOMA
  // =========================

   let locale: Locale = "es"

  if (doctor) {

    const translations = await prisma.doctorTranslation.findMany({
      where: {
        doctorId: doctor.id
      },
      select: {
        locale: true
      }
    })

    locale = resolveLocale(
      doctor.locale,
      translations
    )
  }

  const t = await getTranslations({
    locale,
    namespace: "dashboard",
  })

  const texts = {
    medicalPanel: t("medicalPanel"),
    activeAccount: t("activeAccount"),
    logout: t("logout"),
    doctor: t("doctor"),
    backHome: t("backHome"),
  }

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
      "
    >

      <DashboardTopbar
        user={user}
        doctor={doctor}
        texts={texts}
        locale={locale}
      />

      <main>
        {children}
      </main>

      <Footer/>
      <div className="block md:hidden">
        <BottonBar />
      </div>

      <DashboardBottomBar />

    </div>
  )
}
