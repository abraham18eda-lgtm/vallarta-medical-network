import { redirect } from "next/navigation"

import { getMagazineById } from "@/lib/magazine"

import { updateMagazine } from "@/actions/magazine.actions"



interface Props {

  params: Promise<{
    id:string
  }>

}



export default async function EditMagazinePage({
  params
}:Props){


  const {
    id
  } = await params



  const magazine = await getMagazineById(id)



  if(!magazine){

    redirect("/admin/megazine")

  }



  async function saveMagazine(
    formData:FormData
  ){

    "use server"


    await updateMagazine(

      id,

      {

        title:String(
          formData.get("title")
        ),


        coverImage:String(
          formData.get("coverImage")
        ),


        description:String(
          formData.get("description") || ""
        ),


        url:String(
          formData.get("url")
        ),


        edition:String(
          formData.get("edition") || ""
        ),


        isFeatured:
          formData.get("isFeatured") === "on",


        isActive:
          formData.get("isActive") === "on"

      }

    )


    redirect("/admin/megazine")

  }




  return (

    <div className="max-w-3xl p-8">


      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">

        Editar revista

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

          defaultValue={magazine.title}

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

          defaultValue={magazine.coverImage}

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

          defaultValue={magazine.url}

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

          defaultValue={
            magazine.edition ?? ""
          }

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

          defaultValue={
            magazine.description ?? ""
          }

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

            defaultChecked={
              magazine.isFeatured
            }

          />


          Destacada


        </label>





        <label className="
          flex
          items-center
          gap-3
        ">


          <input

            type="checkbox"

            name="isActive"

            defaultChecked={
              magazine.isActive
            }

          />


          Activa


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

          Guardar cambios

        </button>


      </form>


    </div>

  )

}