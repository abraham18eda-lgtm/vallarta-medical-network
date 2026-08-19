// "use client"

// import { useState } from "react"


// interface Props {
//   doctorId:string
// }


// export default function DoctorMediaManager({
//   doctorId
// }:Props){


//   const [type,setType] = useState<
//     "GALLERY" | "CERTIFICATE"
//   >("GALLERY")


//   const [loading,setLoading] = useState(false)


//   async function handleUpload(
//     e:React.ChangeEvent<HTMLInputElement>
//   ){

//     const file = e.target.files?.[0]

//     if(!file) return


//     setLoading(true)


//     // 1. subir a cloudinary
//     const formData = new FormData()

//     formData.append(
//       "file",
//       file
//     )


//     const upload = await fetch(
//       "/api/upload",
//       {
//         method:"POST",
//         body:formData
//       }
//     )


//     const cloudinary =
//       await upload.json()



//     // 2. guardar en BD

//     await fetch(
//       "/api/doctors/media",
//       {
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body:JSON.stringify({

//           doctorId,

//           url:cloudinary.url,

//           type

//         })
//       }
//     )


//     setLoading(false)


//     alert("Imagen guardada")

//   }



//   return (

//     <div className="space-y-6">


//       {/* SELECTOR */}

//       <div className="flex gap-3">


//         <button
//           onClick={()=>setType("GALLERY")}
//           className={`
//           px-4 py-2 rounded-xl
//           ${
//             type==="GALLERY"
//             ?
//             "bg-sky-500 text-white"
//             :
//             "bg-gray-100"
//           }
//           `}
//         >
//           Galería
//         </button>



//         <button
//           onClick={()=>setType("CERTIFICATE")}
//           className={`
//           px-4 py-2 rounded-xl
//           ${
//             type==="CERTIFICATE"
//             ?
//             "bg-sky-500 text-white"
//             :
//             "bg-gray-100"
//           }
//           `}
//         >
//           Certificados
//         </button>


//       </div>



//       {/* UPLOAD */}

//       <div>

//         <label
//           className="
//           cursor-pointer
//           rounded-xl
//           border
//           border-dashed
//           p-6
//           block
//           text-center
//           "
//         >

//           {
//             loading
//             ?
//             "Subiendo..."
//             :
//             "Seleccionar imagen"
//           }


//           <input
//             type="file"
//             hidden
//             accept="image/*"
//             onChange={handleUpload}
//           />

//         </label>


//       </div>


//     </div>

//   )

// }

"use client"

import { useEffect, useState } from "react"

interface Props {
  doctorId: string
}

interface Media {
  id: string
  doctorId: string
  url: string
  type: "GALLERY" | "CERTIFICATE"
  title?: string | null
  createdAt?: string
}

export default function DoctorMediaManager({
  doctorId
}: Props) {

  const [type, setType] = useState<
    "GALLERY" | "CERTIFICATE"
  >("GALLERY")

  const [media, setMedia] = useState<Media[]>([])

  const [loading, setLoading] = useState(false)

  const [loadingMedia, setLoadingMedia] = useState(true)


  // ============================
  // CARGAR MEDIA
  // ============================

  const loadMedia = async () => {

    try {

      setLoadingMedia(true)

      const res = await fetch(
        `/api/doctors/media?doctorId=${doctorId}`
      )

      if (!res.ok) {
        throw new Error("Error cargando media")
      }

      const data = await res.json()

      setMedia(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (error) {

      console.error(
        "Error cargando media:",
        error
      )

      setMedia([])

    } finally {

      setLoadingMedia(false)

    }
  }


  // ============================
  // CARGAR AL ABRIR EDITAR
  // ============================

  useEffect(() => {

    if (!doctorId) return

    loadMedia()

  }, [doctorId])


  // ============================
  // SUBIR
  // ============================

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0]

    if (!file) return

    try {

      setLoading(true)


      // ============================
      // CLOUDINARY
      // ============================

      const formData = new FormData()

      formData.append(
        "file",
        file
      )

      const upload = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData
        }
      )

      if (!upload.ok) {
        throw new Error(
          "Error subiendo imagen"
        )
      }

      const cloudinary =
        await upload.json()


      // ============================
      // GUARDAR BD
      // ============================

      const save = await fetch(
        "/api/doctors/media",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            doctorId,

            url: cloudinary.url,

            type

          })
        }
      )


      if (!save.ok) {
        throw new Error(
          "Error guardando media"
        )
      }


      // ============================
      // RECARGAR GALERÍA
      // ============================

      await loadMedia()

      alert(
        type === "GALLERY"
          ? "Imagen agregada a la galería"
          : "Certificado agregado"
      )

    } catch (error) {

      console.error(error)

      alert(
        "No se pudo guardar el archivo"
      )

    } finally {

      setLoading(false)

      // permite volver a seleccionar
      e.target.value = ""

    }

  }


  // ============================
  // FILTRAR
  // ============================

  const visibleMedia =
    media.filter(
      item => item.type === type
    )


  // Eliminar

  const handleDelete = async (id: string) => {

    const confirmed = confirm(
      "¿Eliminar este archivo?"
    )

    if (!confirmed) return

    try {

      const res = await fetch(
        `/api/doctors/media?id=${id}`,
        {
          method: "DELETE"
        }
      )

      if (!res.ok) {
        throw new Error(
          "Error eliminando archivo"
        )
      }

      // Actualizar pantalla inmediatamente
      setMedia(prev =>
        prev.filter(item => item.id !== id)
      )

    } catch (error) {

      console.error(error)

      alert(
        "No se pudo eliminar el archivo"
      )
    }
  }



  return (

    <div className="space-y-6">


      {/* SELECTOR */}

      <div className="flex gap-3">

        <button
          type="button"
          onClick={() =>
            setType("GALLERY")
          }
          className={`
            px-4 py-2 rounded-xl
            ${
              type === "GALLERY"
                ? "bg-sky-500 text-white"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          Galería
        </button>


        <button
          type="button"
          onClick={() =>
            setType("CERTIFICATE")
          }
          className={`
            px-4 py-2 rounded-xl
            ${
              type === "CERTIFICATE"
                ? "bg-sky-500 text-white"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          Certificados
        </button>

      </div>


      {/* UPLOAD */}

      <div>

        <label
          className="
            cursor-pointer
            rounded-xl
            border
            border-dashed
            p-6
            block
            text-center
            hover:bg-gray-50
            transition
          "
        >

          {loading
            ? "Subiendo..."
            : type === "GALLERY"
              ? "Seleccionar imagen para galería"
              : "Seleccionar certificado"
          }


          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUpload}
          />

        </label>

      </div>


      {/* MEDIA EXISTENTE */}

      <div>

        <h4 className="text-sm font-semibold text-gray-700 mb-3">

          {type === "GALLERY"
            ? "Fotos de la galería"
            : "Certificados"
          }

        </h4>


        {loadingMedia ? (

          <p className="text-sm text-gray-400">
            Cargando archivos...
          </p>

        ) : visibleMedia.length === 0 ? (

          <div className="
            border
            border-dashed
            border-gray-200
            rounded-2xl
            p-8
            text-center
          ">

            <p className="text-sm text-gray-400">
              {type === "GALLERY"
                ? "Este doctor todavía no tiene fotografías."
                : "Este doctor todavía no tiene certificados."
              }
            </p>

          </div>

        ) : (

          <div className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-4
          ">

            {visibleMedia.map((item) => (

              <div
                key={item.id}
                className="
                  group
                  relative
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-200
                  bg-gray-100
                "
              >
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="
                  absolute
                  top-2
                  right-2
                  z-10
                  w-8
                  h-8
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  border
                  border-white/30
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  hover:bg-red-500/80
                  hover:border-red-300/50
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-200
                "
                title="Eliminar"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>


                <img
                  src={item.url}
                  alt={
                    item.title ||
                    (
                      type === "GALLERY"
                        ? "Foto del doctor"
                        : "Certificado"
                    )
                  }
                  className="
                    w-full
                    h-40
                    object-cover
                  "
                />

                {item.title && (
                  <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    bg-black/60
                    text-white
                    text-xs
                    px-3
                    py-2
                  ">
                    {item.title}
                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

