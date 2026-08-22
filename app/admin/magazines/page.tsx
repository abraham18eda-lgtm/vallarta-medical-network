// "use client"

// import { useEffect, useState } from "react"
// import ImageUploadPreview from "@/components/admin/ImageUploadPreview"



// export default function AdminMagazines() {


//   const [list, setList] = useState<any[]>([])

//   const [editing, setEditing] = useState<any>(null)

//   const [loading, setLoading] = useState(false)



//   async function load() {

//     const res = await fetch(
//       "/api/admin/magazines"
//     )

//     const data = await res.json()

//     setList(data)

//   }




//   useEffect(() => {

//     load()

//   }, [])





//   async function save(
//     e: React.FormEvent<HTMLFormElement>
//   ) {

//     e.preventDefault()


//     const form =
//       new FormData(e.currentTarget)



//     const data = {


//       locale:
//         form.get("locale"),


//       title:
//         form.get("title"),


//       coverImage:
//         form.get("coverImage"),


//       description:
//         form.get("description"),


//       url:
//         form.get("url"),


//       edition:
//         form.get("edition"),


//       isFeatured:
//         form.get("isFeatured") === "on",


//       isActive:
//         true


//     }




//     const method =
//       editing
//       ? "PUT"
//       : "POST"




//     const url =
//       editing

//       ? `/api/admin/magazines/${editing.id}`

//       : "/api/admin/magazines"





//     await fetch(

//       url,

//       {

//         method,

//         headers:{

//           "Content-Type":
//           "application/json"

//         },

//         body:
//           JSON.stringify(data)

//       }

//     )



//     e.currentTarget.reset()


//     setEditing(null)


//     load()


//   }






//   function edit(item:any){


//     setEditing(item)


//   }







//   async function remove(id:string){


//     if(
//       !confirm("¿Eliminar revista?")
//     ) return



//     await fetch(

//       `/api/admin/magazines/${id}`,

//       {

//         method:"DELETE"

//       }

//     )
//     load()

//   }

//   return (

//     <div className="
//       min-h-screen
//       bg-slate-50
//       p-8
//     ">


//       <div className="
//         max-w-7xl
//         mx-auto
//         grid
//         lg:grid-cols-3
//         gap-8
//       ">




//         {/* FORMULARIO */}


//         <div className="
//           bg-white
//           rounded-3xl
//           shadow-xl
//           p-8
//         ">


//           <h1 className="
//             text-2xl
//             font-bold
//             mb-6
//           ">


//             {
//               editing
//               ?
//               "Editar revista"
//               :
//               "Nueva revista"
//             }


//           </h1>




//           <form

//             onSubmit={save}

//             className="
//               space-y-5
//             "

//           >




//             <select

//               name="locale"

//               defaultValue={
//                 editing?.locale ?? "es"
//               }

//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 px-4
//                 py-3
//               "

//             >

//               <option value="es">
//                 Español
//               </option>


//               <option value="en">
//                 English
//               </option>


//             </select>





//             <input

//               name="title"

//               defaultValue={
//                 editing?.title ?? ""
//               }

//               placeholder="Título"

//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 px-4
//                 py-3
//               "

//               required

//             />





//             <ImageUploadPreview

//               defaultImage={
//                 editing?.coverImage ?? ""
//               }

//               name="coverImage"

//             />






//             <input

//               name="url"

//               defaultValue={
//                 editing?.url ?? ""
//               }

//               placeholder="URL de revista"

//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 px-4
//                 py-3
//               "

//               required

//             />





//             <input

//               name="edition"

//               defaultValue={
//                 editing?.edition ?? ""
//               }

//               placeholder="Edición"

//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 px-4
//                 py-3
//               "

//             />





//             <textarea

//               name="description"

//               defaultValue={
//                 editing?.description ?? ""
//               }

//               placeholder="Descripción"

//               rows={5}

//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 px-4
//                 py-3
//               "

//             />





//             <label className="
//               flex
//               gap-3
//               items-center
//             ">


//               <input

//                 type="checkbox"

//                 name="isFeatured"

//                 defaultChecked={
//                   editing?.isFeatured
//                 }

//               />


//               Revista destacada


//             </label>





//             <button

//               className="
//                 w-full
//                 rounded-full
//                 bg-slate-900
//                 text-white
//                 py-3
//                 font-semibold
//                 hover:bg-slate-700
//               "

//             >

//               Guardar


//             </button>



//           </form>



//         </div>







//         {/* LISTADO */}


//         <div className="
//           lg:col-span-2
//         ">



//           <h2 className="
//             text-3xl
//             font-bold
//             mb-6
//           ">

//             Revistas


//           </h2>





//           <div className="
//             grid
//             md:grid-cols-2
//             gap-6
//           ">




//           {
//             list.map(item=>(


//               <div

//                 key={item.id}

//                 className="
//                   bg-white
//                   rounded-3xl
//                   overflow-hidden
//                   shadow-lg
//                 "

//               >


//                 <img

//                   src={item.coverImage}

//                   className="
//                     w-full
//                     h-64
//                     object-cover
//                   "

//                 />



//                 <div className="p-5">


//                   <h3 className="
//                     font-bold
//                     text-xl
//                   ">

//                     {item.title}

//                   </h3>



//                   <p className="
//                     text-sm
//                     text-gray-500
//                   ">

//                     {item.locale === "es"
//                       ? "Español"
//                       : "English"
//                     }

//                   </p>




//                   <div className="
//                     flex
//                     gap-3
//                     mt-5
//                   ">



//                     <button

//                       onClick={()=>
//                         edit(item)
//                       }

//                       className="
//                         flex-1
//                         rounded-full
//                         border
//                         py-2
//                         text-blue-600
//                       "

//                     >

//                       Editar

//                     </button>




//                     <button

//                       onClick={()=>
//                         remove(item.id)
//                       }

//                       className="
//                         flex-1
//                         rounded-full
//                         bg-red-50
//                         py-2
//                         text-red-600
//                       "

//                     >

//                       Eliminar

//                     </button>



//                   </div>



//                 </div>


//               </div>


//             ))
//           }



//           </div>



//         </div>



//       </div>


//     </div>

//   )

// }

export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteMagazine } from "./actions"
import DeleteMagazineButton from "@/components/admin/DeleteMagazineButton"


interface Props {
  searchParams: Promise<{
    page?: string
    search?: string
    locale?: string
    featured?: string
    active?: string
  }>
}

export default async function AdminMagazinesPage({
  searchParams
}: Props) {

  const params = await searchParams

 // PAGINACIÓN
 
  const currentPage =
    Number(params.page) || 1

  const limit = 10

  const skip =
    (currentPage - 1) * limit

 // FILTROS
 
  const search =
    params.search || ""

  const locale =
    params.locale || ""

  const featured =
    params.featured || ""

  const active =
    params.active || ""

 // QUERY
 
  const where = {
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as const
          }
        },
        {
          edition: {
            contains: search,
            mode: "insensitive" as const
          }
        }
      ]
    }),

    ...(locale && {
      locale
    }),

    ...(featured && {
      isFeatured: featured === "true"
    }),

    ...(active && {
      isActive: active === "true"
    })
  }

 // REVISTAS
 
  const magazines =
    await prisma.magazine.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      },
      skip,
      take: limit
    })

 // TOTAL
 
  const totalMagazines =
    await prisma.magazine.count({
      where
    })

  const totalPages =
    Math.ceil(totalMagazines / limit)

  return (
    <div className="max-w-5xl mx-auto">  
      <div className="min-h-screen bg-gray-50 p-6">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div className="md:px-4">

            <h1 className="font-heading text-sky-800 text-3xl font-bold">
              Revistas
            </h1>

            <p className="text-gray-600 mt-1">
              Administración de revistas y ediciones
            </p>

          </div>

          <Link
            href="/admin/magazines/new"
            className="
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3
              rounded-2xl
              shadow-sm
              transition
              text-sm font-medium
            "
          >
            + Nueva Revista
          </Link>

        </div>

        {/* FILTROS */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-6">

          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* SEARCH */}

            <div className="relative lg:col-span-2">

              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Buscar revistas..."
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-5 py-3
                  pl-12
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  transition
                "
              />

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

            </div>

            {/* IDIOMA */}

            <select
              name="locale"
              defaultValue={locale}
              className="
                border border-gray-200
                rounded-2xl
                px-4 py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                bg-white
              "
            >

              <option value="">
                Todos los idiomas
              </option>

              <option value="es">
                Español
              </option>

              <option value="en">
                Inglés
              </option>

            </select>

            {/* DESTACADA */}

            <select
              name="featured"
              defaultValue={featured}
              className="
                border border-gray-200
                rounded-2xl
                px-4 py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                bg-white
              "
            >

              <option value="">
                Todas
              </option>

              <option value="true">
                Destacadas
              </option>

              <option value="false">
                Normales
              </option>

            </select>

            {/* ESTADO */}

            <select
              name="active"
              defaultValue={active}
              className="
                border border-gray-200
                rounded-2xl
                px-4 py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                bg-white
              "
            >

              <option value="">
                Todos los estados
              </option>

              <option value="true">
                Activas
              </option>

              <option value="false">
                Inactivas
              </option>

            </select>

            <button
              type="submit"
              className="
                md:col-span-2
                lg:col-span-1
                bg-gray-900
                hover:bg-black
                text-white
                px-6 py-3
                rounded-2xl
                transition
                font-medium
              "
            >
              Filtrar
            </button>

          </form>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* TOP */}

          <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-gray-800">
                Listado de Revistas
              </h2>

              <p className="text-sm text-gray-500">
                {totalMagazines} revistas encontradas
              </p>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-white border-b">

                <tr className="text-left text-gray-500">

                  <th className="px-6 py-4">
                    Revista
                  </th>

                  <th className="px-6 py-4 text-center">
                    Edición
                  </th>

                  <th className="px-6 py-4 text-center">
                    Idioma
                  </th>

                  <th className="px-6 py-4 text-center">
                    Estado
                  </th>

                  <th className="px-6 py-4 text-center">
                    Home
                  </th>

                  <th className="px-6 py-4 text-center">
                    Fecha
                  </th>

                  <th className="px-6 py-4 text-right">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {magazines.map((magazine) => (

                  <tr
                    key={magazine.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* REVISTA */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <div className="
                          w-24 h-20
                          rounded-xl
                          overflow-hidden
                          bg-gray-100
                          border
                          flex-shrink-0
                        ">

                          {magazine.coverImage ? (

                            <img
                              src={magazine.coverImage}
                              alt={magazine.title}
                              className="w-full h-full object-cover"
                            />

                          ) : (

                            <div className="
                              w-full h-full
                              flex items-center justify-center
                              text-gray-400
                              text-xs
                            ">
                              Sin portada
                            </div>

                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="
                            font-semibold
                            text-gray-800
                            line-clamp-1
                          ">
                            {magazine.title}
                          </p>

                          {magazine.description && (

                            <p className="
                              text-xs
                              text-gray-500
                              line-clamp-2
                              mt-1
                              max-w-md
                            ">
                              {magazine.description}
                            </p>

                          )}

                        </div>

                      </div>

                    </td>

                    {/* EDICIÓN */}

                    <td className="px-6 py-4 text-center">

                      {magazine.edition ? (

                        <span className="
                          bg-purple-50
                          text-purple-700
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                        ">
                          {magazine.edition}
                        </span>

                      ) : (

                        <span className="text-gray-400">
                          —
                        </span>

                      )}

                    </td>

                    {/* IDIOMA */}

                    <td className="px-6 py-4 text-center">

                      <span className="
                        bg-blue-50
                        text-blue-700
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        {magazine.locale.toUpperCase()}
                      </span>

                    </td>

                    {/* ESTADO */}

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`
                          relative inline-flex
                          items-center justify-center
                          w-6 h-6
                          rounded-full
                          ${
                            magazine.isActive
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-500"
                          }
                        `}
                        title={
                          magazine.isActive
                            ? "Activa"
                            : "Inactiva"
                        }
                      >

                        {magazine.isActive ? (

                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0 1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0-1.414-1.414z" />
                          </svg>

                        ) : (

                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4.293 4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>

                        )}

                      </span>

                    </td>

                    {/* DESTACADA */}

                    <td className="px-6 py-4 text-center">

                      {magazine.isFeatured ? (

                        <span className="
                          bg-yellow-50
                          text-yellow-700
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                        ">
                          Destacada
                        </span>

                      ) : (

                        <span className="
                          bg-gray-50
                          text-gray-500
                          px-3 py-1
                          rounded-full
                          text-xs
                        ">
                          Normal
                        </span>

                      )}

                    </td>

                    {/* FECHA */}

                    <td className="
                      px-6 py-4
                      text-center
                      text-gray-500
                      text-sm
                    ">

                      {new Date(
                        magazine.createdAt
                      ).toLocaleDateString()}

                    </td>

                    {/* ACCIONES */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {/* VER */}

                        {/* <Link
                          href={`/admin/magazines/${magazine.id}`}
                          title="Ver"
                          className="
                            flex items-center justify-center
                            w-8 h-8 rounded-full
                            bg-gray-50
                            text-gray-600
                            hover:bg-gray-100
                            hover:text-gray-700
                            transition-colors
                          "
                        >

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>

                        </Link> */}

                        {/* EDITAR */}

                        <Link
                          href={`/admin/magazines/${magazine.id}/edit`}
                          title="Editar"
                          className="
                            flex items-center justify-center
                            w-8 h-8 rounded-full
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            hover:text-blue-700
                            transition-colors
                          "
                        >

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>

                        </Link>

                        {/* ELIMINAR */}

                        <DeleteMagazineButton
                          onDelete={async () => {
                            "use server"

                            await deleteMagazine(
                              magazine.id
                            )
                          }}
                        />

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* EMPTY */}

          {magazines.length === 0 && (

            <div className="py-20 text-center">

              <p className="text-gray-400">
                No se encontraron revistas
              </p>

            </div>

          )}

        </div>

        {/* PAGINACIÓN */}

        {totalPages > 1 && (

          <div className="
            flex items-center
            justify-center
            gap-2
            mt-8
            flex-wrap
          ">

            {Array.from({
              length: totalPages
            }).map((_, index) => {

              const page =
                index + 1

              const isActive =
                currentPage === page

              const query = new URLSearchParams()

              query.set(
                "page",
                page.toString()
              )

              if (search)
                query.set("search", search)

              if (locale)
                query.set("locale", locale)

              if (featured)
                query.set("featured", featured)

              if (active)
                query.set("active", active)

              return (

                <Link
                  key={page}
                  href={`/admin/magazines?${query.toString()}`}
                  className={`
                    w-11 h-11
                    flex items-center justify-center
                    rounded-2xl
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {page}
                </Link>

              )

            })}

          </div>

        )}

      </div>
    </div>

  )
}
