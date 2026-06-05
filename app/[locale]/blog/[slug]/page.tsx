import { notFound } from "next/navigation"
import { getPostAndIncrementViews } from "@/lib/blog"


export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  console.log("PARAMS:", { slug, locale })

  if (!slug) return notFound()

  const post = await getPostAndIncrementViews(slug)

  if (!post) return notFound()


  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover rounded-2xl mb-10"
      />

      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-sm text-muted-foreground mb-10">
        {post.category?.name} ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}