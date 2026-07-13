import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { getDoctorByUserId } from "@/lib/doctors"

import DashboardTopbar from "@/components/dashboard/DashboardTopbar"
import BottonBar from "@/components/layout/Bottombar";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token) as AuthUser
    : null

  const doctor = user?.id
    ? await getDoctorByUserId(user.id)
    : null

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
      "
    >

      <DashboardTopbar user={user} doctor={doctor}/>

      <main>
        {children}
      </main>
      
      {/* Bottom bar */}
      <div className="block md:hidden">
        <BottonBar />
      </div>

    </div>
  )
}