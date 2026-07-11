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

    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">


      {/* HERO */}

      <section className="grid md:grid-cols-2 gap-6">


        <img
          src={place.image || "/hospital.jpg"}
          className="
            w-full
            h-[420px]
            object-cover
            rounded-3xl
          "
        />


        <div className="space-y-5 flex flex-col justify-center">

          <h1 className="
            text-4xl
            font-bold
          ">
            {place.name}
          </h1>


          <p className="text-gray-500">
            {place.address} {place.city}
          </p>


          <p className="text-gray-600 leading-relaxed">
            {place.description ||
              "Sin descripción"
            }
          </p>


        </div>


      </section>



      {/* GALERIA */}

      <Lightbox

        images={[
          place.image,
          ...(place.images?.map(
            (i:any)=>i.url
          ) || [])

        ].filter(Boolean)}

      />




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



      {/* CONTACTO */}

      <section className="
        grid
        md:grid-cols-2
        gap-8
      ">


        <div className="
          bg-gray-50
          rounded-3xl
          p-6
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



    </main>

  )
}