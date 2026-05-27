// "use client"

// import { useEffect, useState } from "react"

// export default function EditPlaceModal({ id, onClose, onSaved }: any) {

//   const [form, setForm] = useState<any>({
//     name: "",
//     type: "CLINIC",
//     doctorIds: []
//   })

//   const [doctors, setDoctors] = useState<any[]>([])

//   useEffect(() => {
//     const load = async () => {
//       const res = await fetch(`/api/admin/places/${id}`)
//       const data = await res.json()

//       setForm({
//         ...data,
//         doctorIds: data.doctors.map((d: any) => d.doctor.id)
//       })

//       const docs = await fetch("/api/admin/doctors")
//       setDoctors(await docs.json())
//     }

//     load()
//   }, [id])

//   const save = async () => {
//     await fetch(`/api/admin/places/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     })

//     onSaved()
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">

//         <h2 className="font-bold">Editar</h2>

//         <input
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           className="w-full border p-2 rounded"
//         />

//         <select
//           value={form.type}
//           onChange={e => setForm({ ...form, type: e.target.value })}
//           className="w-full border p-2 rounded"
//         >
//           <option value="HOSPITAL">Hospital</option>
//           <option value="CLINIC">Clínica</option>
//           <option value="LAB">Laboratorio</option>
//           <option value="DENTAL">Dental</option>
//         </select>

//         <div>
//           <p className="font-semibold">Doctores</p>

//           {doctors.map((doc: any) => (
//             <label key={doc.id} className="block text-sm">
//               <input
//                 type="checkbox"
//                 checked={form.doctorIds.includes(doc.id)}
//                 onChange={(e) => {
//                   if (e.target.checked) {
//                     setForm({
//                       ...form,
//                       doctorIds: [...form.doctorIds, doc.id]
//                     })
//                   } else {
//                     setForm({
//                       ...form,
//                       doctorIds: form.doctorIds.filter((d: string) => d !== doc.id)
//                     })
//                   }
//                 }}
//               />
//               {doc.name}
//             </label>
//           ))}
//         </div>

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose}>Cancelar</button>

//           <button
//             onClick={save}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Guardar
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

"use client"
import { useEffect, useState } from "react"

export default function EditDoctorModal({ id, onClose, onSaved }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    description: "",
    image: ""
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Cargar datos del doctor
  useEffect(() => {
    const load = async () => {
      try {
        setFetching(true)
        const res = await fetch(`/api/admin/doctors/${id}`, { credentials: "include" })
        if (!res.ok) throw new Error("Error cargando doctor")
        const data = await res.json()
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city || "",
          state: data.state || "",
          description: data.description || "",
          image: data.image || ""
        })
      } catch (error) {
        console.error(error)
        alert("Error cargando datos del doctor")
      } finally {
        setFetching(false)
      }
    }
    if (id) load()
  }, [id])

  // Guardar cambios
  const save = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error("Error al guardar doctor")
      onSaved()
      onClose()
    } catch (error) {
      console.error(error)
      alert("Error al guardar doctor")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl space-y-2">
          <p>Cargando información del doctor...</p>
          <p className="text-xs text-gray-500">{id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="font-bold text-lg">Editar doctor</h2>

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

        <input
          className="w-full border p-2 rounded"
          placeholder="Teléfono"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Ciudad"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Estado"
          value={form.state}
          onChange={e => setForm({ ...form, state: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="URL de imagen"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">
            Cancelar
          </button>

          <button
            onClick={save}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}