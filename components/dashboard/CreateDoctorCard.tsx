import React from "react";


export default function CreateDoctorCard() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">

        <h2 className="text-2xl font-bold mb-3">
          👨‍⚕️ Crea tu perfil médico
        </h2>

        <p className="text-gray-600 mb-6">
          Regístrate como doctor y empieza a aparecer en el directorio.
        </p>

        <a
          href="/dashboard/onboarding"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Crear perfil
        </a>

      </div>
    </div>
  )
}