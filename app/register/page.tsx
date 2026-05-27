"use client"

import { useState } from "react"

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const submit = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      alert("Cuenta creada")
      window.location.href = "/login"
    }
  }

  return (
    <div className="max-w-md mx-auto p-10 space-y-4">
      <h1 className="text-2xl font-bold">Crear cuenta Doctor</h1>

      <input placeholder="Nombre"
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button onClick={submit}
        className="bg-green-600 text-white w-full py-2 rounded">
        Registrarme
      </button>
    </div>
  )
}