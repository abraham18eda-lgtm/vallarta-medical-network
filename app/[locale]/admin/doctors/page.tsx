"use client"
import { useEffect, useState } from "react"

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])

  const loadDoctors = async () => {
    const res = await fetch("/api/admin/doctors")
    const data = await res.json()
    setDoctors(data)
  }

  useEffect(() => {
    loadDoctors()
  }, [])

  const removeDoctor = async (id: string) => {
    if (!confirm("¿Eliminar doctor?")) return

    await fetch(`/api/admin/doctors/${id}`, {
      method: "DELETE"
    })

    loadDoctors()
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Doctores</h1>

      <table className="w-full border rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doc: any) => (
            <tr key={doc.id} className="border-t">
              <td className="p-3">{doc.name}</td>
              <td>{doc.city}</td>

              <td className="space-x-2">
                <a
                  href={`./doctors/${doc.id}`}
                  className="text-blue-600"
                >
                  Editar
                </a>

                <button
                  onClick={() => removeDoctor(doc.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}