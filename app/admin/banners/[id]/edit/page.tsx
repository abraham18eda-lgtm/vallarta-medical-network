import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"
import  ImageUpload from "@/components/admin/ImageUploadPreview"

export default async function EditBanner({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const banner = await prisma.promoBanner.findUnique({
    where: { id:numericId },
  })

  if (!banner) return notFound()

  async function updateBanner(formData: FormData) {
    "use server"
    
    let imagePath = banner?.image ?? "";

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

    await prisma.promoBanner.update({
      where: { id: numericId },
      data: {
        image: imagePath,
        alt: formData.get("alt") as string,
        link: formData.get("link") as string,
        locale: formData.get("locale") as string,
        isActive: formData.get("isActive") === "on",
        startAt: formData.get("startAt")
          ? new Date(formData.get("startAt") as string)
          : null,
        endAt: formData.get("endAt")
          ? new Date(formData.get("endAt") as string)
          : null,
      },
    })

    redirect("/admin/banners")
  }

  async function softDelete() {
    "use server"

    await prisma.promoBanner.update({
      where: { id: numericId  },
      data: { isActive: false },
    })

    redirect("/admin/banners")
  }

  return (
    <form action={updateBanner} className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Editar Banner</h1>

      {/* Vista previa */}
      <div>
        <p className="text-sm mb-2">Vista previa:</p>
        <ImageUpload
          defaultImage={banner.image}
          name="imageFile"
        />
      </div>

      {/* <input
        type="file"
        name="imageFile"
        accept="image/*"
        className="w-full border p-3 rounded-lg"
      /> */}
      
      <input
        name="alt"
        defaultValue={banner.alt}
        placeholder="Texto alt"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="link"
        defaultValue={banner.link ?? ""}
        placeholder="Link (opcional)"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        defaultValue={banner.locale}
        className="w-full border p-3 rounded-lg"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          name="startAt"
          defaultValue={
            banner.startAt
              ? new Date(banner.startAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="datetime-local"
          name="endAt"
          defaultValue={
            banner.endAt
              ? new Date(banner.endAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={banner.isActive}
        />
        Activo
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Guardar
        </button>

        <button
          formAction={softDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-lg"
        >
          Desactivar
        </button>
      </div>
    </form>
  )
}