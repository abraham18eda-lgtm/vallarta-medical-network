import Link from "next/link"
import { redirect } from "next/navigation"

import { getMagazineById } from "@/lib/magazine"

import EditMagazineForm from "./EditMagazineForm"


interface Props {
  params: Promise<{
    id: string
  }>
}


export default async function EditMagazinePage({
  params
}: Props) {

  const { id } = await params

  const magazine =
    await getMagazineById(id)


  if (!magazine) {

    redirect("/admin/magazines")

  }


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
              Editar revista
            </h1>

            <p className="
              text-gray-500
              mt-1
            ">
              Modifica la información de la revista
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


        {/* FORM */}

        <EditMagazineForm
          magazine={magazine}
        />

      </div>

    </div>

  )

}
