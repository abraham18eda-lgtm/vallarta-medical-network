import { BlogCard } from "./BlogCard"

interface Props {
  posts: any[]
  title?: string
}

export function BlogGrid({ posts, title }: Props) {
  if (!posts?.length) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}