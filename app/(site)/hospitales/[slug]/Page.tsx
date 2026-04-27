import { prisma } from "@/lib/prisma"
import ContactHospitalForm from "@/components/form/ContactHospitalForm"

export default async function HospitalDetail({ params }: any) {
  const { slug } = await params

  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: { images: true }
  })

  if (!hospital) return <div>No encontrado</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        {hospital.name}
      </h1>

      {/* GALERÍA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {hospital.images.map(img => (
          <img
            key={img.id}
            src={img.url}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>

      {/* INFO */}
      <p className="mb-4">{hospital.description}</p>

      <p className="text-sm text-gray-600">
        📍 {hospital.city} {hospital.state}
      </p>

      {/* FORM */}
      <div className="mt-8">
        <ContactHospitalForm hospitalId={hospital.id} />
      </div>

    </div>
  )
}