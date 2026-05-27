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
  const [categories, setCategories] = useState<any[]>([])
  const [treatments, setTreatments] = useState<string[]>([])
  const [treatmentInput, setTreatmentInput] = useState("")

  const [form, setForm] = useState({
    name: "",
    type: "CLINIC",
    description: "",

    city: "",
    state: "",

    address: "",
    postalCode: "",

    phone: "",
    phone2: "",
    mobile: "",
    email: "",
    website: "",

    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",

    image: "",

    doctorIds: [] as string[],
    categoryIds: [] as string[],
    treatmentIds: [] as string[]
  })

  const load = async () => {
    const res = await fetch("/api/admin/places")
    const data = await res.json()
    setPlaces(data)

    const docs = await fetch("/api/admin/doctors")
    setDoctors(await docs.json())

    const cats = await fetch("/api/admin/categories?type=DOCTOR")
    setCategories(await cats.json())
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
      description: "",
      state: "",
      address: "",
      postalCode: "",
      phone: "",
      phone2: "",
      mobile: "",
      email: "",
      website: "",
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: "",
      image: "",
      doctorIds: [],
      categoryIds: [] as string[],
      treatmentIds: [] as string[]
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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* HEADER */}
      <div className="border-b px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500">
        <h2 className="text-2xl font-bold text-white">
          Crear Place
        </h2>

        <p className="text-green-50 mt-1">
          Información general de la clínica o hospital
        </p>
      </div>

      <div className="p-8 space-y-10">

        {/* INFO GENERAL */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Información General
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Nombre
              </label>

              <input
                placeholder="Nombre de la clínica"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Categoría
              </label>

              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.type}
                onChange={e =>
                  setForm({
                    ...form,
                    type: e.target.value
                  })
                }
              >
                <option value="HOSPITAL">Hospital</option>
                <option value="CLINIC">Clínica</option>
                <option value="LAB">Laboratorio</option>
                <option value="DENTAL">Dental</option>
              </select>
            </div>

          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Descripción
            </label>

            <textarea
              rows={4}
              placeholder="Descripción del lugar..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.description}
              onChange={e =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />
          </div>
        </div>

        {/* UBICACION */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Ubicación
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Ciudad"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.city}
              onChange={e =>
                setForm({
                  ...form,
                  city: e.target.value
                })
              }
            />

            <input
              placeholder="Estado"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.state}
              onChange={e =>
                setForm({
                  ...form,
                  state: e.target.value
                })
              }
            />

            <input
              placeholder="Dirección"
              className="w-full border border-gray-200 rounded-xl px-4 py-3" //md:col-span-2
              value={form.address}
              onChange={e =>
                setForm({
                  ...form,
                  address: e.target.value
                })
              }
            />

            <input
              placeholder="Código Postal"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.postalCode}
              onChange={e =>
                setForm({
                  ...form,
                  postalCode: e.target.value
                })
              }
            />

          </div>
        </div>

        {/* CONTACTO */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Contacto
          </h3>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              placeholder="Teléfono fijo"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.phone}
              onChange={e =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Teléfono fijo 2"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.phone2}
              onChange={e =>
                setForm({
                  ...form,
                  phone2: e.target.value
                })
              }
            />

            <input
              placeholder="Celular"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.mobile}
              onChange={e =>
                setForm({
                  ...form,
                  mobile: e.target.value
                })
              }
            />

            <input
              placeholder="E-mail"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.email}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />

          </div>
        </div>

        {/* REDES */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Redes Sociales
          </h3>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              placeholder="Sitio web"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.website}
              onChange={e =>
                setForm({
                  ...form,
                  website: e.target.value
                })
              }
            />

            <input
              placeholder="Facebook"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.facebook}
              onChange={e =>
                setForm({
                  ...form,
                  facebook: e.target.value
                })
              }
            />

            <input
              placeholder="Instagram"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.instagram}
              onChange={e =>
                setForm({
                  ...form,
                  instagram: e.target.value
                })
              }
            />

            <input
              placeholder="Youtube"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.youtube}
              onChange={e =>
                setForm({
                  ...form,
                  youtube: e.target.value
                })
              }
            />

            <input
              placeholder="Twitter"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.twitter}
              onChange={e =>
                setForm({
                  ...form,
                  twitter: e.target.value
                })
              }
            />

          </div>
        </div>

        {/* ESPECIALIDADES */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Especialidades
          </h3>

          <div className="grid md:grid-cols-3 gap-3">

            {categories.map((cat: any) => (
              <label
                key={cat.id}
                className={`border rounded-2xl p-4 cursor-pointer transition ${
                  form.categoryIds.includes(cat.id)
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.categoryIds.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          categoryIds: [
                            ...form.categoryIds,
                            cat.id
                          ]
                        })
                      } else {
                        setForm({
                          ...form,
                          categoryIds:
                            form.categoryIds.filter(
                              id => id !== cat.id
                            )
                        })
                      }
                    }}
                  />

                  <span className="font-medium">
                    {cat.name}
                  </span>

                </div>
              </label>
            ))}

          </div>
        </div>

        {/* DOCTORES */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Doctores
          </h3>

          <div className="grid md:grid-cols-3 gap-3">

            {doctors.map((doc: any) => (
              <label
                key={doc.id}
                className={`border rounded-2xl p-4 cursor-pointer transition ${
                  form.doctorIds.includes(doc.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.doctorIds.includes(doc.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          doctorIds: [
                            ...form.doctorIds,
                            doc.id
                          ]
                        })
                      } else {
                        setForm({
                          ...form,
                          doctorIds:
                            form.doctorIds.filter(
                              id => id !== doc.id
                            )
                        })
                      }
                    }}
                  />

                  <span className="font-medium">
                    {doc.name}
                  </span>

                </div>
              </label>
            ))}

          </div>
        </div>

        {/* BOTON */}
        <div className="flex justify-end pt-5 border-t">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
          >
            Guardar Place
          </button>
        </div>

      </div>
    </div>
  )  
  // return (
  //   <div className="p-6 space-y-10">

  //     {/* FORM */}
  //     <div className="bg-white p-6 rounded-2xl shadow space-y-4">
  //       <h2 className="font-bold text-lg">Crear Place</h2>

  //       <input
  //         placeholder="Nombre"
  //         className="w-full border p-2 rounded"
  //         value={form.name}
  //         onChange={e => setForm({ ...form, name: e.target.value })}
  //       />

  //       <select
  //         className="w-full border p-2 rounded"
  //         value={form.type}
  //         onChange={e => setForm({ ...form, type: e.target.value })}
  //       >
  //         <option value="HOSPITAL">Hospital</option>
  //         <option value="CLINIC">Clínica</option>
  //         <option value="LAB">Laboratorio</option>
  //         <option value="DENTAL">Dental</option>
  //       </select>

  //       <input
  //         placeholder="Ciudad"
  //         className="w-full border p-2 rounded"
  //         value={form.city}
  //         onChange={e => setForm({ ...form, city: e.target.value })}
  //       />

  //       <input
  //         placeholder="Dirección"
  //         className="w-full border p-2 rounded"
  //         value={form.address}
  //         onChange={e => setForm({ ...form, address: e.target.value })}
  //       />

  //       <input
  //         placeholder="Teléfono"
  //         className="w-full border p-2 rounded"
  //         value={form.phone}
  //         onChange={e => setForm({ ...form, phone: e.target.value })}
  //       />

        

  //       {/* 👨‍⚕️ DOCTORES */}
  //       <div>
  //         <p className="font-semibold mb-2">Asignar doctores</p>

  //         {doctors.map((doc: any) => (
  //           <label key={doc.id} className="block text-sm">
  //             <input
  //               type="checkbox"
  //               checked={form.doctorIds.includes(doc.id)}
  //               onChange={(e) => {
  //                 if (e.target.checked) {
  //                   setForm({
  //                     ...form,
  //                     doctorIds: [...form.doctorIds, doc.id]
  //                   })
  //                 } else {
  //                   setForm({
  //                     ...form,
  //                     doctorIds: form.doctorIds.filter(id => id !== doc.id)
  //                   })
  //                 }
  //               }}
  //             />
  //             {doc.name}
  //           </label>
  //         ))}
  //       </div>

  //       <div>
  //         <p className="font-semibold mb-2">
  //           Especialidades
  //         </p>

  //         {categories.map((cat: any) => (
  //           <label
  //             key={cat.id}
  //             className="block text-sm"
  //           >
  //             <input
  //               type="checkbox"
  //               checked={form.categoryIds.includes(cat.id)}
  //               onChange={(e) => {
  //                 if (e.target.checked) {
  //                   setForm({
  //                     ...form,
  //                     categoryIds: [...form.categoryIds, cat.id]
  //                   })
  //                 } else {
  //                   setForm({
  //                     ...form,
  //                     categoryIds: form.categoryIds.filter(
  //                       id => id !== cat.id
  //                     )
  //                   })
  //                 }
  //               }}
  //             />

  //             {cat.name}
  //           </label>
  //         ))}
  //       </div>

  //       <button
  //         onClick={handleSubmit}
  //         className="bg-green-600 text-white px-4 py-2 rounded"
  //       >
  //         Guardar
  //       </button>
  //     </div>

  //     {/* LISTADO */}
  //     <div>
  //       <h2 className="font-bold text-lg mb-4">Listado</h2>

  //       <table className="w-full border rounded-xl">
  //         <thead>
  //           <tr className="bg-gray-100">
  //             <th>Nombre</th>
  //             <th>Tipo</th>
  //             <th>Ciudad</th>
  //             <th>Acciones</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {places.map((p: any) => (
  //             <tr key={p.id} className="border-t">
  //               <td>{p.name}</td>
  //               <td>{p.type}</td>
  //               <td>{p.city}</td>

  //               <td className="space-x-2">
  //                 <button
  //                   onClick={() => setEditing(p.id)}
  //                   className="text-blue-600"
  //                 >
  //                   Editar
  //                 </button>

  //                 <button
  //                   onClick={() => remove(p.id)}
  //                   className="text-red-600"
  //                 >
  //                   Eliminar
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
        

  //       {editing && (
  //         <EditPlaceModal
  //           id={editing}
  //           onClose={() => setEditing(null)}
  //           onSaved={load}
  //         />
  //       )}
  //     </div>

  //   </div>
  // )
}