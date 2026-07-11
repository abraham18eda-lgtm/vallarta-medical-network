import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"


// =======================================
// CLOUDINARY
// =======================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  
  const { id } = await params
  const numericId = Number(id)
    
  const [
    post,
    categories
  ] = await Promise.all([
    prisma.blog.findUnique({
      where: {
        id: numericId,
      },
      include: {
        category: true,
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ])

  if (!post) return notFound()

  const postId = post.id
  const currentImage = post.image  
  
  async function updatePost(formData: FormData) {
    "use server"

    // SUBIR A CLOUDINARY
    let imagePath = currentImage

      const file =
      formData.get("imageFile") as File
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
              folder: "blog",
            }
          )
        imagePath =
          upload.secure_url
      } 

    const categoryId =
    formData.get("categoryId") as string

    await prisma.blog.update({
      where: { id:postId },
      data: {
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        locale: formData.get("locale") as string,
        image: imagePath,
        featured: formData.get("featured") === "on",
        published:  formData.get("published") === "on",
        isActive: formData.get("isActive") === "on",

        category: categoryId
          ? {
              connect: {
                id: categoryId
              }
            }
          : {
              disconnect: true
            }
      },
    })

    redirect("/admin/blog")
  }

  // return (
  //   <form action={updatePost} className="space-y-6 max-w-2xl">
  //     <h1 className="text-2xl font-bold">
  //       Editar Post
  //     </h1>

  //     <input
  //       name="title"
  //       defaultValue={post.title}
  //       className="w-full border p-3 rounded-lg"
  //     />

  //     <textarea
  //       name="content"
  //       defaultValue={post.content}
  //       className="w-full border p-3 rounded-lg h-40"
  //     />

  //     <label className="flex items-center gap-2">
  //       <input
  //         type="checkbox"
  //         name="isActive"
  //         defaultChecked={post.isActive}
  //       />
  //       Activo
  //     </label>

  //     <button
  //       type="submit"
  //       className="bg-primary text-white px-6 py-2 rounded-lg"
  //     >
  //       Guardar cambios
  //     </button>
  //   </form>
  // )

   return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-sm border p-8">

          <h1 className="text-3xl font-bold mb-8">
            Editar Post
          </h1>


          <form
            action={updatePost}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
              Imagen principal
              </label>


              <div className="
                border rounded-2xl
                p-4
                bg-gray-50
                ">


                {post.image && (

                <img
                src={post.image}
                alt={post.title}
                className="
                w-full
                h-64
                object-cover
                rounded-xl
                mb-4
                "
                />
              )}



              <input
                type="file"
                name="imageFile"
                accept="image/*"
                className="
                w-full
                border
                rounded-xl
                p-3
                "
              />
              </div>
            </div>


            {/* TITULO */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Título
              </label>

              <input
                name="title"
                defaultValue={post.title}
                className="
                w-full border rounded-xl
                px-4 py-3
                "
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* IDIOMA */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Idioma
                </label>

                <select
                  name="locale"
                  defaultValue={post.locale}
                  className="
                  w-full border rounded-xl
                  px-4 py-3
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

              {/* CATEGORIA */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Categoría
                </label>

                <select
                  name="categoryId"
                  defaultValue={post.categoryId ?? ""}
                  className="
                  w-full border rounded-xl
                  px-4 py-3
                  "
                >

                  <option value="">
                    Sin categoría
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

            {/* EXCERPT */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Descripción corta
              </label>


              <textarea

                name="excerpt"

                defaultValue={post.excerpt}

                rows={4}

                className="
                w-full border rounded-xl
                px-4 py-3
                "

              />

            </div>



            {/* CONTENT */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Contenido
              </label>


              <textarea

                name="content"

                defaultValue={post.content}

                rows={10}

                className="
                w-full border rounded-xl
                px-4 py-3
                "

              />

            </div>



            {/* OPTIONS */}
            <div className="grid md:grid-cols-3 gap-4">


              <label className="
              flex items-center gap-3
              border rounded-xl p-4
              ">

                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={post.featured}
                />

                ⭐ Mostrar en Home

              </label>



              <label className="
              flex items-center gap-3
              border rounded-xl p-4
              ">

                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={post.published}
                />

                Publicado

              </label>



              <label className="
              flex items-center gap-3
              border rounded-xl p-4
              ">

                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={post.isActive}
                />

                Activo

              </label>


            </div>



            <button

              type="submit"

              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8 py-3
              rounded-xl
              "

            >
              Guardar cambios

            </button>


          </form>

        </div>

      </div>

    </div>

  )
}