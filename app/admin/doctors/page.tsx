"use client"

import { useEffect, useState } from "react"
import EditDoctorModal from "@/components/ui/EditDoctorModal"


function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export default function AdminDoctorsPage() {

  const initialForm = {
    locale: "es",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    image: "",
    description: "",
    featuredHome: false,
  }
  
   const [form, setForm] = useState(initialForm)

  const [editingDoctor, setEditingDoctor] = useState<string | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [saving, setSaving] = useState(false)

  // Cargo las categorías
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories/tree")

      // Valido si la respuesta es OK
      if (!res.ok) {
        throw new Error("Error al cargar categorías")
      }

      const data = await res.json()
      // console.log(data)

      // Valida que sea array
      if (!Array.isArray(data)) {
          console.error("Respuesta inválida:", data)
        setCategories([])
        return
      }

      // setCategories(data)
      setCategories(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (error) {
      console.error("Error categories:", error)
      setCategories([]) // Evita que rompa el .map
    }
  }


  // Cargo los doctores
  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors")

      // Valido si la respuesta es OK
      if (!res.ok) {
        throw new Error("Error al cargar doctores")
      }

      const data = await res.json()
      // console.log(data)

      if (!Array.isArray(data)) {
        console.error("Respuesta inválida:", data)
        setDoctors([])
        return
      }

      // setDoctors(data)
      setDoctors(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (error) {
      console.error("Error doctors:", error)
      setDoctors([])
    }
  }


  // Cargar al montar
  useEffect(() => {
    loadCategories()
    loadDoctors()
  }, [])
 

  // Subir imagen con Cloundinary
  const handleImageUpload = async (file: File) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      setForm(prev => ({
        ...prev,
        image: data.url
      }))
    
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Guardar los doctor
  const handleSubmit = async () => {
    if (!form.name || !selectedCategory) {
      alert("Nombre y categoría son obligatorios")
      return
    }

    try {
      setSaving(true)

      const slug = generateSlug(form.name)

      const res = await fetch("/api/admin/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

      /*Datos principales Doctor*/
      email: form.email,
      phone: form.phone,
      image: form.image,

      /*Traducción*/
      translation:{
        locale:form.locale,
        name:form.name,
        description:form.description,
        city:form.city,
        state:form.state,
      },
      
      slug,
        categories:[selectedCategory],
        featuredHome:form.featuredHome
        })
      })

    // Valido si la respuesta es OK 
    if (!res.ok) {
      const error =
        await res.json()
      alert(error.error || "Error creando doctor")
      return
    } 

    // reset
    setForm(initialForm)
    setPreview(null)
    setSelectedCategory(null)

    loadDoctors()


    } catch (error) {

      console.error(error)

      alert("Error guardando")

    } finally {

      setSaving(false)
    }
  }

  // ❌ eliminar doctor
  const removeDoctor = async (id: string) => {

    //confirmo si requieres eliminarlo
    if (!confirm("¿Eliminar doctor?")) return

    await fetch(`/api/admin/doctors/${id}`, {
      method: "DELETE"
    })

    loadDoctors()
  }

   return (

    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* ================================= */}
      {/* FORM */}
      {/* ================================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            Crear Doctor
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Agrega la información del especialista
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Idioma */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Idioma
            </label>

            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              value={form.locale}
              onChange={(e)=>
                setForm({
                  ...form,
                  locale:e.target.value
                })
              }
            >
              <option value="es">
                Español
              </option>

              <option value="en">
                English
              </option>

            </select>
          </div>
          
          {/* NOMBRE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nombre
            </label>

            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Juan Pérez"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>

            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="doctor@email.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />
          </div>

          {/* TEL */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Teléfono
            </label>

            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="322..."
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />
          </div>

          {/* USER ID */}
          {/* <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              User ID
            </label>

            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              value={form.userId}
              onChange={(e) =>
                setForm({
                  ...form,
                  userId: e.target.value
                })
              }
            />
          </div> */}

          {/* CITY */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Ciudad
            </label>

            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Puerto Vallarta"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value
                })
              }
            />
          </div>

          {/* STATE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Estado
            </label>

            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jalisco"
              value={form.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  state: e.target.value
                })
              }
            />
          </div>

        </div>

        {/* IMAGE */}
        <div className="mt-6">

          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Imagen
          </label>

          <div className="border border-dashed border-gray-300 rounded-2xl p-5">

            <input
              type="file"
              onChange={async (e) => {

                const file = e.target.files?.[0]
                if (!file) return

                setPreview(
                  URL.createObjectURL(file)
                )

                await handleImageUpload(file)
              }}
            />

            {loading && (
              <p className="text-sm text-gray-500 mt-2">
                Subiendo imagen...
              </p>
            )}

            {(preview || form.image) && (
              <img
                src={preview || form.image}
                className="w-36 h-36 rounded-2xl object-cover mt-4 border"
              />
            )}

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">

          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Descripción
          </label>

          <textarea
            rows={5}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Información del doctor..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />

        </div>
        { /* HOME TOP FEATURED */} 
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featuredHome}
            onChange={(e) =>
              setForm({ ...form, featuredHome: e.target.checked })
            }
          />
          Mostrar en Home
        </label>   

        {/* CATEGORY */}
        <div className="mt-6">

          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Especialidades
          </label>

          <div className="grid md:grid-cols-3 gap-3">            
            {categories.map((cat: any) => (
            <label
              key={cat.id}
              className={`
                border rounded-2xl p-3 cursor-pointer transition text-sm
                ${
                  selectedCategory === cat.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >

              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={selectedCategory === cat.id}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="mr-2"
              />

              {cat.name}

            </label>

          ))}
            {/* {categories
              .find(
                (cat: any) =>
                  cat.slug ===
                  "especialidades"
              )
              ?.children?.map((sub: any) => (

                <label
                  key={sub.id}
                  className={`
                    border rounded-2xl p-3 cursor-pointer transition text-sm
                    ${
                      selectedCategory === sub.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="category"
                    value={sub.id}
                    checked={
                      selectedCategory === sub.id
                    }
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value
                      )
                    }
                    className="mr-2"
                  />

                  {sub.name}

                </label>
              ))} */}

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8">

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full md:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-[#046307] to-[#0b8f12] text-white font-semibold shadow hover:scale-[1.01] transition"
          >
            {saving
              ? "Guardando..."
              : "Guardar Doctor"}
          </button>

        </div>

      </div>     
    </div>
  )

  // return (
  //   <div className="p-6 grid md:grid-cols-2 gap-8">
      
  //     {/* ================= FORM ================= */}
  //     <div className="space-y-4">
  //       <h2 className="text-xl font-bold">Crear Doctor</h2>

  //       <input
  //         placeholder="Nombre"
  //         className="w-full border p-2 rounded"
  //         value={form.name}
  //         onChange={e => setForm({ ...form, name: e.target.value })}
  //       />

  //       <input
  //         placeholder="Ciudad"
  //         className="w-full border p-2 rounded"
  //         value={form.city}
  //         onChange={e => setForm({ ...form, city: e.target.value })}
  //       />

  //       {/* 🖼 Imagen */}
  //       <div>
  //         <p className="font-semibold mb-1">Imagen</p>

  //         <input
  //           type="file"
  //           onChange={async (e) => {
  //             const file = e.target.files?.[0]
  //             if (!file) return

  //             setPreview(URL.createObjectURL(file))
  //             await handleImageUpload(file)
  //           }}
  //         />

  //         {loading && <p className="text-sm text-gray-500">Subiendo...</p>}

  //         {preview && (
  //           <img
  //             src={preview}
  //             className="w-32 h-32 object-cover rounded-lg mt-2"
  //           />
  //         )}
  //       </div>

  //       {/* 🧠 Categorías */}
  //       <div>
  //         <p className="font-semibold mb-2">Especialidad</p>

  //         {categories
  //           .find((cat: any) => cat.slug === "especialidades") // 👈 clave
  //           ?.children?.map((sub: any) => (
  //             <label key={sub.id} className="block text-sm cursor-pointer">
  //               <input
  //                 type="radio"
  //                 name="category"
  //                 value={sub.id}
  //                 checked={selectedCategory === sub.id}
  //                 onChange={(e) => setSelectedCategory(e.target.value)}
  //                 className="mr-2"
  //               />
  //               {sub.name}
  //             </label>
  //           ))}
  //       </div>

  //       <button
  //         onClick={handleSubmit}
  //         className="bg-green-600 text-white px-4 py-2 rounded"
  //       >
  //         Guardar
  //       </button>
  //     </div>     
  //   </div>
  // )


}