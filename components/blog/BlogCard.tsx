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
      name: string;
      slug: string;
    } | null;
  }
}

export function BlogCard({ post , locale }: BlogCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden border bg-background hover:shadow-lg transition">
      
      <div className="relative h-[223px] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-primary">
          {post.category?.name}
        </span>
      </div>

      <div className="p-5 space-y-2">
        <span className="text-xs text-primary font-medium flex items-center gap-1">
          {/* <div className="text-[#ccc]"> {post.category?.name} </div> */}
          {/* {post.category && (
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
          )} */}
          <CalendarDays className="w-4 h-4 text-slate-700" /> {"  "}
          <span className="text-slate-800">{new Date(post.createdAt).toLocaleDateString()}</span>
        </span>

        <h3 className="font-semibold line-clamp-2 text-lg text-slate-700">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        <Link
           href={`/${locale}/blog/${post.slug}`}
          className="inline-block text-sm text-sky-600/80 font-medium"
        >
          Leer más →
        </Link>
      </div>
    </article>
  )
}