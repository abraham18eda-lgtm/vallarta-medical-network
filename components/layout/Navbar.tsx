// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function NavbarPro() {
//   const router = useRouter()

//   const [categories, setCategories] = useState<any[]>([])
//   const [category, setCategory] = useState("")
//   const [city, setCity] = useState("")

//   useEffect(() => {
//     fetch("/api/categories/tree")
//       .then(res => res.json())
//       .then(data => {
//         const especialidades = data.find(
//           (c: any) => c.slug === "especialidades"
//         )
//         setCategories(especialidades?.children || [])
//       })
//   }, [])

//   const handleSearch = () => {
//     const params = new URLSearchParams()

//     if (category) params.set("category", category)
//     if (city) params.set("city", city)

//     router.push(`/es/directorio?${params.toString()}`)
//   }

//   return (
//     <header className="bg-white shadow-sm border-b sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4">

//         {/* TOP NAV */}
//         <div className="flex items-center justify-between">

//           <Link href="/es" className="text-xl font-bold text-blue-600">
//             MedFinder
//           </Link>

//           <nav className="hidden md:flex gap-6 text-sm">
//             <Link href="/es/directorio" className="nav-link">
//               Doctores
//             </Link>
//             <Link href="/es/hospitales" className="nav-link">
//               Hospitales
//             </Link>
//             <Link href="/es/clinicas" className="nav-link">
//               Clínicas
//             </Link>
//             <Link href="/es/laboratorios" className="nav-link">
//               Laboratorios
//             </Link>
//           </nav>

//           <button className="md:hidden text-xl">☰</button>
//         </div>

//         {/* 🔍 BUSCADOR PRO */}
//         <div className="bg-gray-50 border rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-sm">

//           {/* ESPECIALIDAD */}
//           <select
//             className="flex-1 p-3 rounded-xl bg-white border outline-none"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Especialidad</option>

//             {categories.map((cat: any) => (
//               <option key={cat.id} value={cat.slug}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* CIUDAD */}
//           {/* <input
//             placeholder="Ciudad (ej: Guadalajara)"
//             className="flex-1 p-3 rounded-xl bg-white border outline-none"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           /> */}

//           {/* BOTÓN */}
//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition"
//           >
//             Buscar
//           </button>

//         </div>

//       </div>
//     </header>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { prisma } from "@/lib/prisma"

// export default function NavbarDoctoralia({
//   locale = "es"
// }: {
//   locale?: string
// }) {

//   const items = await prisma.navigationItem.findMany({
//     where: {
//       locale,
//       isActive: true
//     },
//     orderBy: {
//       order: "asc"
//     }
//   })
//   const router = useRouter()

//   const [search, setSearch] = useState("")
//   const [results, setResults] = useState<any[]>([])
//   const [show, setShow] = useState(false)

//   const places = await prisma.place.findMany({
//     where: {
//       isActive: true,
//       showInNavbar: true,
//       locale: "es"
//     },
//     orderBy: {
//       navbarOrder: "asc"
//     }
//   })

//   // 🔥 AUTOCOMPLETE
//   useEffect(() => {
//     if (!search) {
//       setResults([])
//       return
//     }

//     const delay = setTimeout(async () => {
//       const res = await fetch(`/api/search?q=${search}`)
//       const data = await res.json()
//       setResults(data)
//       setShow(true)
//     }, 300)

//     return () => clearTimeout(delay)
//   }, [search])

//   const handleSearch = () => {
//     if (!search) return
//     router.push(`/es/directorio?search=${search}`)
//     setShow(false)
//   }
  

//   return (
//     <header className="bg-white border-b shadow-sm sticky top-0 z-50">

//       <div className="w-full px-6 py-4 flex justify-end items-center gap-6">

//         {/* LOGO */}
//         {/* <Link href="/es" className="text-xl font-bold text-blue-600">
//           MedFinder
//         </Link> */}      
//         <div className="flex items-center justify-end gap-4">
//             {/* NAV LINKS */}
//              <nav className="hidden md:flex gap-6 text-base">
//               {items.map((item) => (
//                 <Link
//                   key={item.id}
//                   href={item.url}
//                   className="nav-link"
//                 >
//                   {item.title}
//                 </Link>
//               ))}

//             </nav>
//             {/* <nav className="hidden md:flex gap-6 text-base">
//             <Link href="/es/directorio" className="nav-link">Directorio</Link>
//             <Link href="/es/hospitales" className="nav-link">Hospitales</Link>
//             <Link href="/es/clinicas" className="nav-link">Clínicas</Link>
//             <Link href="/es/laboratorios" className="nav-link">Laboratorios</Link>
//               <Link href="/es/clinica-dental" className="nav-link">Clinica Dental</Link>
//             </nav> */}
//             {/* 🔍 BUSCADOR */}
//             <div className="relative flex-1 lg:min-w-[350px] ">

//             <input
//                 placeholder="Doctor, especialidad..."
//                 className="w-full p-3 border rounded-xl"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onFocus={() => setShow(true)}
//             />

//             {/* DROPDOWN */}
//             {show && results.length > 0 && (
//                 <div className="absolute w-full bg-white shadow-xl rounded-xl mt-2 z-50 max-h-60 overflow-auto">

//                 {results.map((item: any) => (
//                     <div
//                     key={item.id}
//                     onClick={() => {
//                         router.push(`/es/directorio?search=${item.name}`)
//                         setShow(false)
//                     }}
//                     className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
//                     >
//                     {item.name}
//                     <span className="text-xs text-gray-400 ml-2">
//                         {item.type}
//                     </span>
//                     </div>
//                 ))}

//                 </div>
//             )}

//             {/* BOTÓN */}
//             <button
//                 onClick={handleSearch}
//                 className="absolute right-1 top-1 bg-blue-600 text-white px-4 py-2 rounded-xl"
//             >
//                 Buscar
//             </button>

//             </div>
//         </div>    
//       </div>
//     </header>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import DoctorLoginButton from "../utils/DoctorLoginButton"
import AuthModal from "@/components/ui/AuthModal"
import { UserRound } from "lucide-react"


const logo = { image: "/logos/logo-vallarta-medical-network.png", alt: "Vallarta Meical Network"}

export default function NavbarDoctoralia({
  locale = "es"
}: {
  locale?: string
}) {

  const router = useRouter()

  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  
  // NUEVO: estado para abrir/cerrar menú móvil
  const [isOpen, setIsOpen] = useState(false)
  
  // =========================
  // NAVBAR ITEMS
  // =========================
  useEffect(() => {

    const loadNavbar = async () => {
      try {
        const res = await fetch(
          `/api/navigation?locale=${locale}`
        )
        const data = await res.json()
        setItems(data || [])
      } catch (error) {
        console.error("Error loading navbar:", error)
      }
    }

    loadNavbar()
  }, [locale])

  // =========================
  // AUTOCOMPLETE
  // =========================
  useEffect(() => {
    if (!search) {
      setResults([])
      return
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${search}`)
        const data = await res.json()
        setResults(data)
        setShow(true)
      } catch (error) {
        console.error(error)
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [search])

  // =========================
  // SEARCH
  // =========================
  const handleSearch = () => {
    if (!search) return
    router.push(`/${locale}/directorio?search=${search}`)
    setShow(false)
  }

  return (
    <header className="relative bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="w-full px-2 py-2 flex items-center justify-between gap-6">
          {/* SEARCH MOBILE */}
          <div className="relative md:hidden">
          {/* Icono */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none">
                  <path d="M16 7.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m5.5 10.25a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0" />
                  <path
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeWidth="2"
                    d="M10.5 15H8a5 5 0 0 0-5 5v1h7.55M16 7.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm4.498 13L22 22m-.5-4.25a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0Z"
                  />
                </g>
              </svg>
            </div>

          {/* Input */}
            <input
              placeholder="Doctor, especialidad..."
              className="w-full text-sm h-10 border border-gray-200 rounded-2xl pl-8 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShow(true)}
            />

            {/* Botón */}
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1 h-8 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium flex items-center justify-center"
            >
              Buscar
            </button>
          </div>
          {/* <div className="relative px-2 ">
            <input
              placeholder="Doctor, especialidad..."
              className="w-full text-sm h-10 border border-gray-200 rounded-2xl px-4 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShow(true)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1 h-8 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium flex items-center justify-center "
            >
              Buscar
            </button>
          </div> */}
        {/* LOGO */}
        {/* <Link href="/" className="md:hidden">
            <div className="relative h-[60px] lg:h-[100px] w-[200px] flex justify-center">
              <Image
                src={logo.image}
                alt={logo.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link> */}
        

        <div className="flex items-center gap-6">

          {/* NAV LINKS (desktop) */}
          <nav className="hidden md:flex gap-8 text-base">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="relative text-gray-700 hover:text-blue-600 transition font-medium
                           after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all
                           hover:after:w-full"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* SEARCH (desktop) */}
          <div className="relative w-full md:w-[350px] hidden md:block">
            <input
              placeholder="Doctor, especialidad..."
              className="w-full h-12 border border-gray-200 rounded-2xl px-4 pr-28 outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShow(true)}
            />
            {show && results.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                {results.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(`/${locale}/directorio?search=${item.name}`)
                      setShow(false)
                    }}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.type}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium"
            >
              Buscar
            </button>
          </div>

          {/* (mobile) */}
          <div className="grid grid-cols-2 flex justify-center px-2 gap-2 md:hidden">
            <div className="md:hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M21.41 8.64v-.05a10 10 0 0 0-18.78 0s0 0 0 .05a9.86 9.86 0 0 0 0 6.72v.05a10 10 0 0 0 18.78 0s0 0 0-.05a9.86 9.86 0 0 0 0-6.72M4.26 14a7.8 7.8 0 0 1 0-4h1.86a16.7 16.7 0 0 0 0 4Zm.82 2h1.4a12 12 0 0 0 1 2.57A8 8 0 0 1 5.08 16m1.4-8h-1.4a8 8 0 0 1 2.37-2.57A12 12 0 0 0 6.48 8M11 19.7A6.34 6.34 0 0 1 8.57 16H11Zm0-5.7H8.14a14.4 14.4 0 0 1 0-4H11Zm0-6H8.57A6.34 6.34 0 0 1 11 4.3Zm7.92 0h-1.4a12 12 0 0 0-1-2.57A8 8 0 0 1 18.92 8M13 4.3A6.34 6.34 0 0 1 15.43 8H13Zm0 15.4V16h2.43A6.34 6.34 0 0 1 13 19.7m2.86-5.7H13v-4h2.86a14.4 14.4 0 0 1 0 4m.69 4.57a12 12 0 0 0 1-2.57h1.4a8 8 0 0 1-2.4 2.57M19.74 14h-1.86a16 16 0 0 0 .12-2a16 16 0 0 0-.12-2h1.86a7.8 7.8 0 0 1 0 4" />
              </svg>EN
            </div> 
             <DoctorLoginButton
                open={open}
                setOpen={setOpen}
                // session={session}
              />
          </div>

        </div>
      </div> 
    </header>
  )
}