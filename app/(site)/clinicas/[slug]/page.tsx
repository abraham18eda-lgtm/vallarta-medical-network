import { prisma } from "@/lib/prisma"
import ContactHospitalForm from "@/components/form/ContactHospitalForm"

export default async function ClinicDetail({ params }: any) {

  // ⚠️ IMPORTANTE (Next moderno)
  const { slug } = params

  const clinic = await prisma.clinic.findUnique({
    where: { slug },
    include: { images: true }
  })

  if (!clinic) {
    return <div className="p-6">Clínica no encontrada</div>
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        {clinic.name}
      </h1>

      {/* GALERÍA */}
      {clinic.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {clinic.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* INFO */}
      <p className="mb-4">
        {clinic.description}
      </p>

      <p className="text-sm text-gray-600">
        📍 {clinic.city} {clinic.state}
      </p>

      {/* FORM */}
      <div className="mt-8">
        <ContactHospitalForm hospitalId={clinic.id} />
      </div>

    </div>
  )
}