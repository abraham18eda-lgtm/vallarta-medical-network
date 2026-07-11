// import { prisma } from "@/lib/prisma"
// import { redirect } from "next/navigation"
// import { writeFile } from "fs/promises"
// import path from "path"
// import  ImagePreview from "@/components/admin/ImagePreview"
// import SlugPreview from "@/components/admin/SlugPreview"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import RichEditor from "@/components/admin/RichEditor"
  
// export default async function NewPost() {

//   const categories = await prisma.category.findMany()
//   const domain = getBaseUrl()

//   async function createPost(formData: FormData) {
//     "use server"

//     let imagePath = ""

//     const file = formData.get("imageFile") as File

//     if (file && file.size > 0) {
//       const bytes = await file.arrayBuffer()
//       const buffer = Buffer.from(bytes)

//       const fileName = `${Date.now()}-${file.name}`

//       const uploadPath = path.join(
//         process.cwd(),
//         "public/uploads",
//         fileName
//       )

//       await writeFile(uploadPath, buffer)

//       imagePath = `/uploads/${fileName}`
//     }

//     await prisma.blog.create({
//       data: {
//         title: formData.get("title") as string,
//         slug: formData.get("slug") as string,
//         excerpt: formData.get("excerpt") as string,
//         content: formData.get("content") as string,
//         image: imagePath,
//         locale: formData.get("locale") as string,
//         category: {
//           connect: {
//             id: formData.get("categoryId") as string,
//           },
//         },
//       },
//     })

//     redirect("/admin/blog")
//   }

//   return (
//     <form action={createPost} className="space-y-6 max-w-2xl">

//       <h1 className="text-2xl font-bold">
//         Nuevo Blog
//       </h1>
      
//       <SlugPreview domain={domain || ''} />
//       {/* <input
//         name="title"
//         placeholder="Titulo"
//         className="w-full border p-3 rounded-lg"
//       /> */}
//       {/* <input
//         name="slug"
//         placeholder="slug-del-post"
//         className="w-full border p-3 rounded-lg"
//       /> */}

//       <select
//         name="locale"
//         className="w-full border p-3 rounded-lg"
//       >
//         <option value="es">Español</option>
//         <option value="en">English</option>
//       </select>
//       <select
//         name="categoryId"
//         className="w-full border p-3 rounded-lg"
//         >
//         <option value="">Seleccionar categoría</option>

//         {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//             {cat.name}
//             </option>
//         ))}
//       </select>

//       <ImagePreview />

//       <textarea
//         name="excerpt"
//         placeholder="Descripcion corta"
//         className="w-full border p-3 rounded-lg"
//       />
//       {/* <textarea name="excerpt" /> */}
//       <RichEditor name="content" />

//       {/* <textarea
//         name="content"
//         placeholder="Contenido"
//         className="w-full border p-3 rounded-lg h-40"
//       /> */}
//       <button
//         type="submit"
//         className="bg-primary text-white px-6 py-2 rounded-lg"
//       >
//         Crear Post
//       </button>

//     </form>
//   )
// }

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"

import ImagePreview from "@/components/admin/ImagePreview"
import SlugPreview from "@/components/admin/SlugPreview"
import RichEditor from "@/components/admin/RichEditor"

import { getBaseUrl } from "@/lib/getBaseUrl"

// =======================================
// CLOUDINARY
// =======================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function NewPost() {

  const categories =
    await prisma.category.findMany()

  const domain = getBaseUrl()

  // =======================================
  // CREATE POST
  // =======================================
  async function createPost(
    formData: FormData
  ) {
    "use server"

    try {

      let imagePath = ""

      const file =
        formData.get(
          "imageFile"
        ) as File

      // =======================================
      // SUBIR A CLOUDINARY
      // =======================================
      if (file && file.size > 0) {

        const bytes =
          await file.arrayBuffer()

        const buffer =
          Buffer.from(bytes)

        const base64 =
          `data:${file.type};base64,${buffer.toString("base64")}`

        const upload =
          await cloudinary.uploader.upload(
            base64,
            {
              folder: "blog"
            }
          )

        imagePath =
          upload.secure_url
      }

      // =======================================
      // CREATE BLOG
      // =======================================
      const categoryId =
        formData.get("categoryId") as string

      await prisma.blog.create({
        data: {

          title:
            formData.get(
              "title"
            ) as string,

          slug:
            formData.get(
              "slug"
            ) as string,

          excerpt:
            formData.get(
              "excerpt"
            ) as string,

          content:
            formData.get(
              "content"
            ) as string,

          image: imagePath,

          locale:
            formData.get(
              "locale"
            ) as string,

          featured:
            formData.get(
              "featured") === "on",

          published:
            formData.get(
              "published") === "on",

          isActive: true,  

          category: 
           categoryId
            ? {
                connect:{
                  id:categoryId
                }
              }
            : undefined
        }
      })

    } catch (error) {

      console.error(error)

      throw new Error(
        "Error creando blog"
      )
    }

    redirect("/admin/blog")
  }

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Crear un nuevo artículo
          </h1>

          {/* <p className="text-gray-500 mt-2">
            Crea un nuevo artículo para tu sitio
          </p> */}

        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          <form
            action={createPost}
            className="p-8 space-y-8"
          >

            {/* SEO */}
            <div className="space-y-5">

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Información General
                </h2>

                <p className="text-sm text-gray-500">
                  Completa los datos principales del artículo
                </p>

              </div>

              <SlugPreview
                domain={domain || ""}
              />

            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* LOCALE */}
              <div>

                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Idioma
                </label>

                <select
                  name="locale"
                  className="
                    w-full
                    border border-gray-200
                    rounded-2xl
                    px-4 py-3
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                  "
                >
                  <option value="es">
                    Español
                  </option>

                  <option value="en">
                    English
                  </option>

                </select>

              </div>

              {/* CATEGORY */}
              <div>

                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Categoría
                </label>

                <select
                  name="categoryId"
                  className="
                    w-full
                    border border-gray-200
                    rounded-2xl
                    px-4 py-3
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                  "
                >

                  <option value="">
                    Seleccionar categoría
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* IMAGEN */}
            <div>

              <div className="mb-4">

                <h2 className="text-lg font-semibold text-gray-800">
                  Imagen principal
                </h2>

                <p className="text-sm text-gray-500">
                  La imagen se subirá automáticamente a Cloudinary
                </p>

              </div>

              <div className="
                border-2 border-dashed border-gray-200
                rounded-3xl
                p-6
                bg-gray-50
              ">

                <ImagePreview />

              </div>

            </div>

            {/* EXCERPT */}
            <div>

              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Descripción corta
              </label>

              <textarea
                name="excerpt"
                placeholder="Escribe una pequeña descripción..."
                rows={4}
                className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                  resize-none
                "
              />

            </div>

            {/* CONTENT */}
            <div>

              <div className="mb-4">

                <h2 className="text-lg font-semibold text-gray-800">
                  Contenido del Blog
                </h2>

                <p className="text-sm text-gray-500">
                  Agrega el contenido completo del artículo
                </p>

              </div>

              <div className="
                border border-gray-200
                rounded-3xl
                overflow-hidden
              ">

                <RichEditor name="content" />

              </div>

            </div>

            {/* FEATURED / PUBLISHED */}
            <div className="grid md:grid-cols-2 gap-5">

              <label className="
                flex items-center gap-3
                border border-gray-200
                rounded-2xl
                p-4
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  name="featured"
                  className="w-5 h-5"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    ⭐ Mostrar en Home
                  </p>

                  <p className="text-sm text-gray-500">
                    Este artículo aparecerá en la portada
                  </p>
                </div>

              </label>


              <label className="
                flex items-center gap-3
                border border-gray-200
                rounded-2xl
                p-4
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  name="published"
                  defaultChecked
                  className="w-5 h-5"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Publicado
                  </p>

                  <p className="text-sm text-gray-500">
                    Visible para los usuarios
                  </p>
                </div>

              </label>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-4 border-t">

              <button
                type="button"
                className="
                  px-6 py-3
                  rounded-2xl
                  border border-gray-300
                  hover:bg-gray-100
                  transition
                "
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-8 py-3
                  rounded-2xl
                  shadow-sm
                  transition
                "
              >
                Crear Post
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}