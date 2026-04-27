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

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NavbarDoctoralia() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [show, setShow] = useState(false)

  // 🔥 AUTOCOMPLETE
  useEffect(() => {
    if (!search) {
      setResults([])
      return
    }

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${search}`)
      const data = await res.json()
      setResults(data)
      setShow(true)
    }, 300)

    return () => clearTimeout(delay)
  }, [search])

  const handleSearch = () => {
    if (!search) return
    router.push(`/es/directorio?search=${search}`)
    setShow(false)
  }

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="w-full px-6 py-4 flex justify-end items-center gap-6">

        {/* LOGO */}
        {/* <Link href="/es" className="text-xl font-bold text-blue-600">
          MedFinder
        </Link> */}      
        <div className="flex items-center justify-end gap-4">
            {/* NAV LINKS */}
            <nav className="hidden md:flex gap-6 text-base">
            <Link href="/es/directorio" className="nav-link">Directorio</Link>
            <Link href="/es/hospitales" className="nav-link">Hospitales</Link>
            <Link href="/es/clinicas" className="nav-link">Clínicas</Link>
            <Link href="/es/laboratorios" className="nav-link">Laboratorios</Link>
              <Link href="/es/clinica-dental" className="nav-link">Clinica Dental</Link>
            </nav>
            {/* 🔍 BUSCADOR */}
            <div className="relative flex-1 lg:min-w-[350px] ">

            <input
                placeholder="Doctor, especialidad..."
                className="w-full p-3 border rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShow(true)}
            />

            {/* DROPDOWN */}
            {show && results.length > 0 && (
                <div className="absolute w-full bg-white shadow-xl rounded-xl mt-2 z-50 max-h-60 overflow-auto">

                {results.map((item: any) => (
                    <div
                    key={item.id}
                    onClick={() => {
                        router.push(`/es/directorio?search=${item.name}`)
                        setShow(false)
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                    {item.name}
                    <span className="text-xs text-gray-400 ml-2">
                        {item.type}
                    </span>
                    </div>
                ))}

                </div>
            )}

            {/* BOTÓN */}
            <button
                onClick={handleSearch}
                className="absolute right-1 top-1 bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
                Buscar
            </button>

            </div>
        </div>    
      </div>
    </header>
  )
}