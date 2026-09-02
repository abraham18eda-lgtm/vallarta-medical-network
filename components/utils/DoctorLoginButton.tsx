"use client"

import Link from "next/link"
import { UserRound, ChevronDown } from "lucide-react"
import AuthModal from "@/components/ui/AuthModal"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function DoctorLoginButton({
  session,
  variant = "header",
}: any) {

  const t = useTranslations("portal")

  const [open, setOpen] = useState(false)

  /*
  =========================================
  FOOTER
  =========================================
  */

  if (variant === "footer") {

    /*
    =====================================
    USUARIO LOGEADO
    =====================================
    */

    if (session) {

      return (

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-sm
            p-6
          "
        >

          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {t("footer.title")}
          </h3>


          <p
            className="
              mt-2
              text-slate-300
            "
          >
            {t("footer.loggedTitle")}
          </p>


          <Link
            href="/dashboard"
            className="
              inline-block
              mt-5
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#0F4C81]
              transition
              hover:bg-sky-100
            "
          >
            {t("footer.dashboard")}
          </Link>

        </div>

      )

    }


    /*
    =====================================
    USUARIO NO LOGEADO
    =====================================
    */

    return (

      <>

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-sm
            p-6
          "
        >

          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {t("footer.title")}
          </h3>


          <p
            className="
              mt-2
              text-slate-300
            "
          >
            {t("footer.description")}
          </p>


          <button
            onClick={() => setOpen(true)}
            className="
              mt-5
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#0F4C81]
              transition
              hover:bg-sky-100
            "
          >
            {t("footer.btn-portal")}
          </button>

        </div>


        {open && (

          <AuthModal
            onClose={() => setOpen(false)}
          />

        )}

      </>

    )

  }


  /*
  =========================================
  HEADER
  =========================================
  */

  return (

    <div className="relative">

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

        {/* AVATAR */}

        <div
          className="
            relative
            w-12
            h-12
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

          {session?.image ? (

            <img
              src={session.image}
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

          <div
            className="
              absolute
              bottom-0
              right-0
              w-4
              h-4
              rounded-full
              bg-green-500
              border-2
              border-white
            "
          />

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


      {open && (

        <AuthModal
          onClose={() => setOpen(false)}
        />

      )}

    </div>

  )
}
