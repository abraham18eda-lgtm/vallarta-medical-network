import Link from "next/link"

import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col">
        <Header />
        <Sidebar />
        <main className="p-6">{children}</main>
      </div>

    </div>
  )
}