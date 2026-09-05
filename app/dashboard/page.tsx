import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"

import CreateDoctorCard from "@/components/dashboard/CreateDoctorCard"
import IncompleteProfile from "@/components/dashboard/IncompleteProfile"
import DoctorDashboard from "@/components/dashboard/DoctorDashboard"
import { getDoctorAnalytics } from "@/lib/dashboard/doctorAnalytics"

export default async function DashboardPage() {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token)
    : null

  if (!user) {
    return (
      <div className="p-10">
        No autorizado
      </div>
    )
  }

  const doctor = await prisma.doctor.findFirst({
    where: {
      userId: Number(user.id),
    },
    include: {
      translations: true,
    },
  })

  // NO EXISTE PERFIL

  if (!doctor) {
    return <CreateDoctorCard />
  }

  // =========================
// IDIOMA DEL DOCTOR
// =========================

const availableLocales =
  doctor.translations.map(
    translation => translation.locale
  )

const doctorLocale =
  doctor.locale === "en" &&
  availableLocales.includes("en")
    ? "en"
    : doctor.locale === "es" &&
      availableLocales.includes("es")
      ? "es"
      : availableLocales.includes("es")
        ? "es"
        : "en"

  // TRANSLATION DEL DOCTOR

  const translation =
    doctor.translations.find(
      translation =>
        translation.locale === doctorLocale
    )


  // TEXTOS DEL DASHBOARD

  const t = await getTranslations({
    locale: doctorLocale,
    namespace: "dashboard",
  })

  const texts = {
    medicalPanel: t("medicalPanel"),

    welcome: t("welcome"),

    welcomeFemale: t("welcomeFemale"),

    cityNotDefined: t("cityNotDefined"),

    activeProfile: t("activeProfile"),

    backHome: t("backHome"),

    stats: {
      profileViews: t("stats.profileViews"),
      whatsappClicks: t("stats.whatsappClicks"),
      contacts: t("stats.contacts"),
      searches: t("stats.searches"),
    },

    searches: {
      title: t("searches.title"),
      description: t("searches.description"),
      empty: t("searches.empty"),
    },

    analytics: {
      title: t("analytics.title"),
      description: t("analytics.description"),
      views: t("analytics.views"),
      whatsapp: t("analytics.whatsapp"),
      contacts: t("analytics.contacts"),
      searches: t("analytics.searches"),
    },
  }

  // PERFIL INCOMPLETO

  if (!doctor.isActive) {
    return (
      <IncompleteProfile
        doctor={{
          ...doctor,
          name: translation?.name || "",
          city: translation?.city || "",
        }}
      />
    )
  }

  // ANALYTICS

  const stats = await getDoctorAnalytics(doctor.id)

  // DASHBOARD

  return (
    <DoctorDashboard
      doctor={{
        ...doctor,
        name: translation?.name || "",
        city: translation?.city || "",
        state: translation?.state || "",
        description: translation?.description || "",
      }}
      stats={stats}
      texts={texts}
    />
  )
}
