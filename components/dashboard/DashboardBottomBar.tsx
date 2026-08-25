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
      <div className="h-40 md:hidden" />

    </>
  )
}
