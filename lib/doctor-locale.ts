import { prisma } from "@/lib/prisma";

export type SupportedLocale = "es" | "en";

export async function getDoctorLocaleInfo(doctorId: string) {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
    select: {
      locale: true,
      translations: {
        select: {
          locale: true,
        },
      },
    },
  });

  if (!doctor) {
    return null;
  }

  const availableLocales = doctor.translations
    .map((translation) => translation.locale)
    .filter(
      (locale): locale is SupportedLocale =>
        locale === "es" || locale === "en"
    );

  let preferredLocale: SupportedLocale =
    doctor.locale === "en" ? "en" : "es";

  if (!availableLocales.includes(preferredLocale)) {
    if (availableLocales.includes("es")) {
      preferredLocale = "es";
    } else if (availableLocales.includes("en")) {
      preferredLocale = "en";
    }
  }

  return {
    preferredLocale,
    availableLocales,
  };
}
