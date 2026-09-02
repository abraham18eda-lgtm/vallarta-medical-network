import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { getDoctorByUserId } from "@/lib/doctors"
import { getTranslations } from "next-intl/server"

import DashboardTopbar from "@/components/dashboard/DashboardTopbar"
import BottonBar from "@/components/layout/Bottombar"
import DashboardBottomBar from "@/components/dashboard/DashboardBottomBar"

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

  const localeCookie = cookieStore.get("APP_LOCALE")?.value

  const locale = localeCookie === "en" ? "en" : "es"

  const t = await getTranslations("dashboard")

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

      <div className="block md:hidden">
        <BottonBar />
      </div>

      <DashboardBottomBar />

    </div>
  )
}
