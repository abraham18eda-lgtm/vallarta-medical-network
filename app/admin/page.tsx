import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [
    promoBanner,
    heroSlides,
    blocks,
    posts,
  ] = await Promise.all([
    prisma.promoBanner.findMany(),
    prisma.heroSlide.findMany(),
    prisma.block.findMany(),
    prisma.blog.findMany(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Promo Banners" count={promoBanner.length} />
        <Card title="Hero Slides" count={heroSlides.length} />
        <Card title="Blocks" count={blocks.length} />
        <Card title="Blog Posts" count={posts.length} />
      </div>
    </div>
  )
}

function Card({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  )
}