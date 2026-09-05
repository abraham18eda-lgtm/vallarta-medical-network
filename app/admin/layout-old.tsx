import Link from "next/link"

import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({ children }: any) {
  return (
    // <div className="flex min-h-screen bg-gray-50">

    //   {/* <Sidebar /> */}

    //   <div className="flex-1 flex flex-col">
    //     <Header />
    //     <Sidebar />
    //     <main className="p-6">{children}</main>
    //   </div>

    // </div>
    <div className="min-h-screen bg-slate-100">
     {/* Header desktop */}
      <Header />

      <div className="flex min-h-[calc(100vh-73px)]">

        {/* Navegación */}
        <Sidebar />

        {/* Contenido */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  )
}