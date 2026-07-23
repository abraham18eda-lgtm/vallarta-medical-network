import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Lightbox from "@/components/ui/Lightbox"
import ContactForm from "@/components/form/ContactForm"


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

  // 🔍 Buscar place
  const place = await prisma.place.findFirst({
    where: {
      slug,
      type: prismaType
    },
    include: {
      images: true,
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


            {/* GALERIA */}

            {/* <Lightbox

              images={[
                place.image,
                ...(place.images?.map(
                  (i:any)=>i.url
                ) || [])

              ].filter(Boolean)}

            /> */}

            {/* DOCTORES */}

            <section>

              <h2 className="
                text-2xl
                font-bold
                mb-6
              ">
                Doctores disponibles
              </h2>



              {
                place.doctors.length > 0 ?

                <div className="
                  grid
                  md:grid-cols-3
                  gap-6
                ">

                {
                  place.doctors.map((item:any)=>(

                    <Link

                      key={item.doctor.id}

                      href={
                        `/${locale}/doctors/${item.doctor.slug}`
                      }

                      className="
                        rounded-2xl
                        border
                        p-4
                        hover:shadow-lg
                        transition
                      "

                    >


                      <img

                        src={
                          item.doctor.image ||
                          "/doctor.jpg"
                        }

                        className="
                          w-full
                          h-40
                          rounded-xl
                          object-cover
                        "

                      />


                      <h3 className="
                        mt-3
                        font-bold
                      ">
                        {item.doctor.name}
                      </h3>


                    </Link>

                  ))
                }

                </div>


                :

                <p className="text-gray-400">
                  No hay doctores registrados
                </p>

              }


            </section>

             <section>
              <div className="mb-6">
                <h2
                  className="
                    text-3xl
                    font-bold
                    text-slate-800
                  "
                >
                  Instalaciones
                </h2>

                <p className="mt-2 text-slate-500">
                  Conoce nuestras instalaciones y espacios médicos
                </p>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-4
                  h-auto
                  md:h-[420px]
                "
              >

                {/* Imagen principal */}

                <div
                  className="
                    md:col-span-2
                    md:row-span-2
                    overflow-hidden
                    rounded-[32px]
                    shadow-xl
                  "
                >

                  <img
                    src={place.image || "/hospital.jpg"}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-700
                      hover:scale-105
                    "
                  />

                </div>


                {
                  place.images
                  ?.slice(0,4)
                  .map((img:any)=>(
                    
                    <div
                      key={img.id}
                      className="
                        overflow-hidden
                        rounded-[28px]
                        shadow-lg
                      "
                    >

                      <img
                        src={img.url}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-700
                          hover:scale-105
                        "
                      />

                    </div>

                  ))
                }


              </div>
            </section>
 

            {/* CONTACTO */}

            <section className="
              grid
              md:grid-cols-2
              gap-8
            ">


              <div className="
                rounded-[32px]
                bg-white
                border
                border-slate-100
                p-8
                shadow-[0_25px_70px_-40px_rgba(15,23,42,0.45)]
              ">

                <h3 className="font-bold text-xl mb-4">
                  Información de contacto
                </h3>


                {
                  place.phone &&
                  <p>
                    📞 {place.phone}
                  </p>
                }


                <p>
                  📍 {place.address}
                </p>


              </div>


              <ContactForm />


            </section>
          </div>
        </div>      
    </main>

  )
}