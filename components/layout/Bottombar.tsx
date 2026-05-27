"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation"
import {
  Home,
  Search,
  UserRound,
  Bell,
  Menu,
  X
} from "lucide-react"

// 🔥 IMPORTA TU SEARCHBAR
import SearchBarDoctors from "@/components/utils/SearchBar"

export default function MobileBottomBar({
  locale = "es"
}: {
  locale?: string
}) {
   const router = useRouter()

   const [search, setSearch] = useState("")
   const [results, setResults] = useState<any[]>([])
   const [show, setShow] = useState(false)
   const [items, setItems] = useState<any[]>([])

   const [showSearch, setShowSearch] =
    useState(false)

   const [showMenu, setShowMenu] =
      useState(false)

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
    <>

      {/* ===================================== */}
      {/* BOTTOM BAR */}
      {/* ===================================== */}
      <div
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          w-full
          h-20
          bg-white/95
          backdrop-blur-xl
          border-t
          border-gray-200
          z-[999]
          px-2
          shadow-[0_-5px_25px_rgba(0,0,0,0.08)]
        "
      >

        <div className="grid grid-cols-5 h-full">

          {/* DIRECTORIO */}
          <Link
            href={`/${locale}/directorio`}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-gray-600
              hover:text-blue-600
              transition
            "
          >

            <UserRound size={24} />

            <span className="text-[11px] font-medium">
              Doctores
            </span>

          </Link>

          {/* SEARCH */}
          <button
            onClick={() => setShowSearch(true)}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-gray-600
              hover:text-blue-600
              transition
            "
          >

            <Search size={24} />

            <span className="text-[11px] font-medium">
              Buscar
            </span>

          </button>

          {/* HOME */}
          <Link
            href={`/${locale}`}
            className="
              -mt-8
              flex
              flex-col
              items-center
              justify-center
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-xl
                border-4
                border-white
              "
            >
              <Home size={28} />
            </div>

            <span className="text-[11px] font-medium text-gray-700 mt-1">
              Home
            </span>

          </Link>

          {/* PENDIENTE */}
          <button
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-gray-600
              hover:text-blue-600
              transition
            "
          >

            <Bell size={24} />

            <span className="text-[11px] font-medium">
              Alerts
            </span>

          </button>

          {/* MENU */}
          <button
            onClick={() => setShowMenu(true)}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-gray-600
              hover:text-blue-600
              transition
            "
          >

            <Menu size={24} />

            <span className="text-[11px] font-medium">
              Menu
            </span>

          </button>

        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH OFFCANVAS */}
      {/* ===================================== */}
      {showSearch && (

        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm">

          <div
            className="
              absolute
              bottom-0
              left-0
              w-full
              bg-white
              rounded-t-[30px]
              p-5
              animate-in
              slide-in-from-bottom
              duration-300
              min-h-[45vh]
            "
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-bold text-gray-800">
                Buscar Doctores
              </h2>

              <button
                onClick={() => setShowSearch(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={22} />
              </button>

            </div>

            {/* 🔥 TU SEARCHBAR */}
            <SearchBarDoctors />

          </div>

        </div>
      )}

      {/* ===================================== */}
      {/* MENU OFFCANVAS */}
      {/* ===================================== */}
      {showMenu && (

        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm">

          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-[85%]
              bg-white
              shadow-2xl
              p-6
              animate-in
              slide-in-from-right
              duration-300
            "
          >

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-bold text-gray-800">
                Menu
              </h2>

              <button
                onClick={() => setShowMenu(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-5">
              {/* MENU MOBILE */}
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="text-base capitalize text-gray-700 hover:text-blue-600 font-medium transition "
                    onClick={() => setIsOpen(false)} // cierra menú al hacer click
                  >
                    {item.title}
                  </Link>
                ))}
               </div>
                <div className="border-t border-gray-200 "></div>
                {/* SEARCH MOBILE */}
                <div className="py-4 relative  ">
                  <input
                    placeholder="Doctor, especialidad..."
                    className="w-full text-base h-14 border border-gray-200 rounded-2xl px-4 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShow(true)}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-4 top-6 h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium flex items-center justify-center "
                  >
                    Buscar
                  </button>
                </div>
              {/* <Link
                href={`/${locale}/directorio`}
                className="block text-lg font-medium text-gray-700"
              >
                Directorio
              </Link> */}

              {/* <Link
                href={`/${locale}/hospitales`}
                className="block text-lg font-medium text-gray-700"
              >
                Hospitales
              </Link> */}

              {/* <Link
                href={`/${locale}/clinicas`}
                className="block text-lg font-medium text-gray-700"
              >
                Clínicas
              </Link> */}

              {/* <Link
                href={`/${locale}/blog`}
                className="block text-lg font-medium text-gray-700"
              >
                Blog
              </Link> */}

            </div>

          </div>

        </div>
      )}

    </>
  )
}