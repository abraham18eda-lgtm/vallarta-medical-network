"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function AuthModal({ onClose }: any) {
  const [isLogin, setIsLogin] = useState(true)

  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const submit = async () => {
    setMessage("")

    const url = isLogin
      ? "/api/auth/login"
      : "/api/auth/register"

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
      credentials: "include"
    })

    const data = await res.json()

    if (res.ok) {
      onClose()

      // 🔥 redirige según rol después (mejorable)
      window.location.href = "/dashboard"
    } else {
      setMessage(data.error || "Error")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">

      <div className="bg-white w-full max-w-md p-6 rounded-2xl space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        {!isLogin && (
          <input
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {message && (
          <div className="bg-red-100 text-red-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {isLogin ? "Entrar" : "Registrarme"}
        </button>

        {/* TOGGLE */}
        <p className="text-sm text-center">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1"
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </span>
        </p>

      </div>

    </div>
  )
}