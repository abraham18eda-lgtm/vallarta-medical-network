import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";
import { Link } from "@/i18n/navigation";


export default async function EspecialidadesPage() {

  const locale = await getLocale();

  const t = await getTranslations("specialties");
  console.log("TITLE:", t("title"));

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
            {/* Especialidades Médicas */}
            {t("title")}
          </h2>

          <p className="mt-2 text-gray-600">
            {/* Encuentra especialistas por área médica. */}
            {t("description")}
          </p>
        </div>


        <div className="
          grid
          gap-5
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
        ">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={{
                pathname: "/directorio/[specialty]",
                params: {
                  specialty: category.slug,
                },
              }}
            //   href="/"
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
              <h3 className="font-semibold text-lg text-slate-800">
              {locale === "es"
                ? category.name
                : t(category.slug)} {" →"}
              </h3>

              {/* <p className="mt-2 text-sm text-slate-500">
                {category._count.doctors} especialistas disponibles
              </p> */}
            </Link>

          ))}

        </div>


        <div className="mt-12 flex justify-center">

          <Link
            href="/directorio"
            className="
              rounded-full
              bg-[#0F4C81]
              px-8
              py-3
              text-white
              font-semibold
              shadow-lg
              transition
              hover:bg-[#0B3558]
            "
          >
            {/* Ver todas las especialidades → */}
            {t("viewAll")} →
          </Link>

        </div>

      </div>

    </section>
  );
}