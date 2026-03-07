import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"
import { redirect } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUploadPreview"

export default async function CreateBannerPage() {
  async function createBanner(formData: FormData) {
    "use server"

    // Guardar imagen si hay archivo
    let imagePath = ""
    const file = formData.get("imageFile") as File
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${file.name}`
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName)
      await writeFile(uploadPath, buffer)
      imagePath = `/uploads/${fileName}`
    }

    await prisma.promoBanner.create({
      data: {
        image: imagePath,
        alt: formData.get("alt") as string || "",
        link: formData.get("link") as string || "",
        locale: formData.get("locale") as string || "es",
        startAt: formData.get("startAt")
          ? new Date(formData.get("startAt") as string)
          : null,
        endAt: formData.get("endAt")
          ? new Date(formData.get("endAt") as string)
          : null,
        isActive: formData.get("isActive") === "on",
      },
    })

    redirect("/admin/banners")
  }

  return (
    <form action={createBanner} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Crear Nuevo Banner</h1>

      <ImageUpload name="imageFile" defaultImage="" />

      <input
        name="alt"
        placeholder="Texto alternativo"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="link"
        placeholder="URL del banner"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        placeholder="Locale (es / en)"
        defaultValue="es"
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
        <input type="checkbox" name="isActive" defaultChecked />
        Activo
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Crear Banner
      </button>
    </form>
  )
}