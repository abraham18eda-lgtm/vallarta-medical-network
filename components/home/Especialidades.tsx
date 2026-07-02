import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";

export default async function Especialidades() {
  const categories = await prisma.category.findMany({
    where: {
        type: CategoryType.DOCTOR,
        parentId: null,
    },
    include: {
        _count: {
        select: {
            doctors: true,
        },
        },
    },
    orderBy: {
        name: "asc",
    },
    });

  if (!categories.length) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            Especialidades Médicas
          </h2>

          <p className="mt-2 text-gray-600">
            Encuentra especialistas por área médica.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/es/especialidades/${category.slug}`}
              className="
                rounded-2xl
                border
                bg-white
                p-4
                text-center
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-[#0F4C81]
                hover:shadow-lg
              "
            >
                {/* <p className="mt-2 text-sm text-gray-500">
                    {category._count.doctors} especialistas
                </p> */}
              <h3 className="font-semibold text-lg text-slate-800">
                {category.name} →
              </h3>

              {/* <p className="mt-3 text-sm text-[#0F4C81] font-medium">
                Ver especialistas →
              </p> */}
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}