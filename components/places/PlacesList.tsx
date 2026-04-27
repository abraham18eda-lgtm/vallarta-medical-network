"use client"

import { useEffect, useState } from "react"
import PlaceCard from "@/components/places/PlaceCard"

export default function PlacesList({ initialPlaces }: any) {

  const [places, setPlaces] = useState(initialPlaces)
  const [search, setSearch] = useState("")

  // 🔍 FILTRO EN VIVO
  useEffect(() => {
    if (!search) {
      setPlaces(initialPlaces)
      return
    }

    const filtered = initialPlaces.filter((p: any) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase())
    )

    setPlaces(filtered)
  }, [search, initialPlaces])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* 🔝 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <h1 className="text-2xl font-bold capitalize">
          Lugares disponibles
        </h1>

        {/* 🔍 BUSCADOR */}
        <input
          placeholder="Buscar hospital, clínica..."
          className="border p-3 rounded-xl w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* 📊 CONTADOR */}
      <p className="text-sm text-gray-500">
        {places.length} resultados encontrados
      </p>

      {/* 🏥 GRID */}
      {places.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {places.map((place: any) => (
            <PlaceCard key={place.id} place={place} />
          ))}

        </div>
      ) : (
        <div className="text-center text-gray-400 py-20">
          No se encontraron resultados
        </div>
      )}

    </div>
  )
}