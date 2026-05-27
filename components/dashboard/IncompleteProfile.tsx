import Link from "next/link"
import React from "react";


export default function IncompleteProfile({ doctor }: any) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">

        <h2 className="text-2xl font-bold mb-3">
          ⚡ Completa tu perfil
        </h2>

        <p className="text-gray-600 mb-6">
          Tu perfil aún no está visible. Completa la información para aparecer en el directorio.
        </p>

        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div className="bg-blue-600 h-2 rounded w-1/3"></div>
        </div>

        <Link
          href="/dashboard/onboarding"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Continuar registro
        </Link>

      </div>
    </div>
  )
}