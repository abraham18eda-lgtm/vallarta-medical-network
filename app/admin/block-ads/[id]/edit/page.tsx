import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"
import ImageUpload  from "@/components/admin/ImageUploadPreview"

export default async function EditBlockAd({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const block = await prisma.block.findUnique({
    where: { id: numericId },
  })

  if (!block) return notFound()

  // Convertimos JSON a objeto usable
  const data = block.data as {
    title?: string
    description?: string
    image?: string
    link?: string
  }

  async function updateBlock(formData: FormData) {
    "use server"
    
    let imagePath = data.image

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
    
    await prisma.block.update({
      where: { id: numericId },
      data: {
        locale: formData.get("locale") as string,
        order: Number(formData.get("order")) || 0,
        isActive: formData.get("isActive") === "on",
        startAt: formData.get("startAt")
          ? new Date(formData.get("startAt") as string)
          : null,
        endAt: formData.get("endAt")
          ? new Date(formData.get("endAt") as string)
          : null,
        data: {
          title: formData.get("title"),
          description: formData.get("description"),
          image: imagePath,
          link: formData.get("link"),
        },
      },
    })

    redirect("/admin/block-ads")
  }

  return (
    <form action={updateBlock} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">
        Editar Block Ad
      </h1>

      {/* Tipo (solo lectura) */}
      <div className="bg-gray-100 p-3 rounded">
        Tipo: <strong>{block.type}</strong>
      </div>

      <input
        name="title"
        defaultValue={data?.title ?? ""}
        placeholder="Título"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="description"
        defaultValue={data?.description ?? ""}
        placeholder="Descripción"
        className="w-full border p-3 rounded-lg"
      />

      <ImageUpload
        defaultImage={data.image}
        name="imageFile"
      />
      <input
        name="alt"
        defaultValue={data?.alt ?? ""}
        placeholder="Alt"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="link"
        defaultValue={data?.link ?? ""}
        placeholder="Link"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        defaultValue={block.locale}
        placeholder="Locale (es / en)"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        name="order"
        defaultValue={block.order ?? 0}
        placeholder="Orden"
        className="w-full border p-3 rounded-lg"
      />

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          name="startAt"
          defaultValue={
            block.startAt
              ? new Date(block.startAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="datetime-local"
          name="endAt"
          defaultValue={
            block.endAt
              ? new Date(block.endAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={block.isActive}
        />
        Activo
      </label>

      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-lg"
      >
        Guardar cambios
      </button>
    </form>
  )
}