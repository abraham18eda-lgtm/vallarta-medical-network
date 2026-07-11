import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react";


interface BlogCardProps {
  locale: string
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

export function BlogCard({ post , locale }: BlogCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden border bg-background hover:shadow-lg transition">
      
      <div className="relative w-[309] h-[223] h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-5 space-y-2">
        <span className="text-xs text-primary font-medium flex items-center gap-1">
          {/* <div className="text-[#ccc]"> {post.category?.name} </div> */}
          {post.category && (
            <span
              className=" 
                inline-flex
                rounded-full
                bg-primary/10
                px-4
                py-1.5
                text-sm
                font-medium
                text-primary
              "
            >
              {post.category.name}
            </span>
          )}
          <CalendarDays className="w-4 h-4 text-primary" /> {"  "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        <h3 className="text-lg font-semibold line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        <Link
           href={`/${locale}/blog/${post.slug}`}
          className="inline-block text-sm text-primary font-medium"
        >
          Leer más →
        </Link>
      </div>
    </article>
  )
}