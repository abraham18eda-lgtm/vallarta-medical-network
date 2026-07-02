import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TopSectionClinic() {
  const clinics = await prisma.place.findMany({
    where: {
      type: "CLINIC",
    },
    take: 6,
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          TOP Clínicas
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/es/clinicas/${clinic.slug}`}
              className="rounded-xl border overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={clinic.image || "/hospital.jpg"}
                alt={clinic.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {clinic.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {clinic.city}
                </p>

                <p className="text-sm mt-2 line-clamp-3">
                  {clinic.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}