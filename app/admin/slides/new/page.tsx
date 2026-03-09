import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"
import { redirect } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUploadPreview"

export default async function CreateHeroSlidePage() {

  async function createSlide(formData: FormData) {
    "use server"

    try {

      // ---------------------------
      // SUBIR IMAGEN
      // ---------------------------
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

      if (!imagePath) {
        throw new Error("Image is required")
      }

      // ---------------------------
      // FECHAS SEGURAS
      // ---------------------------

      const startAtValue = formData.get("startAt") as string
      const endAtValue = formData.get("endAt") as string

      const startAt = startAtValue ? new Date(startAtValue) : null
      const endAt = endAtValue ? new Date(endAtValue) : null

      // ---------------------------
      // CREAR SLIDE
      // ---------------------------

      await prisma.heroSlide.create({
        data: {
          image: imagePath,
          title: (formData.get("title") as string) || "",
          highlight: (formData.get("highlight") as string) || "",
          description: (formData.get("description") as string) || "",
          link: (formData.get("link") as string) || "",
          locale: (formData.get("locale") as string) || "es",

          order: parseInt(formData.get("order") as string) || 0,

          startAt: startAt,
          endAt: endAt,

          isActive: formData.get("isActive") === "on",
        },
      })

    } catch (error) {

      console.error("CREATE HERO SLIDE ERROR:", error)
      throw error

    }

    redirect("/admin/slides")
  }

  return (
    <form action={createSlide} className="space-y-6 max-w-3xl">

      <h1 className="text-2xl font-bold">
        Crear Nuevo Hero Slide
      </h1>

      <ImageUpload
        name="imageFile"
        defaultImage=""
      />

      <input
        name="title"
        placeholder="Título"
        className="w-full border p-3 rounded-lg"/>

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
        placeholder="URL del botón"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        defaultValue="es"
        placeholder="Locale (es / en)"
        className="w-full border p-3 rounded-lg"/>

      <input
        type="number"
        name="order"
        defaultValue="0"
        placeholder="Orden"
        className="w-full border p-3 rounded-lg"
      />

      <div className="grid grid-cols-2 gap-4">

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

      </div>

      <label className="flex items-center gap-2">

        <input
          type="checkbox"
          name="isActive"
          defaultChecked
        />

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