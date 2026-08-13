import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CalendarDays } from "lucide-react";

export default async function ViewPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    
    const { id } = await params
    const numericId = Number(id)
    
    if (isNaN(numericId)) {
        return notFound()
    }
  
    const post = await prisma.blog.findUnique({
        where: { id: numericId },
         include: { category: true, },
    })

    if (!post) return notFound()

    return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* REGRESAR */}
        <div className="mb-6">
          <Link
            href="/admin/blog"
            className="
              inline-flex
              items-center
              gap-2
              text-base
              font-medium
              text-slate-600
          
              hover:text-sky-700
              hover:font-semibold
              transition
            "
          >
            ← Regresar a blogs
          </Link>
        </div>


        {/* CARD PRINCIPAL */}
        <article
          className="
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-xl
            border
            border-slate-200
          "
        >

          {/* IMAGEN */}
          {post.image && (
            <div className="relative w-full h-[280px] md:h-[420px]">

              <img
                src={post.image}
                alt={post.title}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            </div>
          )}


          {/* CONTENIDO */}
          <div className="p-6 md:p-10">

            {/* METADATA */}
            <div className="flex flex-wrap items-center gap-2 mb-5">

              {post.category && (
                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-blue-50
                    text-blue-700
                    text-xs
                    font-semibold
                  "
                >
                  {post.category.name}
                </span>
              )}


              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    post.locale === "es"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }
                `}
              >
                {post.locale === "es" ? "ES" : "EN"}
              </span>


              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    post.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {post.isActive ? "Activo" : "Inactivo"}
              </span>


              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    post.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {post.published ? "Publicado" : "Borrador"}
              </span>


              {post.featured && (
                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-amber-100
                    text-amber-700
                    text-xs
                    font-semibold
                  "
                >
                  ★ Destacado
                </span>
              )}

            </div>


            {/* TITULO */}
            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
                leading-tight
                text-slate-900
              "
            >
              {post.title}
            </h1>


            {/* FECHA / VISTAS */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-4
                text-sm
                text-slate-500
              "
            >
              <div className="flex items-center">
                 <CalendarDays className="w-4 h-4 text-slate-700" /> {"  "}
                <span>
                    {post.createdAt.toLocaleDateString()}
                </span>
              </div>
              <span>
                👁 {post.views} vistas
              </span>
            </div>


            {/* EXCERPT */}
            {post.excerpt && (
              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-slate-50
                  border
                  border-slate-100
                  p-5
                "
              >
                <p
                  className="
                    text-lg
                    leading-relaxed
                    text-slate-600
                    italic
                  "
                >
                  {post.excerpt}
                </p>
              </div>
            )}


            {/* CONTENIDO */}
            <div className="mt-10">

              <div
                className="
                  prose
                  prose-slate
                  max-w-none
                  prose-headings:font-bold
                  prose-a:text-primary
                  prose-img:rounded-2xl
                "
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />

            </div>

          </div>

        </article>


        {/* BOTÓN REGRESAR INFERIOR */}
        <div className="mt-6">

          <Link
            href="/admin/blog"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              border
              border-slate-200
              px-5
              py-3
              text-sm
              font-medium
              text-slate-700
              hover:bg-slate-50
              transition
            "
          >
            ← Regresar a blogs
          </Link>

        </div>

      </div>

    </div>
  )
}