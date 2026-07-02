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
    image: "",
    featuredHome: false,
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const [categories, setCategories] = useState<any[]>([])

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([])

  const [showCategories, setShowCategories] =
  
  useState(false)

  // console.log("ID RECIBIDO:", id)
  // Cargar datos del doctor
  useEffect(() => {
    const load = async () => {

    if (!id) return

    try {

      setFetching(true)
      // Trae Los Doctores
      const res = await fetch(
        `/api/admin/doctors/${id}`
      )
      const data = await res.json()
      
      // Traer las Categorias
      const catRes = await fetch(
        "/api/categories/tree"
      )
      const catData = await catRes.json()
      setCategories(catData || [])
      // console.log("STATUS:", res.status)
      // console.log(
      //   "CONTENT TYPE:",
      //   res.headers.get("content-type")
      // )

      // const text = await res.text()
      // console.log("RESPONSE:", text)

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        city: data.city || "",
        state: data.state || "",
        description: data.description || "",
        image: data.image || "",
        featuredHome: !!data.featuredHome
      })

      // Preview Inicial de la Imagen
      setPreview(data.image || null)

       // categorias seleccionadas
        setSelectedCategories(
          data.categories?.map(
            (c: any) => c.categoryId
          ) || []
        )

      } catch (error) {
        console.error(error)
        alert(
          "Error cargando datos del doctor"
        )
      } finally {
        setFetching(false)
      }
    }
    load()
    }, [id])

  
    // SUBIR IMAGEN CLOUDINARY
    const handleImageUpload = async (
      file: File
    ) => {

      try {

        setUploading(true)

        // preview temporal
        setPreview(
          URL.createObjectURL(file)
        )

        const formData = new FormData()

        formData.append("file", file)

        const res = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData
          }
        )

        if (!res.ok) {
          throw new Error(
            "Error subiendo imagen"
          )
        }

        const data = await res.json()

        // guardar url cloudinary
        setForm(prev => ({
          ...prev,
          image: data.url
        }))

        // preview final
        setPreview(data.url)

      } catch (error) {

        console.error(error)

        alert(
          "Error subiendo imagen"
        )

      } finally {

        setUploading(false)

      }
    }

    //Categorias
    const toggleCategory = (
      categoryId: string
    ) => {

      setSelectedCategories(prev => {

        if (
          prev.includes(categoryId)
        ) {
          return prev.filter(
            id => id !== categoryId
          )
        }

        return [...prev, categoryId]
      })
    }

    // Guardar cambios
    const save = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/admin/doctors/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            city: form.city,
            state: form.state,
            description: form.description,
            image: form.image,
            featuredHome: form.featuredHome,
            categories: selectedCategories,
          })
        })

        if (!res.ok) {
          const text = await res.text()
          console.error("Error al guardar doctor:", text)
          throw new Error("Error al guardar doctor")
        }

        onSaved?.()
        onClose?.()

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
          <p className="text-xs text-gray-500"></p>
        </div>
      </div>
    )
  }

  return (

    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

      <div className="min-h-screen flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 border-b bg-gray-50">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Editar Doctor
                </h2>

                <p className="text-sm text-gray-500">
                  Actualiza la información
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-200 transition"
              >
                ✕
              </button>

            </div>

          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">

            {/* FOTO */}
            <div>

              <p className="font-semibold text-gray-700 mb-3">
                Foto de perfil
              </p>

              <div className="flex items-center gap-5">

                {/* PREVIEW */}
                 <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">

                  {(preview || form.image) ? (

                    <img
                      src={
                        preview || form.image
                      }
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <span className="text-gray-400 text-sm">
                      Sin imagen
                    </span>

                  )}

                </div>

                {/* BOTÓN */}
                <div className="space-y-2">

                  <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">

                    <span>
                      {form.image
                        ? "Cambiar imagen"
                        : "Subir imagen"}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {

                        const file =
                          e.target.files?.[0]

                        if (!file) return

                        await handleImageUpload(
                          file
                        )
                      }}
                    />

                  </label>

                  {uploading && (
                    <p className="text-sm text-gray-500">
                      Subiendo imagen...
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Nombre
                </label>

                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>

                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Teléfono
                </label>

                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Ciudad
                </label>

                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Estado
                </label>

                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      state: e.target.value
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Descripción
                </label>

                <textarea
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value
                    })
                  }
                />
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featuredHome}
                onChange={(e) =>
                  setForm({ ...form, featuredHome: e.target.checked })
                }
              />
              Mostrar TOP
            </label>
          </div>
          
          {/* ESPECIALIDADES */}
          <div className="p-6">

            <div className="flex items-center justify-between mb-4">

              <div className="px-4 py-3">

                <h3 className="font-semibold text-gray-800">
                  Especialidades
                </h3>

                <p className="text-sm text-gray-500">
                  Selecciona una o varias
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCategories(
                    !showCategories
                  )
                }
                className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-xl"
              >
                {showCategories
                  ? "−"
                  : "+"}
              </button>

            </div>

            {/* TAGS SELECCIONADOS */}
            {selectedCategories.length > 0 && (

              <div className="flex flex-wrap gap-2 mb-4">

                {categories
                  ?.flatMap(
                    (cat: any) =>
                      cat.children || []
                  )
                  .filter((c: any) =>
                    selectedCategories.includes(
                      c.id
                    )
                  )
                  .map((cat: any) => (

                    <div
                      key={cat.id}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cat.name}
                    </div>

                  ))}

              </div>

            )}

            {/* LISTADO */}
            {showCategories && (

              <div className="grid md:grid-cols-3 gap-3">

                {categories
                  ?.flatMap(
                    (cat: any) =>
                      cat.children?.length
                        ? cat.children
                        : [cat]
                  )
                  .map((cat: any) => (

                    <label
                      key={cat.id}
                      className={`
                        border rounded-2xl p-3 cursor-pointer transition text-sm
                        ${
                          selectedCategories.includes(
                            cat.id
                          )
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          cat.id
                        )}
                        onChange={() =>
                          toggleCategory(
                            cat.id
                          )
                        }
                        className="mr-2"
                      />

                      {cat.name}

                    </label>

                  ))}

              </div>

            )}

          </div>         

          {/* FOOTER */}
          <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              onClick={save}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
              {loading
                ? "Guardando..."
                : "Guardar cambios"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}