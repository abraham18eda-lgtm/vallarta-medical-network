"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UserRound,
} from "lucide-react"

const items = [
  {
    label: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    href: "/dashboard/pacientes",
    icon: Users,
  },
  {
    label: "Citas",
    href: "/dashboard/citas",
    icon: CalendarDays,
  },
  {
    label: "Perfil",
    href: "/dashboard/perfil",
    icon: UserRound,
  },
]

export default function DashboardBottomBar() {
  const pathname = usePathname()

  return (
    <>
      {/* Espacio para que la barra no tape el contenido */}
      <footer className=" bg-gradient-to-br from-[#0F4C81] to-[#0B3558] text-slate-100 pb-8">

      {/* ─────────── Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-base  text-slate-200 mb-20 md:mb-0">
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 flex justify-between'>
          <div className='order-2 md:order-1'>
            © {new Date().getFullYear()} Vallarta Medical Network. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
