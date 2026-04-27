"use client"
import { useState } from "react"

export default function ContactHospitalForm({ hospitalId }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const send = async () => {
    await fetch("/api/contact-hospital", {
      method: "POST",
      body: JSON.stringify({ ...form, hospitalId })
    })

    alert("Mensaje enviado")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="border p-4 rounded-xl space-y-2">
      <h3 className="font-semibold">Contactar</h3>

      <input
        className="w-full border p-2 rounded"
        placeholder="Nombre"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Mensaje"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />

      <button
        onClick={send}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </div>
  )
}