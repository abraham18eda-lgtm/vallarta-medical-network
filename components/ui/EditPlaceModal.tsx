"use client"

import { useEffect, useState } from "react"

interface EditPlaceModalProps {
  id: string
  onClose: () => void
  onSaved: () => void
}

export default function EditPlaceModal({ id, onClose, onSaved }: EditPlaceModalProps) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    type: "",
    description: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    mobile: "",
    phone2: "",
    postalCode: "",
    image: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    website: "",
    locale: "es",
    isActive: true,
    showInNavbar: false,
    navbarOrder: 0
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  // Cargar datos del place
  useEffect(() => {
    if (!id) return

    const load = async () => {
      setFetching(true)
      try {
        const res = await fetch(`/api/admin/places/${id}`)
        const data = await res.json()
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          type: data.type || "",
          description: data.description || "",
          city: data.city || "",
          state: data.state || "",
          address: data.address || "",
          phone: data.phone || "",
          mobile: data.mobile || "",
          phone2: data.phone2 || "",
          postalCode: data.postalCode || "",
          image: data.image || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
          youtube: data.youtube || "",
          website: data.website || "",
          locale: data.locale || "es",
          isActive: data.isActive ?? true,
          showInNavbar: data.showInNavbar ?? false,
          navbarOrder: data.navbarOrder ?? 0
        })
        setPreview(data.image || null)
      } catch (error) {
        console.error(error)
        alert("Error cargando información del lugar")
      } finally {
        setFetching(false)
      }
    }

    load()
  }, [id])

  // Subir imagen
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true)
      setPreview(URL.createObjectURL(file))

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!res.ok) throw new Error("Error subiendo imagen")

      const data = await res.json()
      setForm(prev => ({ ...prev, image: data.url }))
      setPreview(data.url)
    } catch (error) {
      console.error(error)
      alert("Error subiendo imagen")
    } finally {
      setUploading(false)
    }
  }

  // Guardar cambios
  const save = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/places/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error("Error al guardar lugar")
      onSaved()
      onClose()
    } catch (error) {
      console.error(error)
      alert("Error al guardar lugar")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl">
          Cargando información del lugar...
        </div>
      </div>
    )
  }

  // return (
  //   <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
  //     <div className="min-h-screen flex items-center justify-center p-4">
  //       <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

  //         {/* HEADER */}
  //         <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between">
  //           <div>
  //             <h2 className="text-2xl font-bold text-gray-800">Editar Lugar</h2>
  //             <p className="text-sm text-gray-500">Actualiza la información del lugar</p>
  //           </div>
  //           <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 transition">✕</button>
  //         </div>

  //         {/* BODY */}
  //         <div className="p-6 space-y-6">

  //           {/* IMAGEN */}
  //           <div>
  //             <p className="font-semibold text-gray-700 mb-3">Imagen</p>
  //             <div className="flex items-center gap-5">

  //               <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
  //                 {preview || form.image ? (
  //                   <img src={preview || form.image} className="w-full h-full object-cover" />
  //                 ) : (
  //                   <span className="text-gray-400 text-sm">Sin imagen</span>
  //                 )}
  //               </div>

  //               <div className="space-y-2">
  //                 <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
  //                   {form.image ? "Cambiar imagen" : "Subir imagen"}
  //                   <input
  //                     type="file"
  //                     accept="image/*"
  //                     className="hidden"
  //                     onChange={async (e) => {
  //                       const file = e.target.files?.[0]
  //                       if (!file) return
  //                       await handleImageUpload(file)
  //                     }}
  //                   />
  //                 </label>
  //                 {uploading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}
  //               </div>
  //             </div>
  //           </div>

  //           {/* FORM */}
  //           <div className="grid md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="text-sm font-medium text-gray-600">Nombre</label>
  //               <input
  //                 className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
  //                 value={form.name}
  //                 onChange={(e) => setForm({ ...form, name: e.target.value })}
  //               />
  //             </div>

  //             <div>
  //               <label className="text-sm font-medium text-gray-600">Ciudad</label>
  //               <input
  //                 className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
  //                 value={form.city}
  //                 onChange={(e) => setForm({ ...form, city: e.target.value })}
  //               />
  //             </div>

  //             <div>
  //               <label className="text-sm font-medium text-gray-600">Estado</label>
  //               <input
  //                 className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
  //                 value={form.state}
  //                 onChange={(e) => setForm({ ...form, state: e.target.value })}
  //               />
  //             </div>

  //             <div className="md:col-span-2">
  //               <label className="text-sm font-medium text-gray-600">Descripción</label>
  //               <textarea
  //                 rows={4}
  //                 className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
  //                 value={form.description}
  //                 onChange={(e) => setForm({ ...form, description: e.target.value })}
  //               />
  //             </div>

  //           </div>

  //         </div>

  //         {/* FOOTER */}
  //         <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
  //           <button onClick={onClose} className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition">Cancelar</button>
  //           <button
  //             onClick={save}
  //             disabled={loading}
  //             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
  //           >
  //             {loading ? "Guardando..." : "Guardar cambios"}
  //           </button>
  //         </div>

  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Editar Lugar</h2>
              <p className="text-sm text-gray-500">Actualiza la información del lugar</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 transition">✕</button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">

            {/* FOTO */}
            <div>
              <p className="font-semibold text-gray-700 mb-3">Imagen del lugar</p>
              <div className="flex items-center gap-5">
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  {preview || form.image ? (
                    <img src={preview || form.image} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                    {form.image ? "Cambiar imagen" : "Subir imagen"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => e.target.files && handleImageUpload(e.target.files[0])}
                    />
                  </label>
                  {uploading && <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-600">Nombre</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Slug</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.slug}
                  onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Tipo</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.type}
                  onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Ciudad</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.city}
                  onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Estado</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.state}
                  onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Dirección</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.address}
                  onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Descripción</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Redes Sociales */}
              <div>
                <label className="text-sm font-medium text-gray-600">Facebook</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.facebook}
                  onChange={e => setForm(prev => ({ ...prev, facebook: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Instagram</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-pink-500 outline-none"
                  value={form.instagram}
                  onChange={e => setForm(prev => ({ ...prev, instagram: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Twitter</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  value={form.twitter}
                  onChange={e => setForm(prev => ({ ...prev, twitter: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">YouTube</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-red-500 outline-none"
                  value={form.youtube}
                  onChange={e => setForm(prev => ({ ...prev, youtube: e.target.value }))}
                />
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-5 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className={`px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}