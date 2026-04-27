import DoctorsList from "@/components/home/DoctorsList"

export default function DirectorioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-6 text-center">
        Directorio de Doctores
      </h1>

      <DoctorsList />
    </div>
  )
}