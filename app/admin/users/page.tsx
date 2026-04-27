"use client"

import { useState } from "react"

export default function UsersPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const role = "USER" // 🔒 fijo

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
    <div className="max-w-md space-y-4">

      <h2 className="text-xl font-bold">
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
          <option value="USER">Usuario</option>
        </select>

        <p className="text-xs text-gray-400 mt-1">
          Este rol se asigna automáticamente
        </p>
      </div>

      <button
        onClick={createUser}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Guardar
      </button>

    </div>
  )
}