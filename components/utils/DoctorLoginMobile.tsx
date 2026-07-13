"use client"

import { UserRound } from "lucide-react"
import AuthModal from "@/components/ui/AuthModal"

export default function DoctorLoginButton({
  open,
  setOpen,
  session
}: any) {

  const firstName = session?.user?.name?.split(" ")[0]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          group
          flex
          flex-col
          items-center
          justify-center
          gap-1

          rounded-2xl
          py-2

          text-slate-500

          transition-all
          duration-200

          hover:text-blue-600
          hover:bg-slate-100/70

          active:scale-95
        "
      >

        {/* ICONO */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
          "
        >

          {session?.user?.image ? (

            <img
              src={session.user.image}
              alt={session.user.name ?? "Usuario"}
              className="
                h-6
                w-6
                rounded-full
                object-cover
                border
                border-slate-200
              "
            />

          ) : (

            <UserRound
              size={23}
              strokeWidth={2}
              className="
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
              "
            />

          )}

          {/* STATUS */}
          {session && (
            <span
              className="
                absolute
                bottom-0
                right-0

                h-2
                w-2

                rounded-full

                bg-emerald-500

                border
                border-white
              "
            />
          )}

        </div>


        {/* TEXTO */}
        <span
          className="
            max-w-[55px]
            truncate

            text-[10px]
            font-semibold
            tracking-wide
            uppercase
          "
        >
          {firstName ?? "Login"}
        </span>


      </button>


      {open && (
        <AuthModal
          onClose={() => setOpen(false)}
        />
      )}

    </>
  )
}