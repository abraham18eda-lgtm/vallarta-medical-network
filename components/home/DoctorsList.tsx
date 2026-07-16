"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";
// import type { DoctorWithRelations } from "@/types/doctor";
import { Star } from "lucide-react";

type Props = {
  locale: "es" | "en";
  initialDoctors?: any[];
  initialCategory?: string;
  title?: string;
  search?: string;
};

export default function DoctorsList({ locale, initialDoctors,initialCategory, title, search: initialSearch }: Props) {
 
  const [categories, setCategories] = useState<any[]>([]);
  // const [doctors, setDoctors] = useState(initialDoctors || []);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [recommended, setRecommended] = useState<any[]>([]);
  const [doctors, setDoctors] = useState(initialDoctors || []);

  const pathname = usePathname();

  const isEspecialidadPage = pathname.includes("/directorio/especialidad/");

  // Cargar categorías
  const loadCategories = async () => {
    const res = await fetch("/api/categories/tree?type=DOCTOR")
    const data = await res.json()
    setCategories(data || [])
    // console.log("CATEGORIES", data)
  }

  // Cargar doctores
  const loadDoctors = async () => {
    setLoading(true)

    const res = await fetch(
    `/api/doctors?locale=${locale}&page=${page}&category=${initialCategory || ""}&search=${initialSearch || ""}`
    )


    const data = await res.json()

    setRecommended(data.recommended || [])
    setDoctors(data.doctors || [])
    setPages(data.pages || 1)

    setLoading(false)
  }

  // REACTIVO
  useEffect(() => {
    loadDoctors()
  }, [initialCategory, initialSearch, page])

  useEffect(() => {
    loadCategories()
  }, [])
  
  const recommendedIds = recommended.map(
    (doc:any)=>doc.id
  )

  const normalDoctors = doctors.filter(
    (doc:any)=>!recommendedIds.includes(doc.id)
  )
//   return (
//   <div className="w-full max-w-7xl mx-auto px-6 ">

//     {/* Header */}
//     {/* <div className="mb-12 text-center">

//       <h1 className="
//         text-3xl
//         md:text-4xl
//         font-extrabold
//         tracking-tight
//         text-slate-900
//       ">
//         {title || "Directorio Médico"}
//       </h1>

//       <p className="
//         mt-4
//         max-w-2xl
//         mx-auto
//         text-slate-500
//         text-base
//         md:text-lg
//       ">
//         Encuentra médicos por nombre o especialidad.
//       </p>

//     </div> */}

//     {isEspecialidadPage && (
//       <div className="mb-12 text-center pt-14">

//         <h1
//           className="
//             text-3xl
//             md:text-4xl
//             font-extrabold
//             tracking-tight
//             text-slate-900
//           "
//         >
//           {title || "Directorio Médico"}
//         </h1>

//         <p
//           className="
//             mt-4
//             max-w-2xl
//             mx-auto
//             text-slate-500
//             text-base
//             md-lg:text-lg
//           "
//         >
//           Encuentra médicos por nombre o especialidad.
//         </p>

//       </div>
//     )}


//     {/* Resultados */}
//     {loading ? (

//       <div className="
//         flex
//         justify-center
//         items-center
//         rounded-3xl
//         border
//         bg-white
//         py-24
//         shadow-sm
//       ">
//         <p className="text-slate-500">
//           Cargando médicos...
//         </p>
//       </div>


//     ) : doctors.length > 0 ? (

//       <>

//         {/* GRID DOCTORES */}
//         <div
//           className="
//             grid
//             gap-8
//             sm:grid-cols-2
//             lg:grid-cols-3
//           "
//         >

//           {doctors.map((doc:any)=>(

//             <Link
//               key={doc.id}
//               href={`/${locale}/directorio/${doc.slug}`}
//               className="group"
//             >

//               <article
//                 className="
//                   h-full
//                   overflow-hidden
//                   rounded-3xl
//                   bg-white
//                   border
//                   border-slate-200
//                   shadow-sm
//                   transition-all
//                   duration-300
//                   hover:-translate-y-2
//                   hover:shadow-xl
//                 "
//               >


//                 {/* Imagen */}
//                 <div
//                   className="
//                     relative
//                     overflow-hidden
//                     h-64
//                     bg-slate-100
//                   "
//                 >

//                   <img
//                     src={doc.image || "/doctor.jpg"}
//                     alt={doc.translations?.[0]?.name}
//                     className="
//                       h-full
//                       w-full
//                       object-cover
//                       transition-transform
//                       duration-500
//                       group-hover:scale-110
//                     "
//                   />

//                 </div>



//                 {/* Contenido */}
//                 <div className="p-6">


//                   <h2
//                     className="
//                       text-xl
//                       font-bold
//                       text-slate-900
//                       group-hover:text-[#0F4C81]
//                       transition
//                     "
//                   >
//                     {doc.translations?.[0]?.name}
//                   </h2>



//                   {doc.categories?.length > 0 && (

//                     <div className="
//                       mt-4
//                       flex
//                       flex-wrap
//                       gap-2
//                     ">

//                       {doc.categories.map((cat:any)=>(

//                         <span
//                           key={cat.category.id}
//                           className="
//                             rounded-full
//                             bg-blue-50
//                             px-3
//                             py-1
//                             text-xs
//                             font-semibold
//                             text-[#0F4C81]
//                           "
//                         >
//                           {cat.category.name}
//                         </span>

//                       ))}

//                     </div>

//                   )}



//                   <div
//                     className="
//                       mt-6
//                       flex
//                       items-center
//                       justify-between
//                       text-sm
//                       font-semibold
//                       text-[#0F4C81]
//                     "
//                   >

//                     Ver perfil

//                     <span className="
//                       transition-transform
//                       group-hover:translate-x-1
//                     ">
//                       →
//                     </span>

//                   </div>


//                 </div>


//               </article>


//             </Link>

//           ))}


//         </div>



//         {/* PAGINACIÓN */}
//         <div
//           className="
//             mt-14
//             flex
//             justify-center
//             items-center
//             gap-5
//           "
//         >

//           <button
//             disabled={page === 1}
//             onClick={()=>setPage(page-1)}
//             className="
//               rounded-xl
//               border
//               px-5
//               py-3
//               text-sm
//               font-medium
//               hover:bg-slate-50
//               disabled:opacity-40
//             "
//           >
//             ← Anterior
//           </button>


//           <span className="text-sm text-slate-600">
//             Página {page} de {pages}
//           </span>


//           <button
//             disabled={page === pages}
//             onClick={()=>setPage(page+1)}
//             className="
//               rounded-xl
//               border
//               px-5
//               py-3
//               text-sm
//               font-medium
//               hover:bg-slate-50
//               disabled:opacity-40
//             "
//           >
//             Siguiente →
//           </button>


//         </div>

//       </>


//     ) : (

//       <div
//         className="
//           rounded-3xl
//           border
//           border-dashed
//           bg-white
//           py-24
//           text-center
//         "
//       >

//         <h3 className="
//           text-xl
//           font-bold
//           text-slate-700
//         ">
//           No encontramos médicos
//         </h3>


//         <p className="
//           mt-3
//           text-slate-500
//         ">
//           Intenta cambiar el nombre o seleccionar otra especialidad.
//         </p>


//       </div>

//     )}

//   </div>
// )

const DoctorCard = ({doc}: {doc:any}) => (
  <Link
    href={`/${locale}/directorio/${doc.slug}`}
    className="group"
  >

    <article
      className="
        h-full
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-slate-200
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >

      <div
        className="
          relative
          overflow-hidden
          h-64
          bg-slate-100
        "
      >

        <img
          src={doc.image || "/doctor.jpg"}
          alt={doc.translations?.[0]?.name}
          className="
            h-full
            w-full
            object-cover
          "
        />

      </div>


      <div className="p-6">

        <h2 className="text-xl font-bold text-slate-900">
          {doc.translations?.[0]?.name}
        </h2>


        {doc.categories?.length > 0 && (

          <div className="mt-4 flex flex-wrap gap-2">

            {doc.categories.map((cat:any)=>(

              <span
                key={cat.category.id}
                className="
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-[#0F4C81]
                "
              >
                {cat.category.name}
              </span>

            ))}

          </div>

        )}


        <div className="mt-6 text-sm font-semibold text-[#0F4C81]">
          Ver perfil →
        </div>


      </div>

    </article>

  </Link>
)
return (
  <div className="w-full max-w-7xl mx-auto px-6 ">

    {/* Header */}
    {isEspecialidadPage && (
      <div className="mb-12 text-center pt-14">

        <h1
          className="
            text-3xl
            md:text-4xl
            font-extrabold
            tracking-tight
            text-slate-900
          "
        >
          {title || "Directorio Médico"}
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            mx-auto
            text-slate-500
            text-base
            md:text-lg
          "
        >
          Encuentra médicos por nombre o especialidad.
        </p>

      </div>
    )}




    {/* Resultados */}
    {loading ? (

      <div className="
        flex
        justify-center
        items-center
        rounded-3xl
        border
        bg-white
        py-24
        shadow-sm
      ">
        <p className="text-slate-500">
          Cargando médicos...
        </p>
      </div>


    ) : (recommended.length > 0 || normalDoctors.length > 0) ? (

      <>

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >


          {/* TOP RECOMENDADOS */}

          {recommended.length > 0 && (

            <>
              <div className="col-span-full mb-2">
                <div className="flex flex-col items-center text-center">

                  {/* Icono premium */}
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                   
                      ring-1
                      ring-[#0F4C81]/20
                    
                    "
                  >
                    <Star
                      size={20}
                      className="
                        text-[#0F4C81]
                        fill-[#0F4C81]/30
                        stroke-[2]
                      "
                    />
                  </div>


                  <div>
                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-slate-900
                      "
                    >
                      Top recomendados
                    </h2>

                  </div>

                </div>

              </div>
              {/* <div className="col-span-full">
                <Star
                  size={24}
                  className="
                    text-[#0F4C81]
                    fill-[#0F4C81]/20
                    stroke-[2]
                  "
                />
                <h2 className="
                  text-4xl
                  font-bold
                  text-slate-900
                  flex justify-start
                  text-primary
                ">
                  Top recomendados
                </h2>

              </div> */}


              {recommended.map((doc:any)=>(

                <DoctorCard
                  key={doc.id}
                  doc={doc}
                />

              ))}


              {normalDoctors.length > 0 && (

                <div className="col-span-full mt-8">

                  <h2 className="
                    text-2xl
                    font-bold
                    text-slate-900
                    mb-6
                  ">
                    Todos los especialistas
                  </h2>

                </div>

              )}

            </>

          )}



          {/* RESTO */}

          {normalDoctors.map((doc:any)=>(

            <DoctorCard
              key={doc.id}
              doc={doc}
            />

          ))}


        </div>



        {/* PAGINACIÓN */}

        <div
          className="
            mt-14
            flex
            justify-center
            items-center
            gap-5
          "
        >

          <button
            disabled={page === 1}
            onClick={()=>setPage(page-1)}
            className="
              rounded-xl
              border
              px-5
              py-3
              text-sm
              font-medium
              hover:bg-slate-50
              disabled:opacity-40
            "
          >
            ← Anterior
          </button>


          <span className="text-sm text-slate-600">
            Página {page} de {pages}
          </span>


          <button
            disabled={page === pages}
            onClick={()=>setPage(page+1)}
            className="
              rounded-xl
              border
              px-5
              py-3
              text-sm
              font-medium
              hover:bg-slate-50
              disabled:opacity-40
            "
          >
            Siguiente →
          </button>


        </div>


      </>


    ) : (

      <div
        className="
          rounded-3xl
          border
          border-dashed
          bg-white
          py-24
          text-center
        "
      >

        <h3 className="
          text-xl
          font-bold
          text-slate-700
        ">
          No encontramos médicos
        </h3>


        <p className="
          mt-3
          text-slate-500
        ">
          Intenta cambiar el nombre o seleccionar otra especialidad.
        </p>


      </div>

    )}


  </div>
)
 
}