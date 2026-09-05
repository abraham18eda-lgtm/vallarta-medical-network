// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"
// import { Menu, X, ChevronDown } from "lucide-react"

// interface NavItem {
//   label: string
//   href?: string
//   children?: { href: string; label: string }[]
// }

// export default function NavbarWithDropdowns() {
//   const path = usePathname()
//   const [user, setUser] = useState<any>(null)
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)

//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then(res => res.json())
//       .then(data => setUser(data.user))
//   }, [])

//   const navItems: NavItem[] = [
//     {
//       label: "Bloques",
//       children: [
//         { href: "/admin", label: "Dashboard" },
//         { href: "/admin/navegacion", label: "Navegación" },
//         // { href: "/admin/banners", label: "Home" },
//         { href: "/admin/slides", label: "Carrousel" },
//         { href: "/admin/block-ads", label: "Banners ADS" },
//       ],
//     },
//     {
//       label: "General",
//       children: [
//         { href: "/admin/categories", label: "Categorías" },
//       ],
//     },    
//     {
//       label: "Contenido",
//       children: [
//         { href: "/admin/blog", label: "Blog" },
//         { href: "/admin/magazines", label: "Revistas" },
//       ],
//     },
//     {
//       label: "Doctores",
//       children: [
//         { href: "/admin/doctors", label: "Doctores" },
//         { href: "/admin/listdoctors", label: "Listado" },        
//       ],
//     },
//     {
//       label: "Instituciones",
//         children: [
//         { href: "/admin/places", label: "Hospitales / Clínicas" },
//         { href: "/admin/listplaces", label: "Listado" },
//         { href: "/admin/treatment", label: "Tratamientos" },
//       ],
//     }
//   ]

//   const logout = async () => {
//     await fetch("/api/auth/logout", { method: "POST" })
//     window.location.href = "/login"
//   }

//   const renderLink = (href: string, label: string) => (
//     <Link
//       href={href}
//       className={`block px-4 py-2 whitespace-nowrap rounded-md transition ${
//         path === href
//           ? "bg-blue-600 text-white"
//           : "hover:bg-blue-50 hover:text-blue-600"
//       }`}
//       onClick={() => setMobileOpen(false)}
//     >
//       {label}
//     </Link>
//   )

//   return (
//     <>
//       {/* Navbar */}
//       <header className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16">
//           <Link href="/" className="text-2xl font-bold text-blue-600">
            
//           </Link>

//           {/* Desktop Links */}
//           <nav className="hidden lg:flex gap-4 items-center relative">
//             {navItems.map((item) => (
//               <div key={item.label}
//                 className="relative group"
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 {/* Button */}
//                 <button
//                   onMouseEnter={() => setOpenDropdown(item.label)}
//                   className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
//                 >
//                   {item.label} <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {/* Dropdown */}
//                 {item.children?.length ? (
//                   <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
//                     {item.children.map((child) => (
//                       <Link
//                         key={child.href}
//                         href={child.href}
//                         className="block px-4 py-2 whitespace-nowrap rounded-md transition"
//                       >
//                         {child.label}
//                       </Link>
//                     ))}
//                   </div>
//                 ) : null}
//                 {/* {item.children && (
//                   <div
//                     className={`absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all`}
//                   >
//                     {item.children.map((child) =>
//                       renderLink(child.href, child.label)
//                     )}
//                   </div>
//                 )} */}
                
//               </div>
//             ))}

//             {/* Admin extra */}
//             {user?.role === "ADMIN" && (
//               <Link
//                 href="/admin/users"
//                 className="px-3 py-2 rounded-md text-gray-700 bg-blue-50 hover:bg-blue-100 transition font-medium"
//               >
//                 + Crear Usuario
//               </Link>
//             )}
//           </nav>

//           {/* Mobile Hamburger */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
//             >
//               {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//       <div
//         className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md lg:hidden transform transition-transform duration-300 ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full p-6 space-y-4">
//           <Link href="/" className="text-3xl font-bold text-blue-600 mb-6">
            
//           </Link>

//           <nav className="flex flex-col gap-2">
//             {navItems.map((item) => (
//               <div key={item.label}>
//                 <span className="px-2 py-1 font-semibold text-gray-700">
//                   {item.label}
//                 </span>
//                 <div className="flex flex-col pl-4">
//                   {item.children?.map((child) =>
//                     renderLink(child.href, child.label)
//                   )}
//                 </div>
//               </div>
//             ))}

//             {user?.role === "ADMIN" && (
//               <Link
//                 href="/admin/users"
//                 className="px-3 py-2 rounded-md text-gray-700 bg-blue-50 hover:bg-blue-100 transition font-medium"
//               >
//                 + Crear Usuario
//               </Link>
//             )}
//             <div className="absolute bottom-0 w-full min-h-[50px]">
//                 <button
//                   onClick={logout}
//                   className="w-full text-2xl bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Cerrar sesión
//                 </button>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
Menu,
X,
ChevronDown,
LayoutDashboard,
Layers3,
FolderTree,
FileText,
Stethoscope,
Building2,
LogOut,
Plus,
Navigation,
Images,
Megaphone,
BookOpen,
Users,
List,
Hospital,
Activity,
} from "lucide-react"

interface NavItem {
label: string
href?: string
icon?: any
children?: {
href: string
label: string
icon?: any
}[]
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
icon: Layers3,
children: [
{
href: "/admin",
label: "Dashboard",
icon: LayoutDashboard,
},
{
href: "/admin/navegacion",
label: "Navegación",
icon: Navigation,
},
{
href: "/admin/slides",
label: "Carrousel",
icon: Images,
},
{
href: "/admin/block-ads",
label: "Banners ADS",
icon: Megaphone,
},
],
},

{
  label: "General",
  icon: FolderTree,
  children: [
    {
      href: "/admin/categories",
      label: "Categorías",
      icon: FolderTree,
    },
  ],
},

{
  label: "Contenido",
  icon: FileText,
  children: [
    {
      href: "/admin/blog",
      label: "Blog",
      icon: BookOpen,
    },
    {
      href: "/admin/magazines",
      label: "Revistas",
      icon: FileText,
    },
  ],
},

{
  label: "Doctores",
  icon: Stethoscope,
  children: [
    {
      href: "/admin/doctors",
      label: "Doctores",
      icon: Users,
    },
    {
      href: "/admin/listdoctors",
      label: "Listado",
      icon: List,
    },
  ],
},

{
  label: "Instituciones",
  icon: Building2,
  children: [
    {
      href: "/admin/places",
      label: "Hospitales / Clínicas",
      icon: Hospital,
    },
    {
      href: "/admin/listplaces",
      label: "Listado",
      icon: List,
    },
    {
      href: "/admin/treatment",
      label: "Tratamientos",
      icon: Activity,
    },
  ],
},

]

const logout = async () => {
  await fetch("/api/admin/logout", { method: "POST" })
  window.location.href = "/admin/login"
}

const renderLink = (
href: string,
label: string,
icon?: any
) => {

const Icon = icon

const active =
  path === href ||
  (href !== "/admin" && path.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      onClick={() => setMobileOpen(false)}
      className={`
        group flex items-center gap-3
        rounded-xl px-3 py-2.5
        text-sm font-medium
        transition-all duration-200

        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        }
      `}
    >

      {Icon && (
        <Icon
          className={`
            h-4 w-4 shrink-0
            ${
              active
                ? "text-white"
                : "text-slate-400 group-hover:text-blue-600"
            }
          `}
        />
      )}

      <span>
        {label}
      </span>

    </Link>
  )

  }

  return (
  <>

    {/* =========================================
        DESKTOP SIDEBAR
    ========================================= */}

    <aside className="
      hidden lg:flex
      w-64
      shrink-0
      flex-col
      border-r border-slate-200
      bg-white
    ">

      {/* Logo */}
{/* 
      <div className="border-b border-slate-100 p-5">

        <Link
          href="/admin"
          className="flex items-center gap-3"
        >

          <div className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-600
            to-blue-700
            text-white
            shadow-lg
            shadow-blue-600/20
          ">
            <LayoutDashboard className="h-5 w-5" />
          </div>

          <div>

            <p className="font-bold tracking-tight text-slate-900">
              Medical Center
            </p>

            <p className="text-xs text-slate-400">
              Administración
            </p>

          </div>

        </Link>

      </div> */}


      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <p className="
          mb-3
          px-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-slate-400
        ">
          Menú principal
        </p>


        <nav className="space-y-2">

          {navItems.map(item => {

            const Icon = item.icon

            return (
              <div key={item.label}>

                {/* Category */}

                <div className="
                  flex items-center gap-2
                  px-2 py-1.5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">

                  {Icon && (
                    <Icon className="h-3.5 w-3.5" />
                  )}

                  {item.label}

                </div>


                {/* Links */}

                <div className="mt-1 space-y-1">

                  {item.children?.map(child =>
                    renderLink(
                      child.href,
                      child.label,
                      child.icon
                    )
                  )}

                </div>

              </div>
            )
          })}


          {/* Crear usuario */}

          {user?.role === "ADMIN" && (

            <div className="pt-4">

              <Link
                href="/admin/users"
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-slate-900
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                  shadow-lg
                  shadow-slate-900/10
                  transition
                  hover:bg-blue-700
                "
              >

                <Plus className="h-4 w-4" />

                Crear usuario

              </Link>

            </div>

          )}

        </nav>

      </div>


      {/* Footer */}

      <div className="border-t border-slate-100 p-4">

        <div className="
          rounded-2xl
          bg-slate-50
          p-3
        ">

          <div className="flex items-center gap-3">

            <div className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-blue-100
              text-xs
              font-bold
              text-blue-700
            ">
              A
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-800">
                Administrador
              </p>

              <p className="text-xs text-slate-400">
                Acceso CMS
              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>


    {/* =========================================
        MOBILE BUTTON
    ========================================= */}

    <button
      onClick={() => setMobileOpen(true)}
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-slate-900
        text-white
        shadow-xl
        shadow-slate-900/20
        transition
        hover:bg-blue-700
        lg:hidden
      "
      aria-label="Abrir menú"
    >
      <Menu className="h-6 w-6" />
    </button>


    {/* =========================================
        MOBILE DRAWER
    ========================================= */}

    <div
      className={`
        fixed inset-0 z-[60] lg:hidden
        ${
          mobileOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }
      `}
    >

      {/* Overlay */}

      <div
        onClick={() => setMobileOpen(false)}
        className={`
          absolute inset-0
          bg-slate-950/50
          backdrop-blur-sm
          transition-opacity
          ${
            mobileOpen
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />


      {/* Drawer */}

      <aside
        className={`
          absolute
          left-0 top-0
          h-full
          w-[290px]
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          p-5
        ">

          <div className="flex items-center gap-3">

            <div className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-blue-600
              text-white
            ">
              <LayoutDashboard className="h-5 w-5" />
            </div>

            <div>

              <p className="font-bold text-slate-900">
                Medical Center
              </p>

              <p className="text-xs text-slate-400">
                Administración
              </p>

            </div>

          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="
              rounded-xl
              p-2
              text-slate-500
              hover:bg-slate-100
            "
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {/* Mobile navigation */}

        <div className="h-[calc(100%-150px)] overflow-y-auto p-4">

          <nav className="space-y-4">

            {navItems.map(item => {

              const Icon = item.icon

              return (
                <div key={item.label}>

                  <div className="
                    flex items-center gap-2
                    px-2 py-1.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  ">

                    {Icon && (
                      <Icon className="h-3.5 w-3.5" />
                    )}

                    {item.label}

                  </div>

                  <div className="mt-1 space-y-1">

                    {item.children?.map(child =>
                      renderLink(
                        child.href,
                        child.label,
                        child.icon
                      )
                    )}

                  </div>

                </div>
              )
            })}


            {user?.role === "ADMIN" && (

              <Link
                href="/admin/users"
                onClick={() => setMobileOpen(false)}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-slate-900
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                "
              >

                <Plus className="h-4 w-4" />

                Crear usuario

              </Link>

            )}

          </nav>

        </div>


        {/* Logout */}

        <div className="
          absolute
          bottom-0
          left-0
          right-0
          border-t
          border-slate-100
          bg-white
          p-4
        ">

          <button
            onClick={logout}
            className="
              flex w-full
              items-center justify-center gap-2
              rounded-xl
              bg-red-50
              px-4 py-3
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
            "
          >

            <LogOut className="h-4 w-4" />

            Cerrar sesión

          </button>

        </div>

      </aside>

    </div>

  </>

  )
}