import Link from "next/link"

export function BlogFeatured({ posts }: { posts: any[] }) {
  if (!posts?.length) return null

  const featured = posts.slice(0, 3)

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Artículos destacados
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl overflow-hidden border bg-background hover:shadow-xl transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform"
            />

            <div className="p-6 space-y-3">
              <span className="text-xs font-medium text-primary">
                {post.category?.name} ·{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>

              <h3 className="text-2xl font-bold leading-tight">
                {post.title}
              </h3>

              <p className="text-muted-foreground">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-block font-medium text-primary"
              >
                Leer artículo →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}