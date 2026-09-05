"use client"

import Link from "next/link"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import {
  UserRound,
  ChevronDown,
  LogOut,
  ArrowLeft,
  Undo2
} from "lucide-react"

interface DashboardTopbarProps {
  user: any
  doctor: any
  locale: "es" | "en"
  texts: {
    medicalPanel: string
    activeAccount: string
    logout: string
    doctor: string
    backHome: string
  }
}

export default function DashboardTopbar({
  user,
  doctor,
  texts,
  locale
}: any) {

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<any>(null)
  
  // AUTO LOGOUT

  useEffect(() => {

    const resetTimer = () => {

      clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(async () => {

        await logout()

      }, 1000 * 60 * 10)
    }

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keydown", resetTimer)
    window.addEventListener("click", resetTimer)

    resetTimer()

    return () => {

      clearTimeout(timeoutRef.current)

      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("keydown", resetTimer)
      window.removeEventListener("click", resetTimer)
    }

  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }

    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      )
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }

  }, [open])


  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Error cerrando sesión:", error)
    } finally {
      window.location.href = "/"
    }
  }


  const doctorTitle =
    doctor?.gender === "MUJER"
      ? "Dra. "
      : doctor?.gender === "HOMBRE"
        ? "Dr. "
        : ""

  const doctorName =
    doctor?.name ||
    user?.name ||
    user?.email?.split("@")[0] ||
    texts.doctor
    


  // console.log(user)
  return (

    <header
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur
        border-b
      "
    >

      <div
        className="
          h-16
          px-6
          flex
          items-center
          justify-between
        "
      >

        {/* LEFT */}
        <div>

          <Link
            href={`/${locale}`}
            className="
              flex
              items-center
              gap-2
              text-slate-600
              hover:text-blue-600
              transition
              font-medium
            "
          >
            <Undo2  className="w-6 h-6" />

            <span>
               {texts.backHome}
            </span>
          </Link>


        </div>

        {/* RIGHT */}
        <div  ref={menuRef} className="relative">

          <button
            onClick={() => setOpen(prev => !prev)}
            className="
              flex
              items-center
              gap-1
              hover:bg-gray-50
              px-2
              py-2
              rounded-full
              transition
            "
          >

            {/* AVATAR */}
            <div
              className="
                relative
                w-11
                h-11
                rounded-full
                overflow-hidden
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >

              {user?.image ? (

                <img
                  src={user.image}
                  alt="Doctor"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                <UserRound
                  className="
                    w-5
                    h-5
                    text-blue-600
                  "
                />

              )}

              {/* ONLINE */}
              <div
                className="
                  absolute
                  bottom-0
                  right-0
                  w-3
                  h-3
                  rounded-full
                  bg-green-500
                  border-2
                  border-white
                "
              />

            </div>

            {/* INFO */}
            <div className="hidden md:block text-left">

              <p className="font-semibold text-sm">                
                {doctorTitle} {doctorName}
              </p>

              <p className="text-xs text-gray-500">
                {texts.activeAccount}
              </p>

            </div>

            {/* <ChevronDown
              className="
                w-4
                h-4
                text-gray-500
              "
            /> */}
            <ChevronDown
              className={`
                w-4
                h-4
                text-slate-400

                transition-transform
                duration-300

                ${open ? "rotate-180 text-blue-600" : ""}
              `}
            />

          </button>

          {/* MENU */}
          {open && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-72
                rounded-3xl
                border
                border-slate-200
                bg-white/95
                backdrop-blur-xl
                shadow-[0_20px_50px_rgba(15,23,42,0.15)]
                overflow-hidden
                animate-in
                fade-in
                zoom-in-95
                duration-200
              "
            >

              <div className="p-4 border-b">

                <p className="font-semibold text-base text-black">
                {/* Dr. {doctor?.name || user?.email?.split("@")[0] || "Doctor"} */}
                  {doctorTitle}
                  {doctorName}
                </p>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

              </div>

              <div className="p-2">

                <button
                  onClick={logout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-red-50
                    text-red-600
                    transition
                  "
                >

                  <LogOut className="w-4 h-4" />

                  {texts.logout}

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}