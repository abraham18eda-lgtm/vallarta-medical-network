import React from "react";

const revistas = [
  {
    id: 1,
    titulo: "Innovación y transformación digital 2026",
    descripcion:
      "Conoce las nuevas tendencias, proyectos y avances que están marcando nuestro futuro.",
    imagen:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    categoria: "Destacado",
    fecha: "06 Agosto 2026",
  },
  {
    id: 2,
    titulo: "Nuevos proyectos institucionales",
    descripcion:
      "Presentamos nuestras iniciativas más importantes del año.",
    imagen:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    categoria: "Noticias",
    fecha: "01 Agosto 2026",
  },
  {
    id: 3,
    titulo: "Historias que inspiran",
    descripcion:
      "Una mirada a las personas y proyectos que generan impacto.",
    imagen:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    categoria: "Revista",
    fecha: "28 Julio 2026",
  },
];


export default function RevistaDigital() {
  return (
    <section className="bg-white py-16 px-6 lg:px-20">

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


      {/* Grid Revista */}

      <div className="
        max-w-7xl mx-auto
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-8
      ">

        {revistas.map((item) => (

          <article
            key={item.id}
            className="
              group
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              hover:-translate-y-2
              transition-all duration-300
            "
          >

            {/* Imagen */}

            <div className="relative h-64 overflow-hidden">

              <img
                src={item.imagen}
                alt={item.titulo}
                className="
                  w-full h-full object-cover
                  group-hover:scale-110
                  transition duration-500
                "
              />

              <span className="
                absolute top-5 left-5
                bg-white/90
                backdrop-blur
                px-4 py-1
                rounded-full
                text-xs font-semibold
                text-gray-800
              ">
                {item.categoria}
              </span>

            </div>


            {/* Contenido */}

            <div className="p-7">

              <p className="text-sm text-gray-400 mb-3">
                {item.fecha}
              </p>


              <h3 className="
                text-xl
                font-bold
                text-gray-900
                leading-snug
                group-hover:text-indigo-600
                transition
              ">
                {item.titulo}
              </h3>


              <p className="
                text-gray-500
                mt-4
                line-clamp-3
              ">
                {item.descripcion}
              </p>


              <button
                className="
                  mt-6
                  text-indigo-600
                  font-semibold
                  flex items-center gap-2
                "
              >
                Leer artículo →
              </button>


            </div>

          </article>

        ))}

      </div>

    </section>
  );
}