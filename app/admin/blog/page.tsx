// export const dynamic = "force-dynamic"

// import Link from "next/link"
// import { prisma } from "@/lib/prisma"

// export default async function AdminBlogPage() {
//   const posts = await prisma.blog.findMany({
//     orderBy: { createdAt: "desc" },
//   })

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog</h1>

//         <Link
//           href="/admin/blog/new"
//           className="bg-primary text-white px-4 py-2 rounded-lg"
//         >
//           + Nuevo Blog
//         </Link>
//       </div>

//       <div className="bg-white rounded-xl border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Título</th>
//               <th className="p-3">Locale</th>
//               <th className="p-3">Activo</th>
//               <th className="p-3">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {posts.map(post => (
//               <tr key={post.id} className="border-t">
//                 <td className="p-3 font-medium">
//                   {post.title}
//                 </td>
//                 <td className="p-3 text-center">
//                   {post.locale}
//                 </td>
//                 <td className="p-3 text-center">
//                   {post.isActive ? "✅" : "⛔"}
//                 </td>
//                 <td className="p-3 text-center space-x-3">
//                   <Link
//                     href={`/admin/blog/${post.id}`}
//                     className="text-blue-600 underline"
//                   >
//                     Ver
//                   </Link>

//                   <Link
//                     href={`/admin/blog/${post.id}/edit`}
//                     className="text-primary underline"
//                   >
//                     Editar
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/prisma"

interface Props {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

export default async function AdminBlogPage({
  searchParams
}: Props) {

  const params = await searchParams

  // =========================
  // PAGINACION
  // =========================
  const currentPage =
    Number(params.page) || 1

  const limit = 10

  const skip =
    (currentPage - 1) * limit

  // =========================
  // BUSQUEDA
  // =========================
  const search =
    params.search || ""

  // =========================
  // QUERY
  // =========================
  const where = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive" as const
            }
          },
          {
            excerpt: {
              contains: search,
              mode: "insensitive" as const
            }
          }
        ]
      }
    : {}

  // =========================
  // POSTS
  // =========================
  const posts =
    await prisma.blog.findMany({

      where,

      orderBy: {
        createdAt: "desc"
      },

      skip,
      take: limit
    })

  // =========================
  // TOTAL
  // =========================
  const totalPosts =
    await prisma.blog.count({
      where
    })

  const totalPages =
    Math.ceil(
      totalPosts / limit
    )

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Blog
          </h1>

          <p className="text-gray-500 mt-1">
            Administración de artículos
          </p>

        </div>

        <Link
          href="/admin/blog/new"
          className="
            bg-blue-600 hover:bg-blue-700
            text-white px-5 py-3
            rounded-2xl
            shadow-sm
            transition
            text-sm font-medium
          "
        >
          + Nuevo Blog
        </Link>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-6">

        <form className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Buscar blogs..."
              className="
                w-full
                border border-gray-200
                rounded-2xl
                px-5 py-3
                pl-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

          </div>

          <button
            type="submit"
            className="
              bg-gray-900 hover:bg-black
              text-white
              px-6 py-3
              rounded-2xl
              transition
              font-medium
            "
          >
            Buscar
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {/* TOP */}
        <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between">

          <div>

            <h2 className="font-semibold text-gray-800">
              Listado de Blogs
            </h2>

            <p className="text-sm text-gray-500">
              {totalPosts} artículos encontrados
            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-white border-b">

              <tr className="text-left text-gray-500">

                <th className="px-6 py-4">
                  Blog
                </th>

                <th className="px-6 py-4 text-center">
                  Idioma
                </th>

                <th className="px-6 py-4 text-center">
                  Estado
                </th>

                <th className="px-6 py-4 text-center">
                  Fecha
                </th>

                <th className="px-6 py-4 text-right">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {posts.map((post) => (

                <tr
                  key={post.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* BLOG */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      {/* IMAGE */}
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border">

                        {post.image ? (

                          <img
                            src={post.image}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            Sin imagen
                          </div>

                        )}

                      </div>

                      {/* INFO */}
                      <div>

                        <p className="font-semibold text-gray-800 line-clamp-1">
                          {post.title}
                        </p>

                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 max-w-md">
                          {post.excerpt}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* LOCALE */}
                  <td className="px-6 py-4 text-center">

                    <span className="
                      bg-blue-50
                      text-blue-700
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-medium
                    ">
                      {post.locale}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">

                    {post.isActive ? (

                      <span className="
                        bg-green-50
                        text-green-700
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        Activo
                      </span>

                    ) : (

                      <span className="
                        bg-red-50
                        text-red-700
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        Inactivo
                      </span>

                    )}

                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-center text-gray-500 text-sm">

                    {new Date(
                      post.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="
                          flex items-center justify-center w-8 h-8 rounded-full
                          bg-gray-50 text-gray-600 font-medium
                          hover:bg-gray-100 hover:text-gray-700
                          transition-colors duration-200
                        "
                      >
                       <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      </Link>

                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="
                          flex items-center justify-center w-8 h-8 rounded-full
                          bg-blue-50 text-blue-600 font-medium
                          hover:bg-blue-100 hover:text-blue-700
                          transition-colors duration-200
                        "
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </Link>

                      {/* Eliminar */}
      

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}
        {posts.length === 0 && (

          <div className="py-20 text-center">

            <p className="text-gray-400">
              No se encontraron blogs
            </p>

          </div>

        )}

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (

        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">

          {Array.from({
            length: totalPages
          }).map((_, index) => {

            const page =
              index + 1

            const isActive =
              currentPage === page

            return (

              <Link
                key={page}
                href={`/admin/blog?page=${page}&search=${search}`}
                className={`
                  w-11 h-11
                  flex items-center justify-center
                  rounded-2xl
                  text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                {page}
              </Link>

            )
          })}

        </div>

      )}

    </div>
  )
}