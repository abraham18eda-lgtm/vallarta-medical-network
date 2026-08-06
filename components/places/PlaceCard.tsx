"use client"
import { Star, MapPin, BadgeCheck, ArrowUpRight } from 'lucide-react'

export default function PlaceCard({ place }: any) {
  const hasImage = !!place.image;

  const backgrounds = {
    Hospital: "bg-gradient-to-br from-sky-500 to-blue-700",
    Clinica: "bg-gradient-to-br from-emerald-500 to-teal-700",
    Laboratorio: "bg-gradient-to-br from-violet-500 to-indigo-700",
    Doctor: "bg-gradient-to-br from-cyan-500 to-sky-700",
  };
  
  return (

    <a href={`/es/${place.type.toLowerCase()}/${place.slug}`}
        className="mt-3 flex gap-2 rounded-xl py-0 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 active:scale-95">
      <div className="group glass-soft rounded-[28px] overflow-hidden transition-all duration-300        hover:-translate-y-1 hover-shadow-sky w-full">       
        {/* IMAGEN */}
          <div
            className="relative overflow-hidden w-full h-56">
              {hasImage ? (
                <img
                  src={place.image || "/hospital.jpg"}
                  alt={place.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"/>
                
               ) : (    
                 <div className="w-full h-full bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-5xl font-bold tracking-tight">
                    {place.name.charAt(0)}
                  </span>
                </div>
              )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent                 to-transparent"/> {/* tipo */}
              <span
                className="absolute top-4 left-4 rounded-full bg-white/40 backdrop-blur-md
                  px-3 py-1 text-xs font-semibold text-blue-700">
                {place.type}
              </span>
          </div>

          {/* INFO */}
          <div
            className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                {place.name}
              </h3>
              <p
                className="flex mt-2 text-sm text-slate-500 justiry-center items-center gap-1">
                <MapPin className="h-4 w-4 text-slate-500" />
                { place.city || "Ubicación no disponible"}
              </p>
            </div>

            {/* DOCTORES */}

            <div
              className="
                flex
                items-center
                justify-between
                text-sm
              "
            >

              <span
                className="
                  text-base
                  text-gradient-primary
                  
                "
              >
                Especialistas
              </span>


              <span
                className="
                  font-semibold
                  text-slate-700
                "
              >
                {place.doctors?.length || 0}
              </span>
            </div>



            {/* BUTTON */}       
            <div>
              Ver perfil
              <span
                className="
                  text-sky-500
                  transition
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </div>
          </div>      
      </div>
    </a>
  )
}
