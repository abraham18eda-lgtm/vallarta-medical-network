"use client"
import { useEffect, useState } from "react"

export default function Adminclinic() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState<any>({
    name: "",
    city: "",
    state: "",
    description: "",
    image: ""
  })

  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const res = await fetch("/api/admin/clinic")
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  // 🖼 Upload Cloudinary
  const uploadImage = async (file: File) => {
    setLoading(true)

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "tu_preset")

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tu_cloud/image/upload",
      { method: "POST", body: data }
    )

    const json = await res.json()
    setForm({ ...form, image: json.secure_url })

    setLoading(false)
  }

  const save = async () => {
    const method = editing ? "PUT" : "POST"
    const url = editing
      ? `/api/admin/hospitals/${editing.id}`
      : `/api/admin/hospitals`

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    setForm({ name: "", city: "", state: "", description: "", image: "" })
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Eliminar clinic?")) return

    await fetch(`/api/admin/clinic/${id}`, {
      method: "DELETE"
    })

    load()
  }

  const edit = (item: any) => {
    setEditing(item)
    setForm(item)
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">

      {/* FORM */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">
          {editing ? "Editar Hospital" : "Nuevo Hospital"}
        </h2>

        <input
          placeholder="Nombre"
          className="input"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Ciudad"
          className="input"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          placeholder="Estado"
          className="input"
          value={form.state}
          onChange={e => setForm({ ...form, state: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          className="input"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) uploadImage(file)
          }}
        />

        {loading && <p>Subiendo...</p>}

        {form.image && (
          <img src={form.image} className="w-32 h-32 object-cover rounded" />
        )}

        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>

      {/* LISTADO */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Hospitales
        </h2>

        {list.map(item => (
          <div
            key={item.id}
            className="border p-3 rounded mb-2 flex justify-between"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.city}</p>
            </div>

            <div className="space-x-2">
              <button onClick={() => edit(item)} className="text-blue-600">
                Editar
              </button>

              <button onClick={() => remove(item.id)} className="text-red-600">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}