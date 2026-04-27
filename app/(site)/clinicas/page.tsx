import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ClinicsPage() {
  const clinics = await prisma.clinic.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Clínicas
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {clinics.map((c) => (
          <Link
            key={c.id}
            href={`/clinicas/${c.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {c.image && (
              <img
                src={c.image}
                className="w-full h-48 object-cover"
                alt={c.name}
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">
                {c.name}
              </h3>

              <p className="text-sm text-gray-500">
                {c.city}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}