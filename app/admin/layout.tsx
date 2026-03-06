import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500">
            Vallarta Medical Network
          </p>
        </div>

        <nav className="p-4 space-y-2 text-sm font-medium">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Dashboard
          </Link>

          <Link href="/admin/banners" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Banners
          </Link>

          <Link href="/admin/slides" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Slides
          </Link>

          <Link href="/admin/block-ads" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Block Ads
          </Link>

          <Link href="/admin/blog" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Blog Posts
          </Link>

          <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Ver Sitio
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}