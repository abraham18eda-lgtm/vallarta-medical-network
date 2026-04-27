import { prisma } from "@/lib/prisma"

// export default async function AdminDashboard() {
//   const [
//     promoBanner,
//     heroSlides,
//     blocks,
//     posts,
//   ] = await Promise.all([
//     prisma.promoBanner.findMany(),
//     prisma.heroSlide.findMany(),
//     prisma.block.findMany(),
//     prisma.blog.findMany(),
//   ])

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       <div className="grid grid-cols-4 gap-6">
//         <Card title="Promo Banners" count={promoBanner.length} />
//         <Card title="Hero Slides" count={heroSlides.length} />
//         <Card title="Blocks" count={blocks.length} />
//         <Card title="Blog Posts" count={posts.length} />
//       </div>
//     </div>
//   )
// }

// function Card({ title, count }: { title: string; count: number }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm border">
//       <h2 className="text-gray-500 text-sm">{title}</h2>
//       <p className="text-3xl font-bold mt-2">{count}</p>
//     </div>
//   )
// }

export default async function AdminDashboard() {

  const [doctors, places,blog, users] = await Promise.all([
    prisma.doctor.count(),
    prisma.place.count(),
    prisma.blog.count(),
  
    prisma.user.count()
  ])

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Card title="Doctores" value={doctors} />
        <Card title="Lugares" value={places} />
        <Card title="Blog" value={blog} />
        <Card title="Usuarios" value={users} />

      </div>

    </div>
  )
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}