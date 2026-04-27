"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditDoctor() {
  const { id } = useParams()
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    fetch(`/api/admin/doctors`)
      .then(res => res.json())
      .then(data => {
        const doc = data.find((d: any) => d.id === id)
        setForm(doc)
      })
  }, [id])

  const save = async () => {
    await fetch(`/api/admin/doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(form)
    })

    alert("Actualizado")
  }

  return (
    <div className="p-6 max-w-xl space-y-3">
      <input
        value={form.name || ""}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="input"
      />

      <input
        value={form.city || ""}
        onChange={e => setForm({ ...form, city: e.target.value })}
        className="input"
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </div>
  )
}