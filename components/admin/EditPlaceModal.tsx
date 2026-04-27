"use client"

import { useEffect, useState } from "react"

export default function EditPlaceModal({ id, onClose, onSaved }: any) {

  const [form, setForm] = useState<any>({
    name: "",
    type: "CLINIC",
    doctorIds: []
  })

  const [doctors, setDoctors] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/places/${id}`)
      const data = await res.json()

      setForm({
        ...data,
        doctorIds: data.doctors.map((d: any) => d.doctor.id)
      })

      const docs = await fetch("/api/admin/doctors")
      setDoctors(await docs.json())
    }

    load()
  }, [id])

  const save = async () => {
    await fetch(`/api/admin/places/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">

        <h2 className="font-bold">Editar</h2>

        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="HOSPITAL">Hospital</option>
          <option value="CLINIC">Clínica</option>
          <option value="LAB">Laboratorio</option>
          <option value="DENTAL">Dental</option>
        </select>

        <div>
          <p className="font-semibold">Doctores</p>

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
                      doctorIds: form.doctorIds.filter((d: string) => d !== doc.id)
                    })
                  }
                }}
              />
              {doc.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={save}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  )
}