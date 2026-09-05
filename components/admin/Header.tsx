"use client"
import { ShieldCheck, LogOut, LayoutDashboard } from "lucide-react"

export default function Header() {

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  // return (
  //   <header className="hidden lg:flex bg-white border-b px-6 py-4 justify-between items-center shadow-md">
  //     <h1 className="font-semibold text-lg">
  //       Panel de administración
  //     </h1>

  //     <button
  //       onClick={logout}
  //       className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
  //     >
  //       Cerrar sesión
  //     </button>
  //   </header>
  //   )

  return (
<header className="sticky top-0 z-50 hidden lg:flex h-[73px] items-center justify-between border-b border-slate-200 bg-white/95 px-8 shadow-sm backdrop-blur">

  {/* Brand */}

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20">
      <LayoutDashboard className="h-5 w-5" />
    </div>

    <div>
      <h1 className="text-sm font-bold tracking-tight text-slate-900">
        Medical Center
      </h1>

      <p className="text-xs text-slate-500">
        Panel de administración
      </p>
    </div>

  </div>


  {/* Right */}

  <div className="flex items-center gap-5">

    {/* Security status */}

    <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">

      <span className="h-2 w-2 rounded-full bg-emerald-500" />

      <span className="text-xs font-medium text-emerald-700">
        Sesión segura
      </span>

    </div>


    {/* Divider */}

    <div className="h-8 w-px bg-slate-200" />


    {/* User */}

    <div className="flex items-center gap-3">

      <div className="hidden xl:block text-right">

        <p className="text-sm font-semibold text-slate-800">
          Administrador
        </p>

        <p className="text-xs text-slate-500">
          CMS
        </p>

      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white shadow">
        A
      </div>

    </div>


    {/* Logout */}

    <button
      onClick={logout}
      className="
        group
        flex items-center gap-2
        rounded-xl
        border border-slate-200
        bg-white
        px-4 py-2
        text-sm font-medium
        text-slate-600
        shadow-sm
        transition-all
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
      "
    >
      <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />

      Cerrar sesión
    </button>

  </div>

</header>

)
}