"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar({
  locale = "es"
}: {
  locale?: string
}) {

  const router = useRouter()

  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [items, setItems] = useState<any[]>([])


  // const handleSearch = () => {
  //   router.push(`/buscar?query=${query}&city=${city}`)
  // }

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
    <div className="">
      {/* SEARCH MOBILE */}
        <div className="p-2 relative">
          <input
            placeholder="Doctor, especialidad..."
            className="w-full h-12 border border-gray-200 rounded-2xl px-4 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShow(true)}
          />
          <button
            onClick={handleSearch}
            className="absolute top-[14px] md:top-0 right-4 h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium"
          >
            Buscar
          </button>
        </div>
        {/* <div className="flex justify-center">
          <p>Quiero ser un mienbro, Registarme! </p>
        </div> */}
    </div>
  )
}