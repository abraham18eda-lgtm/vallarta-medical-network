import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    
  const post = await prisma.blog.findUnique({
    where: { id: Number(id) },
  })

  if (!post) return notFound()

  async function updatePost(formData: FormData) {
    "use server"

    await prisma.blog.update({
      where: { id: post.id },
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        isActive: formData.get("isActive") === "on",
      },
    })

    redirect("/admin/blog")
  }

  return (
    <form action={updatePost} className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">
        Editar Post
      </h1>

      <input
        name="title"
        defaultValue={post.title}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="content"
        defaultValue={post.content}
        className="w-full border p-3 rounded-lg h-40"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={post.isActive}
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