"use client";

import Image from "next/image";
import Link from "next/link";


interface Props {
  magazines: any[];
  locale: "es" | "en";
}

export default function RevistaList({
  magazines,
  locale,
}: Props) {

  const items = magazines.length
  ? magazines
  : [
      {
        id: "demo",
        title: "Turismo Médico",
        url: "#",
        image: null,
        category: "Revista Digital",
        date: "Agosto 2026",
        description:
          "Contenido informativo sobre especialistas, viajes médicos y servicios para pacientes.",
      },
    ];

  return (

    
    <section className="section-glow  py-16 px-6 lg:px-20">

      {/* Encabezado */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">

        <div>
          <span className="text-sm uppercase tracking-widest text-indigo-600 font-semibold">
            Revista Digital
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Noticias y publicaciones
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl">
            Descubre anuncios, historias y contenidos destacados de nuestra organización.
          </p>
        </div>


        <button className="
          hidden md:block
          border border-gray-900
          px-6 py-3 rounded-full
          hover:bg-gray-900 hover:text-white
          transition
        ">
          Ver todas
        </button>

      </div>

      <div className="
        max-w-7xl mx-auto
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-8
      ">
        {items.map((item) => (

          <article
            key={item.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-xl
            "
          >

            {/* Imagen */}
            <div
              className="
                relative
                h-72
                overflow-hidden
                rounded-t-[32px]
              "
            >

              {item.image ? (

                <Image
                  src={item.image}
                  alt={item.title ?? "Publicidad"}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-1000
                    group-hover:scale-[1.02]
                  "
                />

              ) : (

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    bg-gradient-to-br
                    from-sky-500
                    via-cyan-500
                    to-blue-700
                  "
                >

                  {/* Glow superior */}

                  <div
                    className="
                      absolute
                      -right-20
                      -top-20
                      h-72
                      w-72
                      rounded-full
                      bg-white/20
                      blur-3xl
                    "
                  />


                  {/* Glow inferior */}

                  <div
                    className="
                      absolute
                      -bottom-24
                      -left-20
                      h-80
                      w-80
                      rounded-full
                      bg-cyan-300/20
                      blur-3xl
                    "
                  />


                  <div className="relative text-center text-white">

                    <p className="text-3xl font-bold">
                      Turismo Médico
                    </p>

                    <p className="mt-2 text-sm text-white/80">
                      Tu salud, acompañada por expertos
                    </p>

                  </div>

                </div>

              )}


              {/* Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-slate-950/50
                  via-transparent
                  to-transparent
                "
              />

            </div>


            {/* Contenido */}

            <div className="p-6">

              <h2 className="text-xl font-bold text-slate-900">
                {item.title}
              </h2>


              <Link
                href={item.url}
                className="
                  mt-4
                  block
                  font-medium
                  text-sky-600
                  hover:text-sky-700
                "
              >
                Leer revista →
              </Link>

            </div>


          </article>

        ))}
      </div>

    </section>
  );
}