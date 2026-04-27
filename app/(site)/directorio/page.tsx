import DoctorsList from "@/components/home/DoctorsList"

export default function Page({ searchParams }: any) {
  const page = searchParams.page || 1
  const search = searchParams.search || ""
  const city = searchParams.city || ""

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Directorio de Doctores
        </h1>

        <DoctorsList  />
      </div>

    </div>
  )
}