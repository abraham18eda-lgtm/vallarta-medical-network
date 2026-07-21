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
          <h2 className="font-heading text-cyan-600 mt-4 text-2xl font-bold tracking-tight md:text-4xl">
            {/* Especialidades Médicas */}
            {t("title")}
          </h2>

          <p className="mt-3 text-lg leading-8 text-slate-600">
            {/* Encuentra especialistas por área médica. */}
            {t("description")}
          </p>
        </div>


        <div className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
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
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                bg-white
                p-4
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover-shadow-sky
                hover:hover-shadow-sky
              "
            >
              <h3 className="font-semibold md:text-base text-slate-500">
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