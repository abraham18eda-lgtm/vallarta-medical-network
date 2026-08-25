import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import CreateDoctorCard from "@/components/dashboard/CreateDoctorCard"
import IncompleteProfile from "@/components/dashboard/IncompleteProfile"
import DoctorDashboard from "@/components/dashboard/DoctorDashboard"
import { getDoctorAnalytics } from "@/lib/dashboard/doctorAnalytics"

export default async function DashboardPage() {

  const cookieStore = await cookies()

  const token =
    cookieStore.get("token")?.value

  const user =
    token
      ? await verifyToken(token)
      : null

  if (!user) {
    return (
      <div className="p-10">
        No autorizado
      </div>
    )
  }

  const doctor =
    await prisma.doctor.findFirst({
      where: {
        userId: Number(user.id)
      }
    })

  // NO EXISTE PERFIL

  if (!doctor) {
    return <CreateDoctorCard />
  }

  // PERFIL INCOMPLETO

  if (!doctor.isActive) {
    return (
      <IncompleteProfile
        doctor={doctor}
      />
    )
  }

  // ANALYTICS

  const stats =
    await getDoctorAnalytics(doctor.id)

  // console.log(
  //   "📊 DASHBOARD STATS:",
  //   stats
  // )

  // DASHBOARD

  return (
    <DoctorDashboard
      doctor={doctor}
      stats={stats}
    />
  )
}
