"use client"

import { useState } from "react"

export default function UsersPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const role = "USER" // fijo

  const createUser = async () => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        role //lo mandas explícitamente
      })
    })

    if (res.ok) {
      alert("Usuario creado")
      setEmail("")
      setPassword("")
    } else {
      alert("Error al enviar")
    }
  }

  return (
  
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-sky-800 text-2xl font-bold text-center py-4">
          Crear Usuario
        </h2>

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* 🔥 ROLE BLOQUEADO */}
        <div>
          <p className="text-sm font-medium mb-1">Rol</p>

          <select
            value={role}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          >
            <option value="DOCTOR">Doctor</option>
          </select>

          <p className="text-xs text-gray-400 mt-1">
            Este rol se asigna automáticamente
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={createUser}
            className="w-full px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow hover:scale-[1.01] transition "
          >
            Guardar
          </button>
        </div>
      </div>

    </div>
    
  )
}