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

            {/* <UserRound size={24} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48">
              <path d="M0 0h48v48H0z" fill="none" />
              <g fill="none" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M23 42H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v11.5" />
                <path strokeLinejoin="round" d="M36.636 27C39.046 27 41 28.88 41 31.2c0 3.02-2.91 5.6-4.364 7Q35.182 39.6 33 41q-2.182-1.4-3.636-2.8C27.909 36.8 25 34.22 25 31.2c0-2.32 1.954-4.2 4.364-4.2c1.517 0 2.854.746 3.636 1.878A4.4 4.4 0 0 1 36.636 27Z" />
                <path strokeLinecap="round" d="M15 14h16" />
              </g>
            </svg>

            <span className="text-[11px] font-medium">
              Directorio
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

            {/* <Bell size={24} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48">
              <path d="M0 0h48v48H0z" fill="none" />
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M4.08 18.222L18.222 4.08L26 11.858L11.858 26zm2.828 0l4.95 4.95l11.314-11.314l-4.95-4.95z" />
                <path d="m11.858 23.172l11.314-11.314l17.677 17.678a8 8 0 1 1-11.313 11.313zm2.828 0L30.95 39.435a6 6 0 1 0 8.485-8.485L23.172 14.686z" />
                <path d="m19.636 23.879l7.778-7.779l12.021 12.021l-7.778 7.779zm2.829 0l9.192 9.192l4.95-4.95l-9.193-9.192zM8.322 13.98l7.425 7.424l-1.414 1.414l-7.425-7.425zm3.536-3.536l7.424 7.424l-1.414 1.415l-7.424-7.425zm3.535-3.536l7.425 7.425l-1.414 1.414l-7.425-7.425z" />
                <path d="M25.602 32.231c-.639.64-1.028 1.21-1.128 1.51l-1.898-.633c.254-.76.925-1.604 1.612-2.29c.712-.713 1.593-1.407 2.425-1.823l.895 1.788c-.582.291-1.292.835-1.906 1.448" />
              </g>
            </svg>
            <span className="text-[11px] font-medium">
              Especialistas
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
              {/* <Home size={28} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 640 640">
                <path d="M0 0h640v640H0z" fill="none" />
                <path fill="currentColor" d="M341.8 72.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S82.8 336 96 336h16v176c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64V336h16c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1zM288 312c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v40h40c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-40v40c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-40h-40c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h40z" />
              </svg>
            </div>

            <span className="text-[11px] font-medium text-gray-700 mt-1">
              Home
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
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1.75 10.75a9 9 0 1 0 18 0a9 9 0 1 0-18 0m15.5 6.5l5 5" />
                <path d="M12.768 8.732h2.441v4.037h-2.44v2.44H8.731v-2.44h-2.44V8.732h2.44V6.291h4.037z" />
              </g>
            </svg> */}

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
                    onClick={() => setShowMenu(false)} // cierra menú al hacer click
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

            </div>

          </div>

        </div>
      )}

    </>
  )
}