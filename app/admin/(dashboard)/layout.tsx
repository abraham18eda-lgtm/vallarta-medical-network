import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="flex min-h-[calc(100vh-73px)]">

        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  )
}
