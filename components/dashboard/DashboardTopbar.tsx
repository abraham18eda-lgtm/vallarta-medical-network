"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import {
  UserRound,
  ChevronDown,
  LogOut
} from "lucide-react"

export default function DashboardTopbar({
  user
}: any) {

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const timeoutRef = useRef<any>(null)

  // =========================
  // AUTO LOGOUT
  // =========================

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

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {

    await fetch("/api/logout", {
      method: "POST"
    })

    window.location.href = "/"
  }

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

          <h1
            className="
              font-bold
              text-xl
            "
          >
            Panel Médico
          </h1>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <button
            onClick={() => setOpen(prev => !prev)}
            className="
              flex
              items-center
              gap-3
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
                Dr. {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                Cuenta activa
              </p>

            </div>

            <ChevronDown
              className="
                w-4
                h-4
                text-gray-500
              "
            />

          </button>

          {/* MENU */}
          {open && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-60
                bg-white
                rounded-2xl
                border
                shadow-xl
                overflow-hidden
              "
            >

              <div className="p-4 border-b">

                <p className="font-semibold">
                  Dr. {user?.name}
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

                  Cerrar sesión

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}