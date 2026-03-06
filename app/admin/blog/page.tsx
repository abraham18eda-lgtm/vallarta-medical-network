import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminBlogPage() {
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>

        <Link
          href="/admin/blog/new"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Nuevo Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3">Locale</th>
              <th className="p-3">Activo</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-t">
                <td className="p-3 font-medium">
                  {post.title}
                </td>
                <td className="p-3 text-center">
                  {post.locale}
                </td>
                <td className="p-3 text-center">
                  {post.isActive ? "✅" : "⛔"}
                </td>
                <td className="p-3 text-center space-x-3">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-blue-600 underline"
                  >
                    Ver
                  </Link>

                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-primary underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}