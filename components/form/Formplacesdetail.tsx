"use client"

import { useState } from "react"

export default function PlaceForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log("FORM:", form)

    alert("Solicitud enviada (demo frontend)")
    
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >

      <h3 className="text-lg font-semibold">
        Solicitar información
      </h3>

      <input
        placeholder="Nombre"
        className="w-full border p-3 rounded-xl"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-xl"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <textarea
        placeholder="Mensaje"
        className="w-full border p-3 rounded-xl"
        rows={4}
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        Enviar solicitud
      </button>

    </form>
  )
}