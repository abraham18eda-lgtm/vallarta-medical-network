import { BlogCard } from "./BlogCard"

interface Props {
  posts: any[]
  locale: string
  title?: string
}

export function BlogGrid({ posts, locale, title }: Props) {
  if (!posts?.length) return null

    const mobilePosts = posts.slice(0, 2)
    const desktopPosts = posts.slice(0, 4)

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
    </section>
  )
}