"use client"

export default function PlaceCard({ place }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group">

      {/* 🖼 IMAGEN */}
      <div className="overflow-hidden">
        <img
          src={place.image || "/hospital.jpg"}
          className="w-full h-52 object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* 📄 INFO */}
      <div className="p-4 space-y-2">

        <h3 className="font-semibold text-lg">
          {place.name}
        </h3>

        <p className="text-sm text-gray-500">
          {place.city || "Ubicación no disponible"}
        </p>

        {/* 👨‍⚕️ DOCTORES */}
        <p className="text-xs text-gray-400">
          {place.doctors?.length || 0} doctores disponibles
        </p>

        {/* 🔗 LINK */}
        <a
          href={`/es/${place.type.toLowerCase()}/${place.slug}`}
          className="inline-block text-blue-600 text-sm mt-2 hover:underline"
        >
          Ver perfil →
        </a>

      </div>
    </div>
  )
}