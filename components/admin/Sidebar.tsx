"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const path = usePathname()
  const [user, setUser] = useState<any>(null)
  
  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`block px-4 rounded-lg transition ${
        path === href
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  )
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
      console.log("USER TOKEN:", user)
  }, [])
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  const navItems = [
  {
    title: "General",
    items: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/banners", label: "Home" },
      { href: "/admin/slides", label: "Carrousel" },
      { href: "/admin/block-ads", label: "Bloque ADS" },
    ],
  },
  {
    title: "Contenido",
    items: [
      { href: "/admin/blog", label: "Blog" },
    ],
  },
  {
    title: "Doctores",
    items: [
      { href: "/admin/doctors", label: "Doctores" },
      { href: "/admin/categories", label: "Categorías de Doctor" },
    ],
  },
  {
    title: "Ubicaciones",
    items: [
      { href: "/admin/places", label: "Hospitales / Clínicas" },
    ],
  },
]

  return (
    <aside className="w-64 bg-white border-r p-4 space-y-6">

      <h2 className="text-xl font-bold text-blue-800">
        Admin Panel
      </h2>

      <nav className="space-y-6">
        {navItems.map((group) => (
          <div key={group.title}>
            
            {/* Título de categoría */}
            <p className="text-xs uppercase text-gray-700 font-bold">
              {group.title}
            </p>

            {/* Links */}
            <div className="">
              {group.items.map((item) => (
                <div key={item.href}>
                  {link(item.href, item.label)}
                </div>
              ))}
            </div>

          </div>
        ))}
         {/* 🔥 SOLO ADMIN */}
        {user?.role === "ADMIN" && (
          <div>
            Usuarios
            <a
              href="/admin/users"
             className="block px-4 rounded-lg transition "
            >
              + Crear Usuario
            </a>
          </div>
        )}    
        
      </nav>

    </aside>
  )
}