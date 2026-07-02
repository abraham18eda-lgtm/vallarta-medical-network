import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TopOftalmologia() {
  const category = await prisma.category.findFirst({
    where: {
      slug: "oftalmología", // <-- usa el slug que tienes actualmente en la BD
    },
    include: {
      places: {
        include: {
          place: true,
        },
      },
    },
  });

  const places = category?.places.map((item) => item.place) ?? [];

  if (places.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Centros de Oftalmología
          </h2>

          <p className="mt-2 text-gray-600">
            Encuentra clínicas y hospitales especializados en salud visual.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {places.slice(0, 6).map((place) => (
            <Link
              key={place.id}
              href={`/es/clinicas/${place.slug}`}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={place.image || "/hospital.jpg"}
                alt={place.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {place.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {place.city}
                </p>

                <span className="mt-4 inline-flex text-sm font-semibold text-[#0F4C81]">
                  Ver perfil →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}