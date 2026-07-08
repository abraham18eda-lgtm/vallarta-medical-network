import DoctorsList from "@/components/home/DoctorsList"

type Props = {
  params: Promise<{
    locale: "es" | "en"
  }>
}

export default async  function DirectorioPage({ params }: Props) {
   const { locale } = await params
  return (
    <div>
      {/* <h1 className="text-2xl font-bold p-6 text-center">
       {locale === "en"
          ? "Doctors Directory"
          : "Directorio de Doctores"}
      </h1> */}

      <DoctorsList locale={locale} />
    </div>
  )
}