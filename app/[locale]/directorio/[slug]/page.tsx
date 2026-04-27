import { prisma } from "@/lib/prisma"

export default async function DoctorProfile({ params }: {
  params: Promise<{ slug: string }>
}) {
    
  const { slug  } = await  params
  
  if (!slug) {
    return <div className="p-10">Slug inválido</div>
  }

  // 🔥 buscar doctor por slug
  const doctor = await prisma.doctor.findFirst({
    where: { slug },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  })

  // 🚨 si no existe
  if (!doctor) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Doctor no encontrado</h1>
      </div>
    )
  }
  const especialidades = doctor.categories?.map(c => c.category.name) || []
  
  // const especialidad =
  //   doctor.categories?.[0]?.category?.name || "Sin especialidad"

   return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-center">

          <img
            src={doctor.image || "/doctor.jpg"}
            className="w-40 h-40 object-cover rounded-2xl shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>

            <p className="text-blue-600 font-medium mt-1">
              {especialidades.join(", ") || "Sin especialidad"}
            </p>

            <p className="text-gray-500 mt-1">
              📍 {doctor.city || "Sin ubicación"}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {especialidades.map((esp, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs"
                >
                  {esp}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            {doctor.phone && (
              <a
                href={`https://wa.me/${doctor.phone}`}
                target="_blank"
                className="bg-green-500 text-white px-4 py-2 rounded-xl text-center"
              >
                WhatsApp
              </a>
            )}

            <a
              href="#contacto"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-center"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* IZQUIERDA */}
        <div className="md:col-span-2 space-y-6">

          {/* DESCRIPCIÓN */}
          {doctor.description && (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="font-bold text-lg mb-2">Sobre el doctor</h2>
              <p className="text-gray-600">{doctor.description}</p>
            </div>
          )}

          {/* ESPECIALIDADES */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-2">Especialidades</h2>

            <div className="flex flex-wrap gap-2">
              {especialidades.length > 0 ? (
                especialidades.map((esp, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {esp}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No asignadas</p>
              )}
            </div>
          </div>

          {/* GALERÍA (future ready) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-2">Galería</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <img src="/clinic.jpg" className="rounded-xl object-cover h-32 w-full"/>
              <img src="/clinic.jpg" className="rounded-xl object-cover h-32 w-full"/>
              <img src="/clinic.jpg" className="rounded-xl object-cover h-32 w-full"/>
            </div>
          </div>

        </div>

        {/* DERECHA */}
        <div id="contacto" className="space-y-6">

          {/* FORMULARIO */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-4">Contactar doctor</h2>

            <form
              action="/api/contact"
              method="POST"
              className="space-y-3"
            >
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
                type="email"
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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl"
              >
                Enviar solicitud
              </button>
            </form>
          </div>

          {/* INFO EXTRA */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-lg mb-2">Información</h2>

            <p className="text-sm text-gray-600">
              📍 {doctor.city || "No disponible"}
            </p>

            {doctor.phone && (
              <p className="text-sm text-gray-600">
                📞 {doctor.phone}
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}