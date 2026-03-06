import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"
import  ImagePreview from "@/components/admin/ImagePreview"
import SlugPreview from "@/components/admin/SlugPreview"
import { getBaseUrl } from "@/lib/getBaseUrl"
import RichEditor from "@/components/admin/RichEditor"
  
export default async function NewPost() {

  const categories = await prisma.category.findMany()
  const domain = getBaseUrl()

  async function createPost(formData: FormData) {
    "use server"

    let imagePath = ""

    const file = formData.get("imageFile") as File

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const fileName = `${Date.now()}-${file.name}`

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        fileName
      )

      await writeFile(uploadPath, buffer)

      imagePath = `/uploads/${fileName}`
    }

    await prisma.blog.create({
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        image: imagePath,
        locale: formData.get("locale") as string,
        category: {
          connect: {
            id: formData.get("categoryId") as string,
          },
        },
      },
    })

    redirect("/admin/blog")
  }

  return (
    <form action={createPost} className="space-y-6 max-w-2xl">

      <h1 className="text-2xl font-bold">
        Nuevo Blog
      </h1>
      
      <SlugPreview domain={domain} />
      {/* <input
        name="title"
        placeholder="Titulo"
        className="w-full border p-3 rounded-lg"
      /> */}
      {/* <input
        name="slug"
        placeholder="slug-del-post"
        className="w-full border p-3 rounded-lg"
      /> */}

      <select
        name="locale"
        className="w-full border p-3 rounded-lg"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <select
        name="categoryId"
        className="w-full border p-3 rounded-lg"
        >
        <option value="">Seleccionar categoría</option>

        {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
            {cat.name}
            </option>
        ))}
      </select>

      <ImagePreview />

      <textarea
        name="excerpt"
        placeholder="Descripcion corta"
        className="w-full border p-3 rounded-lg"
      />
      {/* <textarea name="excerpt" /> */}
      <RichEditor name="content" />

      {/* <textarea
        name="content"
        placeholder="Contenido"
        className="w-full border p-3 rounded-lg h-40"
      /> */}
      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-lg"
      >
        Crear Post
      </button>

    </form>
  )
}