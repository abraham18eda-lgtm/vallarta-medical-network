import Link from "next/link"

import MagazineForm from "./MagazineForm"


export default function NewMagazinePage() {

  return (

    <div className="
      min-h-screen
      bg-gray-50
      p-6
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-800
            ">
              Crear revista
            </h1>

            <p className="
              text-gray-500
              mt-1
            ">
              Agrega una nueva revista al sitio
            </p>

          </div>


          <Link
            href="/admin/magazines"
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-gray-200
              bg-white
              text-gray-700
              hover:bg-gray-50
              transition
              text-sm
              font-medium
            "
          >
            ← Volver
          </Link>

        </div>


        {/* FORMULARIO */}

        <MagazineForm />

      </div>

    </div>

  )
}
