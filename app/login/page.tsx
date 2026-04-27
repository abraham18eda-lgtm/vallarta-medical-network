"use client"

import { useState } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include" // 🔥 clave
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href = "/admin"
      } else {
        alert(data.error || "Error al iniciar sesión")
      }

    } catch (err) {
      alert("Error de conexión")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Panel Admin
        </h1>

        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 border rounded-xl"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a
          href="/forgot-password"
          className="block text-center text-sm text-blue-600"
        >
          ¿Olvidaste tu contraseña?
        </a>

      </div>

    </div>
  )
}