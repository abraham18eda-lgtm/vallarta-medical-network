import DoctorsList from "@/components/home/DoctorsList"

type Props = {
  params: Promise<{
    locale: "es" | "en"
  }>
  searchParams: Promise<{
    page?: string
    search?: string
    city?: string
  }>
}

export default async function Page({
  params,
  searchParams
}: Props) {

  const { locale } = await params
  const query = await searchParams

  const page = query.page || "1"
  const search = query.search || ""
  const city = query.city || ""

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          {locale === "en"
            ? "Doctors Directory"
            : "Directorio de Doctores"}
        </h1>

        <DoctorsList locale={locale} />

      </div>

    </div>
  )
}