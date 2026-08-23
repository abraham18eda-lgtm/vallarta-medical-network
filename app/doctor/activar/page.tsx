"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function ActivarDoctorForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError("")

    if (!token) {
      setError(
        "El enlace de activación no es válido."
      )
      return
    }

    if (password.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      )
      return
    }

    if (password !== confirmPassword) {
      setError(
        "Las contraseñas no coinciden."
      )
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        "/api/doctors/activar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            "No se pudo activar la cuenta."
        )
      }

      setSuccess(true)

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error."
      )
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Enlace inválido
          </h1>

          <p className="mt-3 text-gray-600">
            El enlace de activación no contiene un token válido.
          </p>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">

          <div className="text-green-600 text-5xl mb-4">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            ¡Cuenta activada!
          </h1>

          <p className="mt-3 text-gray-600">
            Tu contraseña fue creada correctamente.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Iniciar sesión
          </button>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">

        <h1 className="text-2xl font-bold text-gray-800">
          Activa tu cuenta
        </h1>

        <p className="mt-2 mb-6 text-gray-600">
          Crea una contraseña para acceder a tu cuenta de doctor.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Repite tu contraseña"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Activando..."
              : "Crear contraseña"}
          </button>

        </form>

      </div>
    </main>
  )
}

export default function ActivarDoctorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <ActivarDoctorForm />
    </Suspense>
  )
}
