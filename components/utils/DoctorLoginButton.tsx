"use client"

import Link from "next/link"
import Image from "next/image"
import { UserRound, ChevronDown } from "lucide-react"
import AuthModal from "@/components/ui/AuthModal"

// import { useSession } from "next-auth/react"

export default function DoctorLoginButton({
  open,
  setOpen,
  session
}: any) {

  // const { data: session } = useSession()

  return (

    <div className="relative">

      {/* BOTON PERFIL */}
      <button
        onClick={() => setOpen(true)}
        className="
            group
            relative
            w-12
            h-12
            rounded-full
            bg-white
            border
            border-gray-200
            hover:border-blue-300
            hover:shadow-lg
            transition-all
            flex
            items-center
            justify-center
        "
      >

        {/* FOTO / ICONO */}
        <div
          className="
            relative
            w-10
            h-10
            rounded-full
            overflow-hidden
            bg-gradient-to-br
            from-blue-50
            to-blue-100
            border
            border-blue-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >

          {session?.user?.image ? (

            <img
              src={session.user.image}
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

          {/* BADGE ONLINE */}
          <div
            className="
              absolute
              bottom-0
              right-0
              w-3.5
              h-3.5
              rounded-full
              bg-green-500
              border-2
              border-white
            "
          />

        </div>

        {/* TEXTO */}
        <div className="hidden lg:block text-left">

          {session ? (

            <>
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                  leading-none
                "
              >
                {/* {session.user.name || "Doctor"} */}
              </p>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                Panel médico
              </p>
            </>

          ) : (

            <>
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                  leading-none
                "
              >
                Doctores
              </p>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                Ingresar o registrarse
              </p>
            </>

          )}

        </div>

        {/* FLECHA */}
        <ChevronDown
          className="
            w-4
            h-4
            text-gray-400
            group-hover:text-blue-600
            transition
            hidden
            lg:block
          "
        />

      </button>

      {/* MODAL LOGIN */}
      {open && (
        <AuthModal
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  )
}