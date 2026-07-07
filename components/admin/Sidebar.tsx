// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function Sidebar() {
//   const path = usePathname()
//   const [user, setUser] = useState<any>(null)
  
//   const link = (href: string, label: string) => (
//     <Link
//       href={href}
//       className={`block px-4 rounded-lg transition ${
//         path === href
//           ? "bg-blue-600 text-white"
//           : "text-gray-700 hover:bg-gray-100"
//       }`}
//     >
//       {label}
//     </Link>
//   )
//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then(res => res.json())
//       .then(data => setUser(data.user))
//       console.log("USER TOKEN:", user)
//   }, [])
//   const logout = async () => {
//     await fetch("/api/auth/logout", { method: "POST" })
//     window.location.href = "/login"
//   }

//   const navItems = [
//   {
//     title: "General",
//     items: [
//       { href: "/admin", label: "Dashboard" },
//       { href: "/admin/navegacion", label: "Navbar" },
//       { href: "/admin/banners", label: "Home" },
//       { href: "/admin/slides", label: "Carrousel" },
//       { href: "/admin/block-ads", label: "Bloque ADS" },
//     ],
//   },
//   {
//     title: "Contenido",
//     items: [
//       { href: "/admin/blog", label: "Blog" },
//     ],
//   },
//   {
//     title: "Doctores",
//     items: [
//       { href: "/admin/doctors", label: "Doctores" },
//       { href: "/admin/listdoctors", label: "Listado" },
//       { href: "/admin/categories", label: "Categorías de Doctor" },
//     ],
//   },
//   {
//     title: "Ubicaciones",
//     items: [
//       { href: "/admin/places", label: "Hospitales / Clínicas" },
//       { href: "/admin/listplaces", label: "Listado" },
//       { href: "/admin/treatment", label: "Tratamientos" },
//     ],
//   },
// ]

//   return (
//     <aside className="w-64 bg-white border-r p-4 space-y-6">

//       <h2 className="text-xl font-bold text-blue-800">
//         Admin Panel
//       </h2>

//       <nav className="space-y-6">
//         {navItems.map((group) => (
//           <div key={group.title}>
            
//             {/* Título de categoría */}
//             <p className="text-xs uppercase text-gray-700 font-bold">
//               {group.title}
//             </p>

//             {/* Links */}
//             <div className="">
//               {group.items.map((item) => (
//                 <div key={item.href}>
//                   {link(item.href, item.label)}
//                 </div>
//               ))}
//             </div>

//           </div>
//         ))}
//          {/* 🔥 SOLO ADMIN */}
//         {user?.role === "ADMIN" && (
//           <div>
//             Usuarios
//             <a
//               href="/admin/users"
//              className="block px-4 rounded-lg transition "
//             >
//               + Crear Usuario
//             </a>
//           </div>
//         )}    
        
//       </nav>

//     </aside>
//   )
// }


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

interface NavItem {
  label: string
  href?: string
  children?: { href: string; label: string }[]
}

export default function NavbarWithDropdowns() {
  const path = usePathname()
  const [user, setUser] = useState<any>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  const navItems: NavItem[] = [
    {
      label: "Bloques",
      children: [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/navegacion", label: "Navegación" },
        // { href: "/admin/banners", label: "Home" },
        { href: "/admin/slides", label: "Carrousel" },
        { href: "/admin/block-ads", label: "Banners ADS" },
      ],
    },
    {
      label: "General",
      children: [
        { href: "/admin/categories", label: "Categorías" },
      ],
    },    
    {
      label: "Contenido",
      children: [
        { href: "/admin/blog", label: "Blog" },
      ],
    },
    {
      label: "Doctores",
      children: [
        { href: "/admin/doctors", label: "Doctores" },
        { href: "/admin/listdoctors", label: "Listado" },        
      ],
    },
    {
      label: "Instituciones",
        children: [
        { href: "/admin/places", label: "Hospitales / Clínicas" },
        { href: "/admin/listplaces", label: "Listado" },
        { href: "/admin/treatment", label: "Tratamientos" },
      ],
    }
  ]

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  const renderLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`block px-4 py-2 whitespace-nowrap rounded-md transition ${
        path === href
          ? "bg-blue-600 text-white"
          : "hover:bg-blue-50 hover:text-blue-600"
      }`}
      onClick={() => setMobileOpen(false)}
    >
      {label}
    </Link>
  )

  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex gap-4 items-center relative">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {/* Button */}
                <button
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  {item.label} <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                {item.children?.length ? (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 whitespace-nowrap rounded-md transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
                {/* {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all`}
                  >
                    {item.children.map((child) =>
                      renderLink(child.href, child.label)
                    )}
                  </div>
                )} */}
                
              </div>
            ))}

            {/* Admin extra */}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin/users"
                className="px-3 py-2 rounded-md text-gray-700 bg-blue-50 hover:bg-blue-100 transition font-medium"
              >
                + Crear Usuario
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-4">
          <Link href="/" className="text-3xl font-bold text-blue-600 mb-6">
            
          </Link>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <span className="px-2 py-1 font-semibold text-gray-700">
                  {item.label}
                </span>
                <div className="flex flex-col pl-4">
                  {item.children?.map((child) =>
                    renderLink(child.href, child.label)
                  )}
                </div>
              </div>
            ))}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin/users"
                className="px-3 py-2 rounded-md text-gray-700 bg-blue-50 hover:bg-blue-100 transition font-medium"
              >
                + Crear Usuario
              </Link>
            )}
            <div className="absolute bottom-0 w-full min-h-[50px]">
                <button
                  onClick={logout}
                  className="w-full text-2xl bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}