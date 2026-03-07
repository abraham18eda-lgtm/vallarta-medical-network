import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"
import ImageUpload  from "@/components/admin/ImageUploadPreview"

export default async function EditSlide({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const slide = await prisma.heroSlide.findUnique({
    where: { id: numericId },
  })

  if (!slide) return notFound()

  async function updateSlide(formData: FormData) {
    "use server"

    let imagePath = slide!.image ?? "";
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

    await prisma.heroSlide.update({
      where: { id: numericId },
      data: {
        image: imagePath,
        title: formData.get("title") as string,
        highlight: formData.get("highlight") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
        locale: formData.get("locale") as string,
        order: Number(formData.get("order")),
        isActive: formData.get("isActive") === "on",
        startAt: formData.get("startAt")
          ? new Date(formData.get("startAt") as string)
          : null,
        endAt: formData.get("endAt")
          ? new Date(formData.get("endAt") as string)
          : null,
      },
    })

    redirect("/admin/slides")
  }

  return (
    <form action={updateSlide} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">
        Editar Slide
      </h1>

      <ImageUpload
        defaultImage={slide.image}
        name="imageFile"
      />

      <input
        name="image"
        defaultValue={slide.image}
        placeholder="URL imagen"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="title"
        defaultValue={slide.title}
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="highlight"
        defaultValue={slide.highlight ?? ""}
        placeholder="Highlight"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="description"
        defaultValue={slide.description ?? ""}
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="link"
        defaultValue={slide.link ?? ""}
        placeholder="Link"
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="locale"
        defaultValue={slide.locale}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        name="order"
        defaultValue={slide.order}
        className="w-full border p-3 rounded-lg"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          name="startAt"
          defaultValue={
            slide.startAt
              ? new Date(slide.startAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="datetime-local"
          name="endAt"
          defaultValue={
            slide.endAt
              ? new Date(slide.endAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-lg"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={slide.isActive}
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