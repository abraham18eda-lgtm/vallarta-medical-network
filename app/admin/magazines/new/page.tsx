import { redirect } from "next/navigation"

import { createMagazine } from "@/actions/magazine.actions"



export default function CreateMagazinePage() {


  async function saveMagazine(
    formData: FormData
  ) {

    "use server"


    await createMagazine({

      title: String(
        formData.get("title")
      ),

      coverImage: String(
        formData.get("coverImage")
      ),

      description: String(
        formData.get("description") || ""
      ),

      url: String(
        formData.get("url")
      ),

      edition: String(
        formData.get("edition") || ""
      ),

      isFeatured:
        formData.get("isFeatured") === "on"

    })


    redirect("/admin/megazine")

  }



  return (

    <div className="max-w-3xl p-8">


      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">

        Crear revista

      </h1>



      <form

        action={saveMagazine}

        className="
          space-y-5
          rounded-2xl
          border
          bg-white
          p-8
        "

      >


        <input

          name="title"

          placeholder="Título"

          required

          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
          "

        />



        <input

          name="coverImage"

          placeholder="URL de portada"

          required

          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
          "

        />



        <input

          name="url"

          placeholder="URL de la revista"

          required

          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
          "

        />



        <input

          name="edition"

          placeholder="Edición (Ej: Agosto 2026)"

          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
          "

        />



        <textarea

          name="description"

          placeholder="Descripción"

          rows={5}

          className="
            w-full
            rounded-xl
            border
            px-4
            py-3
          "

        />



        <label className="
          flex
          items-center
          gap-3
        ">


          <input

            type="checkbox"

            name="isFeatured"

          />


          Revista destacada


        </label>




        <button

          type="submit"

          className="
            rounded-full
            bg-slate-900
            px-8
            py-3
            text-white
          "

        >

          Guardar

        </button>


      </form>


    </div>

  )

}