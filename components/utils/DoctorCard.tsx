"use client"

type Props = {
  doctor: any
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4">
      <div className="relative">
        <img
          src={doctor.image || "/doctor.jpg"}
          className="w-full h-48 object-cover rounded-xl"
        />

        <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full shadow">
          {doctor.categories?.[0]?.category?.name}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{doctor.name}</h3>
        <p className="text-sm text-gray-500">{doctor.city}</p>

        <a
          href={`/doctor/${doctor.slug}`}
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          Ver perfil →
        </a>
      </div>
    </div>
  )
}