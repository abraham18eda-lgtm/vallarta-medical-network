import { prisma } from "@/lib/prisma"
import Image from "next/image"
import DoctorAnalyticsTracker from "@/components/utils/DoctorAnalyticsTracker"
import WhatsAppButton from "@/components/utils/WhatsAppButton"
import DoctorGallery from "@/components/utils/DoctorGallery"
import DoctorCertificates from "@/components/doctors/DoctorCertificates"


import { Star, MapPin, BadgeCheck, ArrowUpRight } from 'lucide-react'

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
      },
      media: true
    }
  })
  // console.log(doctor);
  if (!doctor) {
    return (
      <div className="p-10 text-center">
        Doctor no encontrado
      </div>
    )
  }

  const especialidades =
    doctor.categories?.map(c => c.category.name) || []

  const galleryImages =
    doctor.media
      ?.filter(
        item => item.type === "GALLERY"
      )
      .map(
        item => item.url
      ) || []


  const certificates =
    doctor.media
      ?.filter(
        item => item.type === "CERTIFICATE"
      ) || []


  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-sky-300/20 blur-[120px]" />

        <div className="absolute right-0 top-24 h-[450px] w-[450px] rounded-full bg-cyan-300/20 blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-300/20 blur-[140px]" />

      </div>

      <div className="relative z-10">

        {/* TRACKER */}
        <DoctorAnalyticsTracker doctorId={doctor.id} />

        {/* HERO */}
       <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="glass-strong rounded-[32px] p-6 md:p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* FOTO */}
            <div className="relative shrink-0">

              {/* Glow */}
              <div className="absolute inset-0 scale-105 rounded-[28px] bg-gradient-to-br from-sky-400/20 to-cyan-300/20 blur-2xl" />

              <div className="relative">

                <div className="relative w-52 h-52 md:w-64 md:h-64">

                  <Image
                    src={doctor.image || "/doctor.jpg"}
                    alt={doctor.name}
                    fill
                    className="rounded-[28px] object-cover border border-white/60 shadow-xl"
                  />

                </div>

              </div>

            </div>

            {/* INFORMACIÓN */}
            <div className="flex-1 text-center md:text-left">

              {/* Badge */}

              {/* <span className="inline-flex items-center rounded-full bg-sky-500/10 text-sky-700 border border-sky-200 px-4 py-1 text-xs font-semibold tracking-wide uppercase">

                Médico Especialista

              </span> */}
              
              {/* Nombre */}

              <h1 className="font-heading mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-600">
                Dr. {doctor.name}
              </h1>   

              {/* Especialidades */}

              {especialidades.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {especialidades.map((esp) => (
                    <span
                      key={esp}
                      className="text-gradient-primary rounded-full text-base text-sky-500 font-medium"
                    >
                      {esp}
                    </span>
                  ))}
                </div>
              )}           

              {/* Descripción */}

              {doctor.description && (

                <p className="mt-4 max-w-2xl text-slate-600 leading-7">

                  {doctor.description.slice(0, 140)}
                  {doctor.description.length > 140 && "..."}

                </p>

              )}

              {/* Ciudad */}

              <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-slate-600">

                <MapPin className="w-5 h-5 text-slate-500" />

                <span>
                  {doctor.city || "Sin ubicación"}
                </span>

              </div>

              {/* Botones */}

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">

                {doctor.phone && (

                  <WhatsAppButton
                    doctorId={doctor.id}
                    phone={doctor.phone}
                  />

                )}

                <a
                  href="#contacto"
                  className="
                    glass-soft
                    hover-shadow-sky
                    rounded-xl
                    px-5
                    py-3
                    flex
                    items-center
                    gap-2
                    font-medium
                    transition
                  "
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 21 21"
                  >
                    <path d="M0 0h21v21H0z" fill="none" />
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(3 3)"
                    >
                      <circle cx="7.5" cy="5.5" r="2" />
                      <path d="M.5 3.5h1v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1h-1m0-4h1m-1-2h1m-1 4h1" />
                      <path d="M10.5 10.5v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1" />
                    </g>
                  </svg>

                  Contactar

                </a>

              </div>

            </div>

          </div>

        </div>
      </div>



        {/* BODY */}
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-8">

            {/* ABOUT */}
           <div className="glass-soft rounded-[28px] p-6 md:p-8">

            {/* HEADER */}
            <div className="flex items-start gap-3 mb-5">
              <div
                className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-2xl
                bg-sky-500/10
                text-sky-600
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Sobre el doctor
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Conoce más sobre su experiencia profesional
                </p>

              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              className="
              text-slate-600
              leading-8
              text-[15px]
              md:text-base
              "
            >
              {doctor.description || "Sin descripción disponible"}
            </p>
            
          </div>


            {/* ESPECIALIDADES */}
            <div className="glass-soft rounded-[28px] p-6 md:p-8">
              {/* HEADER */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-2xl
                  bg-cyan-500/10
                  text-cyan-600
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>


                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Especialidades
                  </h2>

                  <p className="text-sm text-slate-500">
                    Áreas de atención médica
                  </p>

                </div>

              </div>


              {/* TAGS */}

              <div className="flex flex-wrap gap-3">

                {especialidades.length ? (

                  especialidades.map((esp) => (

                    <div
                      key={esp}
                      className="
                      glass-soft
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-slate-700
                      hover-shadow-sky
                      "
                    >

                      <span className="text-sky-500 mr-2">
                        ✦
                      </span>

                      {esp}

                    </div>

                  ))

                ) : (

                  <p className="text-slate-400">
                    No hay especialidades registradas
                  </p>

                )}

              </div>

            </div>

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
            <DoctorCertificates
              items={certificates}
            />

            <DoctorGallery
              images={galleryImages}
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
            <div className="glass-soft p-6 rounded-2xl shadow-sm">
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

                <button className="rounded-2xl
                  bg-gradient-to-r
                  from-sky-500
                  to-cyan-500
                  px-6
                  py-3
                  font-semibold
                  text-white
                  shadow-xl
                  transition
                  hover:-translate-y-1
                  hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.6)]"
                  >
                  Enviar
                </button>

              </form>
            </div>

          </div>

        </div>
      </div> 
    </div>
  )
}