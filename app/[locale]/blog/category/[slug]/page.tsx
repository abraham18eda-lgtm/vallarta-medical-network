import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogGrid } from "@/components/blog/BlogGrid"

interface Props {
  params: { slug: string; locale: string }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params

  const category = await prisma.category.findUnique({
    where: { slug },
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