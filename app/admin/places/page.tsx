"use client"

import { useEffect, useState } from "react"
import EditPlaceModal from "@/components/admin/EditPlaceModal"

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-")
}

export default function AdminPlaces() {
  const [places, setPlaces] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [editing, setEditing] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    type: "CLINIC",
    city: "",
    address: "",
    phone: "",
    image: "",
    doctorIds: [] as string[]
  })

  const load = async () => {
    const res = await fetch("/api/admin/places")
    const data = await res.json()
    setPlaces(data)

    const docs = await fetch("/api/admin/doctors")
    setDoctors(await docs.json())
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async () => {
    const slug = slugify(form.name)

    await fetch("/api/admin/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug })
    })

    setForm({
      name: "",
      type: "CLINIC",
      city: "",
      address: "",
      phone: "",
      image: "",
      doctorIds: []
    })

    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Eliminar?")) return

    await fetch(`/api/admin/places/${id}`, {
      method: "DELETE"
    })

    load()
  }

  return (
    <div className="p-6 space-y-10">

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="font-bold text-lg">Crear Place</h2>

        <input
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="HOSPITAL">Hospital</option>
          <option value="CLINIC">Clínica</option>
          <option value="LAB">Laboratorio</option>
          <option value="DENTAL">Dental</option>
        </select>

        <input
          placeholder="Ciudad"
          className="w-full border p-2 rounded"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          placeholder="Dirección"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Teléfono"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        {/* 👨‍⚕️ DOCTORES */}
        <div>
          <p className="font-semibold mb-2">Asignar doctores</p>

          {doctors.map((doc: any) => (
            <label key={doc.id} className="block text-sm">
              <input
                type="checkbox"
                checked={form.doctorIds.includes(doc.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setForm({
                      ...form,
                      doctorIds: [...form.doctorIds, doc.id]
                    })
                  } else {
                    setForm({
                      ...form,
                      doctorIds: form.doctorIds.filter(id => id !== doc.id)
                    })
                  }
                }}
              />
              {doc.name}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>

      {/* LISTADO */}
      <div>
        <h2 className="font-bold text-lg mb-4">Listado</h2>

        <table className="w-full border rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {places.map((p: any) => (
              <tr key={p.id} className="border-t">
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.city}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => setEditing(p.id)}
                    className="text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => remove(p.id)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editing && (
          <EditPlaceModal
            id={editing}
            onClose={() => setEditing(null)}
            onSaved={load}
          />
        )}
      </div>

    </div>
  )
}