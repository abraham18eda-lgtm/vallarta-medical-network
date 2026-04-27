import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HospitalsPage() {
  const hospitals = await prisma.hospital.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Hospitales
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {hospitals.map(h => (
          <Link
            key={h.id}
            href={`/hospitales/${h.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {h.image && (
              <img
                src={h.image}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">
                {h.name}
              </h3>

              <p className="text-sm text-gray-500">
                {h.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}