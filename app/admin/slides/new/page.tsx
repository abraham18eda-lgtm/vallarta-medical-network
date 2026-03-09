import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"
import { redirect } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUploadPreview"

export default async function CreateSlidePage() {

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

    await prisma.heroSlide.create({
      data: {
        image: imagePath,
        title: (formData.get("title") as string) || "",
        highlight: (formData.get("highlight") as string) || "",
        description: (formData.get("description") as string) || "",
        link: (formData.get("link") as string) || "",
        locale: (formData.get("locale") as string) || "es",
        order: Number(formData.get("order") || 0),
        startAt: formData.get("startAt")
          ? new Date(formData.get("startAt") as string)
          : null,
        endAt: formData.get("endAt")
          ? new Date(formData.get("endAt") as string)
          : null,
        isActive: formData.get("isActive") === "on",
      },
    })

    redirect("/admin/slides")
  }

  return (
    <form
      action={createSlide}
      encType="multipart/form-data"
      className="space-y-6 max-w-3xl"
    >
      <h1 className="text-2xl font-bold">Crear Nuevo Slide</h1>

      <ImageUpload name="imageFile" defaultImage="" />

      <input
        name="title"
        placeholder="Título"
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        name="highlight"
        placeholder="Texto destacado"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="description"
        placeholder="Descripción"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="link"
        placeholder="URL del slide"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        placeholder="Locale (es / en)"
        defaultValue="es"
        className="w-full border p-3 rounded-lg"
      />
      
      <input
        type="datetime-local"
        name="startAt"
        className="border p-3 rounded-lg"
      />

      <input
        type="datetime-local"
        name="endAt"
        className="border p-3 rounded-lg"
      />

      <input
        type="number"
        name="order"
        defaultValue={0}
        className="w-full border p-3 rounded-lg"
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isActive" defaultChecked />
        Activo
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Crear Slide
      </button>

    </form>
  )
}