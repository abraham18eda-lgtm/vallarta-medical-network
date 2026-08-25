import Link from "next/link"
import React from "react";
import DoctorAnalyticsChart from "./DoctorAnalyticsChart"


import {
  Eye,
  MousePointerClick,
  MessageSquare,
  Star
} from "lucide-react"

export default function DoctorDashboard({ doctor, stats }: any) {
    return (

    <div
      className="
        p-6
        md:p-10
        space-y-8
      "
    >

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-blue-600
          via-blue-500
          to-cyan-400
          p-8
          text-white
          shadow-xl
        "
      >

        {/* BG DECORATION */}
        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-white/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-6
          "
        >

          {/* FOTO */}
          <div
            className="
              w-80
              h-auto
              md:w-40
              md:h-40
              rounded-3xl
              overflow-hidden
              border-4
              border-white/30
              shadow-2xl
              bg-white/20
              backdrop-blur
              shrink-0
            "
          >

            {doctor.image ? (

              <img
                src={doctor.image}
                alt={doctor.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            ) : (

              <div
                className="
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  text-4xl
                  font-bold
                "
              >
                {doctor.name?.charAt(0)}
              </div>
            )}

          </div>

          {/* INFO */}
          <div className="space-y-3">

            <div>

              <p
                className="
                  text-blue-100
                  text-sm
                  uppercase
                  tracking-widest
                "
              >
                Panel Médico
              </p>

              <h1
                className="
                  text-3xl
                  md:text-5xl
                  font-black
                  mt-2
                "
              >
                Bienvenido Dr. {doctor.name}
              </h1>

            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              <div
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/20
                  backdrop-blur
                  text-sm
                "
              >
                📍 {doctor.city || "Ciudad no definida"}
              </div>

              <div
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-green-400/20
                  text-sm
                "
              >
                ✔ Perfil activo
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {/* VISITAS */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            border
            hover:shadow-xl
            transition
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <Eye
              className="
                w-6
                h-6
                text-blue-600
              "
            />

          </div>

          <p className="text-gray-500 text-sm">
            Visitas perfil
          </p>

          <h2 className="text-3xl font-black mt-2">
             {stats?.profileViews ?? 0}
          </h2>

        </div>

        {/* CLICKS */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            border
            hover:shadow-xl
            transition
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-violet-100
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <MousePointerClick
              className="
                w-6
                h-6
                text-violet-600
              "
            />

          </div>

          <p className="text-gray-500 text-sm">
            Clicks WhatsApp
          </p>

          <h2 className="text-3xl font-black mt-2">
             {stats?.whatsappClicks ?? 0}
          </h2>

        </div>

        {/* CONTACTOS */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            border
            hover:shadow-xl
            transition
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-emerald-100
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <MessageSquare
              className="
                w-6
                h-6
                text-emerald-600
              "
            />

          </div>

          <p className="text-gray-500 text-sm">
            Contactos
          </p>

          <h2 className="text-3xl font-black mt-2">
            {stats?.contactForms ?? 0}
          </h2>

        </div>

        {/* SEARCH */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            border
            hover:shadow-xl
            transition
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            🔎
          </div>

          <p className="text-gray-500 text-sm">
            Encontrado en búsquedas
          </p>

          <h2 className="text-3xl font-black mt-2">
            {stats?.searches ?? 0}
          </h2>
        </div>        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoctorAnalyticsChart
          data={stats?.chart ?? []}
        />
        <div
          className="
            bg-white
            rounded-3xl
            border
            p-6
            md:p-8
          "
        >

          <div className="mb-6">

            <h2 className="text-xl font-bold">
              Principales búsquedas
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Términos utilizados en el directorio
            </p>

          </div>


          <div className="space-y-4">

            {stats?.topSearches?.length ? (

              stats.topSearches.map(
                (
                  item: {
                    query: string
                    total: number
                  },
                  index: number
                ) => (

                  <div
                    key={item.query}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-2xl
                      bg-slate-50
                      px-4
                      py-3
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-cyan-100
                          text-sm
                          font-bold
                          text-cyan-700
                        "
                      >
                        {index + 1}
                      </div>

                      <span className="font-medium text-slate-700">
                        {item.query}
                      </span>

                    </div>


                    <span
                      className="
                        rounded-full
                        bg-white
                        px-3
                        py-1
                        text-sm
                        font-bold
                        text-slate-600
                      "
                    >
                      {item.total}
                    </span>

                  </div>

                )
              )

            ) : (

              <p className="text-sm text-slate-400">
                Todavía no hay búsquedas registradas.
              </p>

            )}

          </div>

        </div>
            
      </div>    
  

    </div>
  )
   
}