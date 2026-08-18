import { prisma } from "@/lib/prisma"
import { createBlogTranslation } from "./actions"
import { notFound, redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"
import BlogEditor from "@/components/editor/BlogEditor"
import ImagePreview from "@/components/admin/ImagePreview"
import SlugInput from "@/components/admin/SlugInput"

// CLOUDINARY

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
    
  // const [
  //   post,
  //   categories
  // ] = await Promise.all([
  //   prisma.blog.findUnique({
  //     where: {
  //       id: numericId,
  //     },
  //     include: {
  //       category: true,
  //     },
  //   }),

  //   prisma.category.findMany({
  //     orderBy: {
  //       name: "asc",
  //     },
  //   }),
  // ])

  // if (!post) return notFound()
  
  const post = await prisma.blog.findUnique({
    where: {
      id: numericId,
    },
    include: {
      category: true,
    },
  })

  if (!post) return notFound()

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const translatedPost = post.translationGroup
  ? await prisma.blog.findFirst({
      where: {
        translationGroup: post.translationGroup,
        id: {
          not: post.id,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        locale: true,
      },
    })
  : null

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
        slug: formData.get("slug") as string,
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

          <h1 className="font-heading text-sky-800 text-3xl font-semibold text-center mb-8">
            Editar Blog
          </h1>


          <form
            action={updatePost}
            // encType="multipart/form-data"
            className="space-y-6"
          >
            <div>
              {/* <label className="block text-sm font-medium mb-2">
              Imagen principal
              </label> */}
              <div className="
                border rounded-2xl
                p-4
                bg-gray-50
                ">

                <ImagePreview
                  currentImage={post.image}
                />
              </div>
            </div>


            {/* TITULO */}
            <SlugInput
              defaultTitle={post.title}
              defaultSlug={post.slug}
            />
            
            {/* SLUG */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Slug
              </label>

              <input
                name="slug"
                defaultValue={post.slug}
                className="
                  w-full border rounded-xl
                  px-4 py-3
                "
              />

              <p className="text-xs text-gray-500 mt-1">
                URL del artículo. Usa solamente letras minúsculas,
                números y guiones.
              </p>

            </div>

            {/* TRADUCCIÓN */}
            <div className="border rounded-2xl p-5 bg-slate-50">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Traducción
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Relaciona este artículo con su versión en otro idioma.
                  </p>

                </div>

                {translatedPost ? (
                  <span className="
                    px-3 py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-xs
                    font-semibold
                  ">
                    Traducción vinculada
                  </span>
                ) : (
                  <span className="
                    px-3 py-1
                    rounded-full
                    bg-gray-100
                    text-gray-500
                    text-xs
                    font-semibold
                  ">
                    Sin traducción
                  </span>
                )}

              </div>


              {translatedPost ? (

                <div className="mt-4 flex items-center justify-between gap-4">

                  <div>

                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      {translatedPost.locale === "es"
                        ? "Español"
                        : "English"}
                    </p>

                    <p className="font-medium text-gray-800 mt-1">
                      {translatedPost.title}
                    </p>

                  </div>

                  <a
                    href={`/admin/blog/${translatedPost.id}/edit`}
                    className="
                      shrink-0
                      px-4 py-2
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-sm
                      font-medium
                      hover:bg-blue-100
                    "
                  >
                    Editar
                  </a>

                </div>

              ) : (

                <div className="mt-4">

                  <p className="text-sm text-gray-500">
                    Este artículo todavía no tiene una traducción relacionada.
                  </p>
                   <button
                    type="submit"
                    formAction={async () => {
                      "use server"
                      await createBlogTranslation(post.id)
                    }}
                    className="
                      mt-4
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-5
                      py-3
                      rounded-xl
                      transition
                    "
                  >
                    Crear traducción
                  </button>
                </div>

              )}

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
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>



            {/* CONTENT */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contenido
              </label>
              <div className="border rounded-xl overflow-hidden">    
                <BlogEditor
                  name="content"
                  value={post.content}
                />
              </div>
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