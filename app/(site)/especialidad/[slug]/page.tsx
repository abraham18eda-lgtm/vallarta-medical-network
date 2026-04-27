import { prisma } from "@/lib/prisma"

export default async function Page({ params }: any) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      doctors: {
        include: {
          doctor: true
        }
      }
    }
  })

  if (!category) return <div>No encontrado</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {category.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {category.doctors.map(dc => (
          <div
            key={dc.doctor.id}
            className="border p-4 rounded-xl"
          >
            <h3 className="font-semibold">
              {dc.doctor.name}
            </h3>

            <p className="text-sm text-gray-500">
              {dc.doctor.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}