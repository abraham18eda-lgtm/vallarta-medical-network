import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ViewPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    
    const { id } = await params
    const numericId = Number(id)
    
    const post = await prisma.blog.findUnique({
        where: { id: numericId },
    })

    if (!post) return notFound()

    return (
        <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">
            {post.title}
        </h1>

        <p className="text-gray-500 mb-6">
            Locale: {post.locale}
        </p>

        <div className="prose">
            {post.content}
        </div>
        </div>
    )
}