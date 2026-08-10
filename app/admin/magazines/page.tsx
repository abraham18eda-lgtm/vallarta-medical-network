"use client"

import { useEffect, useState } from "react"
import ImageUploadPreview from "@/components/admin/ImageUploadPreview"



export default function AdminMagazines() {


  const [list, setList] = useState<any[]>([])

  const [editing, setEditing] = useState<any>(null)

  const [loading, setLoading] = useState(false)



  async function load() {

    const res = await fetch(
      "/api/admin/magazines"
    )

    const data = await res.json()

    setList(data)

  }




  useEffect(() => {

    load()

  }, [])





  async function save(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()


    const form =
      new FormData(e.currentTarget)



    const data = {


      locale:
        form.get("locale"),


      title:
        form.get("title"),


      coverImage:
        form.get("coverImage"),


      description:
        form.get("description"),


      url:
        form.get("url"),


      edition:
        form.get("edition"),


      isFeatured:
        form.get("isFeatured") === "on",


      isActive:
        true


    }




    const method =
      editing
      ? "PUT"
      : "POST"




    const url =
      editing

      ? `/api/admin/magazines/${editing.id}`

      : "/api/admin/magazines"





    await fetch(

      url,

      {

        method,

        headers:{

          "Content-Type":
          "application/json"

        },

        body:
          JSON.stringify(data)

      }

    )



    e.currentTarget.reset()


    setEditing(null)


    load()


  }






  function edit(item:any){


    setEditing(item)


  }







  async function remove(id:string){


    if(
      !confirm("¿Eliminar revista?")
    ) return



    await fetch(

      `/api/admin/magazines/${id}`,

      {

        method:"DELETE"

      }

    )



    load()

  }






  return (

    <div className="
      min-h-screen
      bg-slate-50
      p-8
    ">


      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-3
        gap-8
      ">




        {/* FORMULARIO */}


        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        ">


          <h1 className="
            text-2xl
            font-bold
            mb-6
          ">


            {
              editing
              ?
              "Editar revista"
              :
              "Nueva revista"
            }


          </h1>




          <form

            onSubmit={save}

            className="
              space-y-5
            "

          >




            <select

              name="locale"

              defaultValue={
                editing?.locale ?? "es"
              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            >

              <option value="es">
                Español
              </option>


              <option value="en">
                English
              </option>


            </select>





            <input

              name="title"

              defaultValue={
                editing?.title ?? ""
              }

              placeholder="Título"

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

              required

            />





            <ImageUploadPreview

              defaultImage={
                editing?.coverImage ?? ""
              }

              name="coverImage"

            />






            <input

              name="url"

              defaultValue={
                editing?.url ?? ""
              }

              placeholder="URL de revista"

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

              required

            />





            <input

              name="edition"

              defaultValue={
                editing?.edition ?? ""
              }

              placeholder="Edición"

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
                editing?.description ?? ""
              }

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
              gap-3
              items-center
            ">


              <input

                type="checkbox"

                name="isFeatured"

                defaultChecked={
                  editing?.isFeatured
                }

              />


              Revista destacada


            </label>





            <button

              className="
                w-full
                rounded-full
                bg-slate-900
                text-white
                py-3
                font-semibold
                hover:bg-slate-700
              "

            >

              Guardar


            </button>



          </form>



        </div>







        {/* LISTADO */}


        <div className="
          lg:col-span-2
        ">



          <h2 className="
            text-3xl
            font-bold
            mb-6
          ">

            Revistas


          </h2>





          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">




          {
            list.map(item=>(


              <div

                key={item.id}

                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                "

              >


                <img

                  src={item.coverImage}

                  className="
                    w-full
                    h-64
                    object-cover
                  "

                />



                <div className="p-5">


                  <h3 className="
                    font-bold
                    text-xl
                  ">

                    {item.title}

                  </h3>



                  <p className="
                    text-sm
                    text-gray-500
                  ">

                    {item.locale === "es"
                      ? "Español"
                      : "English"
                    }

                  </p>




                  <div className="
                    flex
                    gap-3
                    mt-5
                  ">



                    <button

                      onClick={()=>
                        edit(item)
                      }

                      className="
                        flex-1
                        rounded-full
                        border
                        py-2
                        text-blue-600
                      "

                    >

                      Editar

                    </button>




                    <button

                      onClick={()=>
                        remove(item.id)
                      }

                      className="
                        flex-1
                        rounded-full
                        bg-red-50
                        py-2
                        text-red-600
                      "

                    >

                      Eliminar

                    </button>



                  </div>



                </div>


              </div>


            ))
          }



          </div>



        </div>



      </div>


    </div>

  )

}