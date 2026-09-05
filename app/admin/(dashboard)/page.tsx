import { prisma } from "@/lib/prisma"


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