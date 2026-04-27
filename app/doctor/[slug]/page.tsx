import { prisma } from "@/lib/prisma"

export default async function Page({ params }: any) {
  const doctor = await prisma.doctor.findUnique({
    where: { slug: params.slug }
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={doctor?.image || "/doctor.jpg"} className="rounded-xl mb-4" />

      <h1 className="text-2xl font-bold">{doctor?.name}</h1>
      <p className="text-gray-600">{doctor?.description}</p>

      {/* FORM */}
      <form
        action="/api/contact"
        method="POST"
        className="mt-6 space-y-4"
      >
        <input type="hidden" name="doctorId" value={doctor?.id} />

        <input name="name" placeholder="Nombre" className="input" />
        <input name="email" placeholder="Email" className="input" />
        <textarea name="message" placeholder="Mensaje" className="input" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Contactar
        </button>
      </form>
    </div>
  )
}