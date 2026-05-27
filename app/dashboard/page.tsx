
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

import CreateDoctorCard from "@/components/dashboard/CreateDoctorCard"
import IncompleteProfile from "@/components/dashboard/IncompleteProfile"
import DoctorDashboard from "@/components/dashboard/DoctorDashboard"

export default async function DashboardPage() {
  const cookieStore = await cookies()  
  const token = cookieStore.get("token")?.value

  const user = token ? await verifyToken(token) : null
  console.log("TOKEN PAYLOAD:", user)
  // if (!user || user.role !== "DOCTOR") {
  //   return <div className="p-10">No autorizado</div>
  // }
  if (!user) {
    return <div className="p-10">No autorizado</div>
  }

  const doctor = await prisma.doctor.findFirst({
    where: { userId: Number(user.id) }
  })

  // SI NO EXISTE PERFIL
  if (!doctor) {
    return <CreateDoctorCard />
  }

  // SI NO HA COMPLETADO
  if (!doctor.isActive) {
    return <IncompleteProfile doctor={doctor} />
  }

  // DASHBOARD NORMAL
  return <DoctorDashboard doctor={doctor} />
}

