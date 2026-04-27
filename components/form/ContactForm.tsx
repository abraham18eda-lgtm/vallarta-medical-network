"use client"

import { useState } from "react"

export default function ContactForm({ doctorId }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        doctorId
      })
    })

    setLoading(false)
    setSuccess(true)

    setForm({
      name: "",
      email: "",
      phone: "",
      message: ""
    })
  }

  return (
    <div className="border p-4 rounded-2xl space-y-4">
      <h2 className="font-bold text-lg">Contactar doctor</h2>

      <input
        placeholder="Nombre"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Teléfono"
        className="w-full border p-2 rounded"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Mensaje"
        className="w-full border p-2 rounded"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {success && (
        <p className="text-green-600 text-sm">
          Mensaje enviado correctamente
        </p>
      )}
    </div>
  )
}