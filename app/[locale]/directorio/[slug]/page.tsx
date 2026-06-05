import { prisma } from "@/lib/prisma"
import Image from "next/image"
import DoctorAnalyticsTracker from "@/components/utils/DoctorAnalyticsTracker"
import WhatsAppButton from "@/components/utils/WhatsAppButton"
import DoctorGallery from "@/components/utils/DoctorGallery"

interface DoctorProfileProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function DoctorProfile({ params }: DoctorProfileProps) {

  const { slug, locale } = await params

  const doctor = await prisma.doctor.findFirst({
    where: { slug },
    include: {
      categories: {
        include: { category: true }
      }
    }
  })
  console.log(doctor);
  if (!doctor) {
    return (
      <div className="p-10 text-center">
        Doctor no encontrado
      </div>
    )
  }

  const especialidades =
    doctor.categories?.map(c => c.category.name) || []

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TRACKER */}
      <DoctorAnalyticsTracker doctorId={doctor.id} />

      {/* HERO */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">

          {/* FOTO */}
          <div className="w-full h-full min-h-[340px] md:w-40 md:h-40 relative mx-auto md:mx-0">
            <Image
              src={doctor.image || "/doctor.jpg"}
              alt={doctor.name}
              fill
              className="object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* INFO */}
          <div className="flex-1 text-center md:text-left">
            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
              {especialidades.map((esp) => (
                <span
                  key={esp}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs"
                >
                  {esp}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold">
              Dr. {doctor.name}
            </h1>            

            <p className="text-gray-500 mt-1">
              📍 {doctor.city || "Sin ubicación"}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex gap-4 justify-end ">    
              {doctor.phone && (
                <WhatsAppButton
                  doctorId={doctor.id}
                  phone={doctor.phone}
                />
              )}

              <a
                href="#contacto"
                className="bg-blue-600 text-white px-2 py-2 rounded-xl text-center"
              ><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 21 21">
                <path d="M0 0h21v21H0z" fill="none" />
                <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)">
                  <circle cx="7.5" cy="5.5" r="2" />
                  <path d="M.5 3.5h1v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1h-1m0-4h1m-1-2h1m-1 4h1" />
                  <path d="M10.5 10.5v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1" />
                </g>
              </svg>


                {/* Contactar */}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* ABOUT */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-2">
              Sobre el doctor
            </h2>
            <p className="text-gray-600">
              {doctor.description || "Sin descripción"}
            </p>
          </div>

          {/* ESPECIALIDADES */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-3">
              Especialidades
            </h2>

            <div className="flex flex-wrap gap-2">
              {especialidades.length ? (
                especialidades.map((esp) => (
                  <span
                    key={esp}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {esp}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">
                  Sin especialidades
                </p>
              )}
            </div>
          </div> */}

          {/* Gallery */}
          <DoctorGallery
            images={[
              "/clinic.jpg",
              "/clinic2.jpg",
              "/clinic3.jpg"
            ]}
          />
          {/* <div className="grid grid-cols-3 gap-3">

            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-xs text-gray-500">Vistas</p>
              <p className="text-xl font-bold">--</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-xs text-gray-500">Clicks</p>
              <p className="text-xl font-bold">--</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-xs text-gray-500">Contactos</p>
              <p className="text-xl font-bold">--</p>
            </div>

          </div> */}

        </div>

        {/* RIGHT */}
        <div id="contacto" className="space-y-6">

          {/* CONTACT FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold mb-4">
              Contactar doctor
            </h2>

            <form action="/api/contact" method="POST" className="space-y-3">

              <input type="hidden" name="doctorId" value={doctor.id} />

              <input
                name="name"
                placeholder="Nombre"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="phone"
                placeholder="Teléfono"
                className="w-full border p-2 rounded"
              />

              <textarea
                name="message"
                placeholder="Mensaje"
                className="w-full border p-2 rounded"
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
                Enviar
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}