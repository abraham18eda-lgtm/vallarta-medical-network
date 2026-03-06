import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      blogs: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!category) return notFound()

  return (
    <div className="max-w-6xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-10">
        {category.name}
      </h1>

      <BlogGrid posts={category.blogs} />
    </div>
  )
}