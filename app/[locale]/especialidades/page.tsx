import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";
import { Link } from "@/i18n/navigation";

export default async function EspecialidadesPage() {

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


  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#0F4C81]
          to-[#0B3558]
          py-24
        "
      >

        <div className="container mx-auto px-6 text-center">

          <span
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              font-semibold
              text-blue-200
            "
          >
            Especialidades médicas
          </span>


          <h1
            className="
              mt-5
              text-4xl
              md:text-6xl
              font-bold
              text-white
            "
          >
            Encuentra al especialista ideal
          </h1>


          {/* <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-white/80
            "
          >
            Explora nuestras especialidades médicas y encuentra
            profesionales de confianza cerca de ti.
          </p> */}

        </div>


        {/* decoración */}
        <div
          className="
            absolute
            -bottom-24
            -left-24
            h-72
            w-72
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -top-24
            -right-24
            h-72
            w-72
            rounded-full
            bg-white/10
          "
        />

      </section>



      {/* Especialidades */}
      <section className="container mx-auto px-6 py-20">


        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >

          {categories.map((category) => (

            <Link
              key={category.id}
            //   href={{
            //     pathname: "/directorio/[specialty]",
            //     params: {
            //       specialty: category.slug,
            //     },
            //   }}
                href="/"
              className="
                group
                rounded-3xl
                bg-white
                p-7
                shadow-sm
                border
                border-slate-100
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                hover:border-[#0F4C81]/30
              "
            >

              <div
                className="
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                  text-[#0F4C81]
                  text-2xl
                  transition
                  group-hover:bg-[#0F4C81]
                  group-hover:text-white
                "
              >
                ✚
              </div>


              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                  group-hover:text-[#0F4C81]
                "
              >
                {category.name}
              </h2>


              <p
                className="
                  mt-3
                  text-sm
                  text-slate-500
                "
              >
                {category._count.doctors} especialistas disponibles
              </p>


              <div
                className="
                  mt-5
                  text-sm
                  font-semibold
                  text-[#0F4C81]
                "
              >
                Ver especialistas →
              </div>


            </Link>

          ))}

        </div>


      </section>


    </main>
  );
}