import { BlogCard } from "./BlogCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"


interface Props {
  posts: any[]
  locale: string
  title?: string
}

export function BlogGrid({ posts, locale, title }: Props) {
  if (!posts?.length) return null

    const mobilePosts = posts.slice(0, 2)
    const desktopPosts = posts.slice(0, 8)

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {mobilePosts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {desktopPosts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="flex justify-center my-14 ">

        <Link
          href={`/${locale}/blog`}
          className="btn-form whitespace-nowrap hover:bg-[#0B3558] z-10 flex items-center gap-1
          "
        >

          {locale === "es"
            ? "Ver todos los artículos"
            : "View all articles"
          }


          <ArrowRight
            className="
              w-5
              h-5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

        </Link>

      </div>
    </section>
  )
}