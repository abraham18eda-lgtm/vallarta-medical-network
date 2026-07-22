"use client"

import { useState } from "react"


interface Props {
  doctorId:string
}


export default function DoctorMediaManager({
  doctorId
}:Props){


  const [type,setType] = useState<
    "GALLERY" | "CERTIFICATE"
  >("GALLERY")


  const [loading,setLoading] = useState(false)


  async function handleUpload(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file = e.target.files?.[0]

    if(!file) return


    setLoading(true)


    // 1. subir a cloudinary
    const formData = new FormData()

    formData.append(
      "file",
      file
    )


    const upload = await fetch(
      "/api/upload",
      {
        method:"POST",
        body:formData
      }
    )


    const cloudinary =
      await upload.json()



    // 2. guardar en BD

    await fetch(
      "/api/doctors/media",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          doctorId,

          url:cloudinary.url,

          type

        })
      }
    )


    setLoading(false)


    alert("Imagen guardada")

  }



  return (

    <div className="space-y-6">


      {/* SELECTOR */}

      <div className="flex gap-3">


        <button
          onClick={()=>setType("GALLERY")}
          className={`
          px-4 py-2 rounded-xl
          ${
            type==="GALLERY"
            ?
            "bg-sky-500 text-white"
            :
            "bg-gray-100"
          }
          `}
        >
          Galería
        </button>



        <button
          onClick={()=>setType("CERTIFICATE")}
          className={`
          px-4 py-2 rounded-xl
          ${
            type==="CERTIFICATE"
            ?
            "bg-sky-500 text-white"
            :
            "bg-gray-100"
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
          "
        >

          {
            loading
            ?
            "Subiendo..."
            :
            "Seleccionar imagen"
          }


          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUpload}
          />

        </label>


      </div>


    </div>

  )

}
