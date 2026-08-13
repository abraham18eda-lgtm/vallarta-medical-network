import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Calendar } from "lucide-react"
import BlogViewCounter from "@/components/blog/BlogViewCounter"

import { getPost, getPopularPosts, getRelatedPosts, getAdjacentPosts, getFeaturedPosts } from "@/lib/blog"

export default async function BlogDetail({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "es" | "en"
  }>
}) {
  const { slug, locale } = await params

  const post = await getPost(slug, locale)

  if (!post) return notFound()
    
  // Tiempo de lectura
  const plainText = post.content.replace(/<[^>]+>/g, "")

  const readingTime = Math.max(
    1,
    Math.ceil(plainText.split(/\s+/).length / 200)
  )

  // Botones Siguiente / Atras 
  const relatedPosts = await getRelatedPosts(
    post.categoryId,
    locale,
    post.id
  )

  const { previous, next } = await getAdjacentPosts(
    locale,
    post.createdAt,
    post.id
  )

const featuredPosts = await getFeaturedPosts(locale)

  // Posts destacados
  // const popularPosts = await getPopularPosts(locale)

  // const featuredPosts = popularPosts.filter(
  //   (item) => item.slug !== post.slug
  // )

  return (
    
    <section className="py-14">
      <BlogViewCounter slug={post.slug} />
      <div className="max-w-7xl mx-auto px-8">

        {/* ---------------- Breadcrumb ---------------- */}

        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-12">

          <Link
            href={`/${locale}`}
            className="hover:text-primary transition-colors"
          >
            {locale === "es" ? "Inicio" : "Home"}
          </Link>

          <ChevronRight className="w-4 h-4" />

          <Link
            href={`/${locale}/blog`}
            className="hover:text-primary transition-colors"
          >
            Blog
          </Link>

          <ChevronRight className="w-4 h-4" />

          <span className="text-foreground truncate text-base">
            {post.title}
          </span>

        </nav>

        {/* ---------------- Layout ---------------- */}

        <div className="grid lg:grid-cols-12 gap-16">

          {/* =======================================================
              CONTENIDO
          ======================================================= */}

          <main className="lg:col-span-8">

            {/* Fecha */}

            <div className="flex items-center gap-2 text-slate-600 font-medium">

              <Calendar className="w-4 h-4" />

              {new Date(post.createdAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}

            </div>

            {/* Categoría */}

            {/* {post.category && (

              <span
                className="
                  inline-flex
                  mt-6
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

            {/* Título */}

            <h1
              className="
                mt-2
                text-2xl
                md:text-4xl
                font-bold
                leading-tight
                text-sky-800
              "
            >
              {post.title}
            </h1>

            {/* Excerpt */}

            <p
              className="
                mt-6
                text-lg
                leading-9
                text-muted-foreground
              "
            >
              {post.excerpt}
            </p>

            {/* Meta */}

            {/* <div className="flex gap-6 text-sm text-muted-foreground">

              <span>
                👁 {post.views.toLocaleString()}{" "}
                {locale === "es" ? "vistas" : "views"}
              </span>

              <span>
                ⏱ {readingTime}{" "}
                {locale === "es"
                  ? "min de lectura"
                  : "min read"}
              </span>

            </div> */}

            {/* Imagen */}

            <div className="mt-2">

              <Image
                src={post.image}
                alt={post.title}
                width={1600}
                height={900}
                priority
                className="
                  w-full
                  rounded-3xl
                  object-cover
                  shadow-xl
                "
              />

            </div>

            {/* Contenido */}

            <div
              className="
                prose
                prose-lg
                dark:prose-invert
                max-w-none
                mt-14
                prose-headings:font-bold
                prose-img:rounded-xl
                prose-a:text-primary
              "
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />

            {/* Footer */}

            <div className="mt-16 pt-10 border-t border-slate-200">
              {/* VOLVER AL BLOG */}
              <div className="mb-12">
                <Link
                  href={`/${locale}/blog`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-primary
                    hover:underline
                    transition
                  "
                >
                  ← {locale === "es"
                    ? "Volver al blog"
                    : "Back to blog"}
                </Link>
              </div>


              {/* ARTÍCULOS RELACIONADOS */}
              {relatedPosts.length > 0 && (
                <section className="mb-14">

                  <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    {locale === "es"
                      ? "También te puede interesar"
                      : "You may also like"}
                  </h2>


                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {relatedPosts.map((related) => {

                      const relatedData = related

                      return (
                        <Link
                          key={related.id}
                          href={`/${locale}/blog/${related.slug}`}
                          className="
                            group
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            hover:shadow-lg
                            transition-all
                            duration-300
                          "
                        >

                          {/* IMAGE */}
                          {relatedData.image && (
                            <div className="relative h-48 overflow-hidden">

                              <img
                                src={relatedData.image}
                                alt={relatedData.title}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                "
                              />

                            </div>
                          )}


                          {/* CONTENT */}
                          <div className="p-5">

                            {relatedData.category && (
                              <span
                                className="
                                  inline-block
                                  mb-2
                                  rounded-full
                                  bg-blue-50
                                  px-3
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-blue-700
                                "
                              >
                                {relatedData.category.name}
                              </span>
                            )}


                            <h3
                              className="
                                text-lg
                                font-bold
                                text-slate-800
                                line-clamp-2
                                group-hover:text-primary
                                transition-colors
                              "
                            >
                              {relatedData.title}
                            </h3>


                            {relatedData.excerpt && (
                              <p
                                className="
                                  mt-2
                                  text-sm
                                  text-slate-500
                                  line-clamp-2
                                "
                              >
                                {relatedData.excerpt}
                              </p>
                            )}

                          </div>

                        </Link>
                      )
                    })}

                  </div>

                </section>
              )}


              {/* ANTERIOR / SIGUIENTE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ANTERIOR */}
                {previous ? (
                  <Link
                    href={`/${locale}/blog/${previous.slug}`}
                    className="
                      group
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      hover:border-primary/40
                      hover:shadow-md
                      transition
                    "
                  >

                    <span className="text-sm text-slate-500">
                      ← {locale === "es"
                        ? "Artículo anterior"
                        : "Previous article"}
                    </span>

                    <h3
                      className="
                        mt-2
                        font-semibold
                        text-slate-800
                        group-hover:text-primary
                        transition
                      "
                    >
                      {previous.title}
                    </h3>

                  </Link>
                ) : (
                  <div />
                )}


                {/* SIGUIENTE */}
                {next ? (
                  <Link
                    href={`/${locale}/blog/${next.slug}`}
                    className="
                      group
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      text-right
                      hover:border-primary/40
                      hover:shadow-md
                      transition
                    "
                  >

                    <span className="text-sm text-slate-500">
                      {locale === "es"
                        ? "Siguiente artículo"
                        : "Next article"} →
                    </span>

                    <h3
                      className="
                        mt-2
                        font-semibold
                        text-slate-800
                        group-hover:text-primary
                        transition
                      "
                    >
                      {next.title}
                    </h3>

                  </Link>
                ) : (
                  <div />
                )}

              </div>

            </div>   
            {/* <div
              className="
                mt-16
                pt-8
                border-t
              "
            >

              <Link
                href={`/${locale}/blog`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  font-medium
                  text-primary
                  hover:underline
                "
              >
                ← {locale === "es"
                  ? "Volver al blog"
                  : "Back to blog"}
              </Link>

            </div> */}

          </main>

          {/* =======================================================
              SIDEBAR
          ======================================================= */}

          <aside className="lg:col-span-4 hidden md:block">

            <div
              className="
                sticky
                top-24
              "
            >

              <div
                className="
                  rounded-3xl
                  border
                  bg-card
                  p-6
                "
              >

                <h2 className="text-gradient-second text-xl font-bold mb-8">

                  {locale === "es"
                    ? "Artículos destacados"
                    : "Featured articles"}

                </h2>

                <div className="space-y-6">

                  {featuredPosts.map((item) => (

                    <Link
                      key={item.id}
                      href={`/${locale}/blog/${item.slug}`}
                      className="
                        group
                        flex
                        gap-4
                      "
                    >

                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={90}
                        className="
                          w-28
                          h-24
                          rounded-xl
                          object-cover
                          shrink-0
                        "
                      />

                      <div>
                        <div className="flex gap-1">
                          <Calendar className="w-4 h-4" />
                          <p className="text-xs text-muted-foreground">

                            {new Date(item.createdAt).toLocaleDateString(locale)}

                          </p>
                        </div>

                        <h3
                          className="
                            mt-2
                            font-semibold
                            leading-6
                            group-hover:text-primary
                            transition-colors
                            line-clamp-2
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-2
                            text-sm
                            text-muted-foreground
                            line-clamp-2
                          "
                        >
                          {item.excerpt}
                        </p>

                      </div>

                    </Link>

                  ))}

                </div>

              </div>

            </div>

          </aside>

        </div>       

      </div>

    </section>
  )
}