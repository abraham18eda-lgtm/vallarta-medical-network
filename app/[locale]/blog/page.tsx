import { getPaginatedPosts } from "@/lib/blog"
import { BlogGrid } from "@/components/blog/BlogGrid"
import Link from "next/link"

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1

  const { posts, totalPages } =
    await getPaginatedPosts(page)

  return (
    <div className="py-20 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Todos los artículos
      </h1>

      <BlogGrid posts={posts} />

      {/* Paginación */}
      <div className="flex justify-center gap-4 mt-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  )
}