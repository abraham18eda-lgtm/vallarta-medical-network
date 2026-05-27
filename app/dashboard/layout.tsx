import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"

import DashboardTopbar from "@/components/dashboard/DashboardTopbar"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token)
    : null

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
      "
    >

      <DashboardTopbar user={user} />

      <main>
        {children}
      </main>

    </div>
  )
}