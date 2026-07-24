import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Lightbox from "@/components/ui/Lightbox"
import ContactForm from "@/components/form/ContactForm"
import PlaceContactForm from "@/components/form/PlaceContactForm"
import PlaceGallery from "@/components/places/PlaceGallery"


import {
  Globe,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink
} from "lucide-react"


function normalizeType(type?: string) {
  if (!type) return "";
  
  return type
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
}

export default async function PlaceDetailPage({
  params
}: {
  params: Promise<{
    locale: string;
    type: string;
    slug: string;
  }>
}) {

  const {
    locale,
    type,
    slug
  } = await params;
  
 
  const mapType:any = {

    // español
    clinicas:"CLINIC",
    hospitales:"HOSPITAL",
    dentales:"DENTAL",
    laboratorios:"LAB",

    // ingles
    clinic:"CLINIC",
    clinics:"CLINIC",

    hospital:"HOSPITAL",
    hospitals:"HOSPITAL",

    dental:"DENTAL",
    dentals:"DENTAL",

    laboratory:"LAB",
    laboratories:"LAB"

  };

  const normalizedType = normalizeType(type)
  const prismaType = mapType[normalizedType]

  if (!prismaType) {
    return <div className="p-10">Tipo inválido { type }</div>
  }

  // Buscar place
    const place = await prisma.place.findFirst({
    where: {
      slug,
      type: prismaType
    },
    include: {
      images: true,

      categories: {
        include: {
          category: true
        }
      },

      doctors: {
        include: {
          doctor: true
        }
      }
    }
  })   


  if (!place) {
    return <div className="p-10">No encontrado</div>
  }

  const galleryImages =
    place.images?.map(
      (img) => img.url
    ) || []

  const especialidades =
    place.categories?.map(
      item => item.category.name
    ) || []


  // return (
  //   <div className="max-w-6xl mx-auto p-6 space-y-8">

  //     {/* 🖼 GALERÍA */}
  //     <div className="grid md:grid-cols-2 gap-4">
  //       <img
  //         src={place.image || "/hospital.jpg"}
  //         className="w-full h-72 object-cover rounded-2xl"
  //       />

  //       <div className="grid grid-cols-2 gap-2">
  //         {place.images?.slice(0, 4).map((img: any) => (
  //           <img
  //             key={img.id}
  //             src={img.url}
  //             className="w-full h-32 object-cover rounded-xl"
  //           />
  //         ))}
  //       </div>
  //     </div>

  //     {/* 🧾 INFO PRINCIPAL */}
  //     <div className="space-y-2">
  //       <h1 className="text-3xl font-bold">{place.name}</h1>

  //       <p className="text-gray-500">
  //         {place.address} {place.city}
  //       </p>

  //       <p className="text-gray-600">
  //         {place.description || "Sin descripción"}
  //       </p>
  //     </div>

  //     {/* 👨‍⚕️ DOCTORES */}
  //     <div>
  //       <h2 className="text-xl font-semibold mb-4">
  //         Doctores disponibles
  //       </h2>

  //       {place.doctors?.length > 0 ? (
  //         <div className="grid md:grid-cols-3 gap-4">

  //           {place.doctors.map((d: any) => (
  //             <Link
  //               key={d.doctor.id}
  //               href={`/es/directorio/${d.doctor.slug}`}
  //               className="border rounded-xl p-4 hover:shadow transition"
  //             >
  //               <img
  //                 src={d.doctor.image || "/doctor.jpg"}
  //                 className="w-full h-32 object-cover rounded-lg"
  //               />

  //               <h3 className="font-semibold mt-2">
  //                 {d.doctor.name}
  //               </h3>

  //               <p className="text-sm text-gray-500">
  //                 {d.doctor.city}
  //               </p>
  //             </Link>
  //           ))}

  //         </div>
  //       ) : (
  //         <p className="text-gray-400">
  //           No hay doctores registrados
  //         </p>
  //       )}
  //     </div>

  //     {/* Galleria */}
  //     <div className="">Gallery</div>
  //      <Lightbox
  //         images={[
  //           place.image,
  //           ...(place.images?.map((i: any) => i.url) || [])
  //         ].filter(Boolean)}
  //       /> 
  //     {/* 📞 CONTACTO */}
  //     {/* <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
  //       <h3 className="font-semibold text-lg">
  //         Contactar
  //       </h3>

  //       {place.phone && (
  //         <p>📞 {place.phone}</p>
  //       )}

  //       {place.address && (
  //         <p>📍 {place.address}</p>
  //       )}

  //       <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
  //         Solicitar información
  //       </button>
  //     </div> */}
  //     <div className="grid md:grid-cols-2 gap-6">

  //       {/* INFO */}
  //       <div className="bg-gray-50 p-6 rounded-2xl space-y-3">

  //         <h3 className="font-semibold text-lg">
  //           Información de contacto
  //         </h3>

  //         {place.phone && <p>📞 {place.phone}</p>}
  //         {place.address && <p>📍 {place.address}</p>}

  //       </div>

  //       {/* FORM */}
  //       <ContactForm />

  //     </div>
  //   </div>
  // )
   return (

    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-8">
      
      <div className="absolute inset-0">

        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-sky-300/20 blur-[120px]"  />
        <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-cyan-300/20 blur-[140px]"/>

      </div>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4">
          <div
            className="
              relative
              h-[400px]
              overflow-hidden
              rounded-[10px]
              shadow-[0_40px_100px_-30px_rgba(15,23,42,0.35)]
            "
          >
          <img
            src={place.image || "/hospital.jpg"}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
            {/* degradado premium */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-slate-950/80
                via-slate-900/20
                to-transparent
              "
            />


            {/* información */}

            <div
              className="
                absolute
                bottom-0
                left-0
                p-8
                md:p-12
                text-white
              "
            >

              <span
                className="
                  rounded-full
                  bg-white/20
                  backdrop-blur-md
                  px-4
                  py-2
                  text-sm
                "
              >
                {place.type}
              </span>


              <h1
                className="
                  mt-5
                  text-5xl
                  font-bold
                "
              >
                {place.name}
              </h1>


              <p className="mt-4 max-w-2xl text-white/80">
                {place.description}
              </p>


            </div>
          </div>
        </section>

        <div className="relative z-10 ">
          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              lg:px-8
              space-y-12
            "
          >       

            {/* CARD */}
            <div
              className="
              grid
              md:grid-cols-3
              gap-6
              py-10
              "
              >


              <div
              className="
              rounded-[28px]
              bg-white
              border
              border-slate-100
              p-7
              shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]
              "
              >

              <p className="text-sm text-slate-500">
              Especialistas
              </p>

              <h3
              className="
              mt-3
              text-4xl
              font-bold
              text-slate-800
              "
              >
              {place.doctors.length}
              </h3>

              <p className="mt-2 text-slate-600">
              Médicos disponibles
              </p>

              </div>


              <div
              className="
              rounded-[28px]
              bg-gradient-to-br
              from-sky-500
              to-cyan-500
              p-7
              text-white
              shadow-xl
              "
              >

              <p className="text-white/70">
              Ubicación
              </p>

              <h3 className="mt-3 text-2xl font-bold">
              {place.city}
              </h3>

              <p className="mt-2 text-white/80">
              {place.state}
              </p>

              </div>



              <div
              className="
              rounded-[28px]
              bg-white
              border
              border-slate-100
              p-7
              shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]
              "
              >

              <p className="text-sm text-slate-500">
              Contacto
              </p>

              <h3 className="mt-3 text-xl font-bold">
              {place.phone || "Disponible"}
              </h3>


              </div>


            </div>

            {/* ESPECIALIDADES */}          

            <section
              className="
                rounded-[32px]
                bg-white
                border
                border-slate-100
                p-8
                shadow-[0_25px_70px_-40px_rgba(15,23,42,.45)]
              "
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 text-gradient-primary">
                  Especialidades
                </h2>

                <p className="mt-2 text-slate-500">
                  Áreas médicas disponibles en este centro.
                </p>
              </div>
              {place.categories.length > 0 ? (
                <div className="flex flex-wrap gap-4">

                  {place.categories.map((item) => (

                    <span
                      key={item.category.id}
                      className="
                        glass-soft
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        px-5
                        py-3
                        font-medium
                        text-slate-700
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:scale-105
                        hover:border-cyan-300
                        hover:shadow-[0_20px_40px_-20px_rgba(6,182,212,.45)]
                      "
                    >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        to-sky-500
                      "
                    />
                      {item.category.name}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-slate-400">
                  No hay especialidades registradas.
                </p>

              )}


            </section>

          {/* REDES SOCIALES */}
          <section
            className="
              glass-soft
              rounded-[32px]
              p-8
            "
          >

            <div className="mb-6">

              <h2
                className="
                  text-3xl
                  font-bold
                  text-gradient-primary
                "
              >
                Síguenos
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Conoce más información y novedades.
              </p>

            </div>


            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >


              {
                place.website && (

                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      glass-soft
                      hover-shadow-sky
                      rounded-xl
                      px-5
                      py-3
                      flex
                      items-center
                      gap-3
                      text-slate-700
                      font-medium
                      transition-all
                      hover:-translate-y-0.5
                      active:scale-95
                    "
                  >

                    <Globe
                      size={20}
                      className="text-sky-500"
                    />

                    <span>
                      Sitio web
                    </span>


                    <ExternalLink
                      size={16}
                      className="text-slate-400"
                    />

                  </a>

                )
              }



              {
                place.facebook && (

                  <a
                    href={place.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      glass-soft
                      hover-shadow-sky
                      rounded-xl
                      px-5
                      py-3
                      flex
                      items-center
                      gap-3
                      text-slate-700
                      font-medium
                      transition-all
                      hover:-translate-y-0.5
                      active:scale-95
                    "
                  >

                    <Facebook
                      size={20}
                      className="text-blue-500"
                    />

                    <span>
                      Facebook
                    </span>


                  </a>

                )
              }



              {
                place.instagram && (

                  <a
                    href={place.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      glass-soft
                      hover-shadow-sky
                      rounded-xl
                      px-5
                      py-3
                      flex
                      items-center
                      gap-3
                      text-slate-700
                      font-medium
                      transition-all
                      hover:-translate-y-0.5
                      active:scale-95
                    "
                  >

                    <Instagram
                      size={20}
                      className="text-pink-500"
                    />

                    <span>
                      Instagram
                    </span>


                  </a>

                )
              }



              {
                place.youtube && (

                  <a
                    href={place.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      glass-soft
                      hover-shadow-sky
                      rounded-xl
                      px-5
                      py-3
                      flex
                      items-center
                      gap-3
                      text-slate-700
                      font-medium
                      transition-all
                      hover:-translate-y-0.5
                      active:scale-95
                    "
                  >

                    <Youtube
                      size={20}
                      className="text-red-500"
                    />

                    <span>
                      YouTube
                    </span>


                  </a>

                )
              }


            </div>

          </section>



            {/* GALERIA */}
           <section>
              <PlaceGallery
                images={
                  place.images.map(
                    img => img.url
                  )
                }
              />
            </section>
                      

            {/* DOCTORES */}

    

            {/* CONTACTO */}

            <section className="
              grid
              md:grid-cols-5
              gap-8
            ">


              <div
                className="
                md:col-span-2
                glass-soft
                rounded-[32px]
                p-8
                "
                >


                <h3
                className="
                text-2xl
                font-bold
                text-slate-700
                "
                >
                Información
                </h3>


                <div
                className="
                mt-8
                space-y-5
                "
                >


                {
                place.phone &&
                <div className="
                flex
                gap-4
                items-center
                "
                >

                <div
                className="
                h-11
                w-11
                rounded-xl
                bg-sky-100
                flex
                items-center
                justify-center
                text-sky-600
                "
                >
                📞
                </div>

                <p className="text-slate-600">
                {place.phone}
                </p>

                </div>
                }



                <div
                className="
                flex
                gap-4
                items-center
                "
                >

                <div
                className="
                h-11
                w-11
                rounded-xl
                bg-sky-100
                flex
                items-center
                justify-center
                text-sky-600
                "
                >
                📍
                </div>


                <p className="text-slate-600">
                {place.address}
                <br/>
                {place.city}, {place.state}
                </p>

                </div>



                </div>


              </div>



              <div
                className="
                md:col-span-3
                glass-soft
                rounded-[32px]
                p-8
                "
                >

                <h3
                className="
                text-2xl
                font-bold
                text-slate-700                
                md:text-center
                
                "
                >
                Solicita información
                </h3>

                {/* <ContactForm /> */}
                <PlaceContactForm
                  placeId={place.id}
                />

                </div>
            </section>
          </div>
        </div>      
    </main>

  )
}