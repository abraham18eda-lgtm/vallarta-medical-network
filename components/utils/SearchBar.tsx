"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")

  const handleSearch = () => {
    router.push(`/buscar?query=${query}&city=${city}`)
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex gap-3 max-w-3xl mx-auto">
      <input
        placeholder="Especialidad (ej. cardiología)"
        className="flex-1 outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />

      <input
        placeholder="Ciudad"
        className="flex-1 outline-none"
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl"
      >
        Buscar
      </button>
    </div>
  )
}