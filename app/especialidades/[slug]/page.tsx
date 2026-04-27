import { prisma } from "@/lib/prisma"

export default async function Page({ params }: any) {
  const doctors = await prisma.doctor.findMany({
    where: {
      categories: {
        some: {
          category: {
            slug: params.slug
          }
        }
      }
    }
  })

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {doctors.map((doc) => (
        <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
          <img src={doc.image || "/doctor.jpg"} className="rounded-lg mb-3" />
          <h3 className="font-semibold">{doc.name}</h3>
          <p className="text-sm text-gray-500">{doc.city}</p>

          <a
            href={`/doctor/${doc.slug}`}
            className="text-blue-600 text-sm mt-2 inline-block"
          >
            Ver perfil
          </a>
        </div>
      ))}
    </div>
  )
}