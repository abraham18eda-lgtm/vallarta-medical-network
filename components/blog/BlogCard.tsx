import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  post: {
    title: string
    slug: string
    excerpt: string
    image: string
    createdAt: Date
    category?: {
      name: string
      slug: string
    }
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden border bg-background hover:shadow-lg transition">
      
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-5 space-y-2">
        <span className="text-xs text-primary font-medium">
          {post.category?.name} ·{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        <h3 className="text-lg font-semibold line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-block text-sm text-primary font-medium"
        >
          Leer más →
        </Link>
      </div>
    </article>
  )
}