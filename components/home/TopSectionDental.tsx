import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TopSectionDental() {
  const dentals = await prisma.place.findMany({
    where: {
      type: "DENTAL",
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
          TOP Clínicas Dentales 
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dentals.map((dental) => (
            <Link
              key={dental.id}
              href={`/es/dentales/${dental.slug}`}
              className="rounded-xl border overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={dental.image || "/hospital.jpg"}
                alt={dental.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {dental.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {dental.city}
                </p>

                <p className="text-sm mt-2 line-clamp-3">
                  {dental.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}