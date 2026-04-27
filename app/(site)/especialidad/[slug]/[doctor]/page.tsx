import { prisma } from "@/lib/prisma"
import ContactForm from "@/components/form/ContactForm"

export default async function DoctorProfile({ params }: any) {
  const { slug } = params

  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: {
      categories: {
        include: { category: true }
      }
    }
  })

  if (!doctor) {
    return <div className="p-6">Doctor no encontrado</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* ================= MAIN ================= */}
        <div className="md:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white p-6 rounded-2xl shadow flex gap-6 items-center">
            <img
              src={doctor.image || "/placeholder.jpg"}
              className="w-28 h-28 rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold">
                {doctor.name}
              </h1>

              <p className="text-gray-500">
                {doctor.city}, {doctor.state}
              </p>

              {/* ESPECIALIDADES */}
              <div className="flex flex-wrap gap-2 mt-2">
                {doctor.categories.map((c) => (
                  <span
                    key={c.category.id}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {c.category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">
              Sobre el doctor
            </h2>

            <p className="text-gray-700">
              {doctor.description || "Sin descripción"}
            </p>
          </div>

        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-6">

          {/* CARD CONTACTO */}
          <div className="bg-white p-6 rounded-2xl shadow sticky top-20">
            <h3 className="font-semibold mb-4">
              Contactar
            </h3>

            <ContactForm doctorId={doctor.id} />
          </div>

        </div>

      </div>
    </div>
  )
}