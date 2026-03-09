import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"
import ImageUpload from "@/components/admin/ImageUploadPreview"

async function createSlide(formData: FormData) {
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

  const title = formData.get("title") as string
  const highlight = formData.get("highlight") as string
  const description = formData.get("description") as string
  const link = formData.get("link") as string
  const locale = formData.get("locale") as string
  const order = Number(formData.get("order"))

  await prisma.heroSlide.create({
    data: {
      image: imagePath,
      title,
      highlight,
      description,
      link,
      locale,
      order,
      isActive: true
    },
  })

  redirect("/admin/slides")
}

export default function NewSlidePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        Nuevo Slide
      </h1>

      <form action={createSlide} className="space-y-4">

        <ImageUpload name="imageFile" defaultImage="" />

        <input
          name="title"
          placeholder="Título"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="highlight"
          placeholder="Texto destacado"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          className="w-full border p-2 rounded"
        />

        <input
          name="link"
          placeholder="Link"
          className="w-full border p-2 rounded"
        />

        <select
          name="locale"
          className="w-full border p-2 rounded"
          defaultValue="es"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>

        <input
          name="order"
          type="number"
          placeholder="Orden"
          className="w-full border p-2 rounded"
          defaultValue={0}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Guardar Slide
        </button>

      </form>
    </div>
  )
}