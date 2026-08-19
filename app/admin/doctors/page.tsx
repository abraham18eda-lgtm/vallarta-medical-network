"use client"

import { useEffect, useState } from "react"
import { slugify } from "@/lib/slugify"
import EditDoctorModal from "@/components/ui/EditDoctorModal"

  const EMAIL_REGEX =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  const PHONE_DIGITS_REGEX =
    /^\d{10}$/

  const PHONE_EXTENSION_REGEX =
    /^\d{1,6}$/

  function formatPhone(value: string) {

  // Solo números
  const digits = value.replace(/\D/g, "")

  // Máximo 10 números
  const phone = digits.slice(0, 10)

  if (phone.length <= 3) {
    return phone
  }

  if (phone.length <= 6) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
  }

  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
}

function normalizePhone(
  phone: string,
  country: string,
  extension: string
) {
  const digits = phone.replace(/\D/g, "")

  if (!digits) {
    return ""
  }

  const prefix =
    country === "MX"
      ? "+52"
      : "+1"

  const ext = extension
    ? ` ext. ${extension}`
    : ""

  const formatted =
  `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`

  return `${prefix} ${formatted}${ext}`
}

export default function AdminDoctorsPage() {

  const initialForm = {
    locale: "es",
    name: "",
    email: "",
    phone: "",
    phoneCountry: "MX",
    phoneExtension: "",
    city: "",
    state: "",
    image: "",
    description: "",
    isActive: true,
    featuredHome: false,
  }
  
  const [form, setForm] = useState(initialForm)
  type FormErrors = {
    name?: string
    email?: string
    phone?: string
    city?: string
    state?: string
    description?: string
    category?: string
  }

  const [errors, setErrors] = useState<FormErrors>({})

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

  const validateForm = () => {
    const newErrors: FormErrors = {}

    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const city = form.city.trim()
    const state = form.state.trim()
    const description = form.description.trim()
    const extension = form.phoneExtension.trim()

    if (!name) {
      newErrors.name = "El nombre es obligatorio"
    } else if (name.length < 3) {
      newErrors.name =
        "El nombre debe tener al menos 3 caracteres"
    } else if (name.length > 100) {
      newErrors.name =
        "El nombre no puede superar los 100 caracteres"
    }

    if (!email) {
      newErrors.email = "El email es obligatorio"
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Ingresa un email válido"
    }

    const phoneDigits = phone.replace(/\D/g, "")

    if (!phoneDigits) {
        newErrors.phone =
          "El teléfono es obligatorio"
      } else if (!PHONE_DIGITS_REGEX.test(phoneDigits)) {
        newErrors.phone =
          "Ingresa un teléfono válido de 10 dígitos"
      }

    if (extension &&
      !PHONE_EXTENSION_REGEX.test(extension)
    ) {
      newErrors.phone =
        "La extensión debe contener entre 1 y 6 números"
    }


    if (!city) {
      newErrors.city = "La ciudad es obligatoria"
    }

    if (!state) {
      newErrors.state = "El estado es obligatorio"
    }

    if (!description) {
      newErrors.description =
        "La descripción es obligatoria"
    } else if (description.length < 20) {
      newErrors.description =
        "La descripción debe tener al menos 20 caracteres"
    } else if (description.length > 2000) {
      newErrors.description =
        "La descripción no puede superar los 2000 caracteres"
    }

    if (!selectedCategory) {
      newErrors.category =
        "Selecciona una especialidad"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }



  // Guardar los doctor
  // const handleSubmit = async () => {
  //   if (!form.name || !selectedCategory) {
  //     alert("Nombre y categoría son obligatorios")
  //     return
  //   }

  //   try {
  //     setSaving(true)

  //     const slug = slugify(form.name)

  //     const res = await fetch("/api/admin/doctors", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({

  //     /*Datos principales Doctor*/
  //     email: form.email,
  //     phone: form.phone,
  //     image: form.image,

  //     /*Traducción*/
  //     translation:{
  //       locale:form.locale,
  //       name:form.name,
  //       description:form.description,
  //       city:form.city,
  //       state:form.state,
  //     },
      
  //     slug,
  //       categories:[selectedCategory],
  //       featuredHome:form.featuredHome
  //       })
  //     })

  //   // Valido si la respuesta es OK 
  //   if (!res.ok) {
  //     const error =
  //       await res.json()
  //     alert(error.error || "Error creando doctor")
  //     return
  //   } 

  //   // reset
  //   setForm(initialForm)
  //   setPreview(null)
  //   setSelectedCategory(null)

  //   loadDoctors()


  //   } catch (error) {

  //     console.error(error)

  //     alert("Error guardando")

  //   } finally {

  //     setSaving(false)
  //   }
  // }
  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setSaving(true)

      const slug = slugify(form.name)

      const normalizedPhone =
        normalizePhone(
          form.phone,
          form.phoneCountry,
          form.phoneExtension
        )
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           email: form.email.trim(),
           phone: normalizedPhone,
           image: form.image,
          
          isActive: form.isActive,

          translation: {
            locale: form.locale,
            name: form.name.trim(),
            description: form.description.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
          },

          slug,
          categories: [selectedCategory],
          featuredHome: form.featuredHome
        })
      })

      if (!res.ok) {
        const error = await res.json()

        alert(error.error || "Error creando doctor")
        return
      }

      setForm(initialForm)
      setPreview(null)
      setSelectedCategory(null)
      setErrors({})

      await loadDoctors()

    } catch (error) {
      console.error(error)
      alert("Error guardando")
    } finally {
      setSaving(false)
    }
  }


  // eliminar doctor
  const removeDoctor = async (id: string) => {

    //confirmo si requieres eliminarlo
    if (!confirm("¿Eliminar doctor?")) return

    await fetch(`/api/admin/doctors/${id}`, {
      method: "DELETE"
    })

    loadDoctors()
  }

   return (

    <div className="p-6 space-y-8 bg-gray-50 min-h-screen max-w-5xl mx-auto">

      {/* FORM */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

        <div className="mb-6">

          <h1 className="font-heanding text-sky-800 text-2xl font-bold text-gray-800">
            Crear Doctor
          </h1>

          <p className="text-base text-slate-500 mt-1">
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
              type="text"
              placeholder="Dr. Juan Pérez"
              value={form.name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`
                w-full rounded-xl px-4 py-3 outline-none transition
                border
                ${
                  errors.name
                    ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-500"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                }
              `}
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value
                })

                // Quitar error mientras escribe
                if (errors.name) {
                  setErrors({
                    ...errors,
                    name: undefined
                  })
                }
              }}
            />

            {errors.name && (
              <p
                id="name-error"
                className="mt-1.5 text-sm text-red-600"
              >
                {errors.name}
              </p>
            )}

          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>

            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="doctor@email.com"
              value={form.email}
              onChange={(e) => {
                setForm({
                  ...form,
                  email: e.target.value
                })

                if (errors.email) {
                  setErrors({
                    ...errors,
                    email: undefined
                  })
                }
              }}
              onBlur={() => {
                const email = form.email.trim()

                if (!email) {
                  setErrors({
                    ...errors,
                    email: "El email es obligatorio"
                  })
                  return
                }

                if (!EMAIL_REGEX.test(email)) {
                  setErrors({
                    ...errors,
                    email: "Ingresa un email válido"
                  })
                }
              }}
              className={`
                w-full rounded-xl px-4 py-3 outline-none border
                ${
                  errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-500"
                }
              `}
            />

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email}
              </p>
            )}

          </div>

          {/* TELÉFONO */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Teléfono
            </label>

            <div className="flex gap-2">

              {/* PAÍS */}
              <select
                value={form.phoneCountry}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phoneCountry: e.target.value,
                    phone: ""
                  })
                }
                className="
                  w-28
                  shrink-0
                  border border-gray-200
                  rounded-xl
                  px-3 py-3
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >
                <option value="MX">
                  🇲🇽 MX +52
                </option>

                <option value="US">
                  🇺🇸 US +1
                </option>
              </select>


              {/* TELÉFONO */}
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={
                  form.phoneCountry === "MX"
                    ? "(322) 123-4567"
                    : "(555) 123-4567"
                }
                value={form.phone}
                onChange={(e) => {

                  const formatted =
                    formatPhone(e.target.value)

                  setForm({
                    ...form,
                    phone: formatted
                  })

                  if (errors.phone) {
                    setErrors({
                      ...errors,
                      phone: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const digits =
                    form.phone.replace(/\D/g, "")

                  if (!digits) {

                    setErrors({
                      ...errors,
                      phone:
                        "El teléfono es obligatorio"
                    })

                    return
                  }

                  if (digits.length !== 10) {

                    setErrors({
                      ...errors,
                      phone:
                        "Ingresa un teléfono válido de 10 dígitos"
                    })

                  }

                }}
                className={`
                  flex-1
                  min-w-0
                  rounded-xl
                  px-4 py-3
                  outline-none
                  border

                  ${
                    errors.phone
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500"
                  }
                `}
              />


              {/* EXTENSIÓN */}
              <div className="flex items-center gap-1 shrink-0">

                <span className="text-sm text-gray-400">
                  ext.
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123"
                  value={form.phoneExtension}
                  onChange={(e) => {

                    const value =
                      e.target.value.replace(/\D/g, "")

                    setForm({
                      ...form,
                      phoneExtension: value
                    })

                  }}
                  className="
                    w-20
                    border border-gray-200
                    rounded-xl
                    px-3 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>


            {/* ERROR */}
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.phone}
              </p>
            )}

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
              type="text"
              autoComplete="address-level2"
              placeholder="Puerto Vallarta"
              value={form.city}
              aria-invalid={!!errors.city}
              className={`
                w-full rounded-xl px-4 py-3 outline-none border transition
                ${
                  errors.city
                    ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-500"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                }
              `}
              onChange={(e) => {

                setForm({
                  ...form,
                  city: e.target.value
                })

                if (errors.city) {

                  setErrors({
                    ...errors,
                    city: undefined
                  })
                }

              }}
            />

            {errors.city && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.city}
              </p>
            )}
          </div>

          {/* STATE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Estado
            </label>

           <input
              type="text"
              autoComplete="address-level1"
              placeholder="Jalisco"
              value={form.state}
              aria-invalid={!!errors.state}
              className={`
                w-full rounded-xl px-4 py-3 outline-none border transition
                ${
                  errors.state
                    ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-500"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                }
              `}
              onChange={(e) => {

                setForm({
                  ...form,
                  state: e.target.value
                })

                if (errors.state) {

                  setErrors({
                    ...errors,
                    state: undefined
                  })
                }

              }}
            />

            {errors.state && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.state}
              </p>
            )}
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
            maxLength={2000}
            placeholder="Información del doctor..."
            value={form.description}
            aria-invalid={!!errors.description}
            className={`
              w-full rounded-2xl px-4 py-3 outline-none border transition
              ${
                errors.description
                  ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              }
            `}
            onChange={(e) => {

              setForm({
                ...form,
                description: e.target.value
              })

              if (errors.description) {

                setErrors({
                  ...errors,
                  description: undefined
                })
              }

            }}
          />

          <div className="flex justify-between mt-1.5">

            {errors.description ? (
              <p className="text-sm text-red-500">
                {errors.description}
              </p>
            ) : (
              <span />
            )}

            <span className="text-xs text-gray-400">
              {form.description.length}/2000
            </span>

          </div>
        </div>

        {/* ACTIVO */}
        <div className="mt-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked
                })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Doctor activo
              </p>

              <p className="text-xs text-gray-500">
                El perfil podrá mostrarse públicamente.
              </p>
            </div>

          </label>


          <label className="flex items-start gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={form.featuredHome}
              onChange={(e) =>
                setForm({
                  ...form,
                  featuredHome: e.target.checked
                })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Mostrar en Home
              </p>

              <p className="text-xs text-gray-500">
                Destacar este doctor en la página principal.
              </p>
            </div>

          </label>

        </div>
            

        { /* HOME TOP FEATURED */} 
        {/* <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featuredHome}
            onChange={(e) =>
              setForm({ ...form, featuredHome: e.target.checked })
            }
          />
          Mostrar en Home
        </label>    */}

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
                onChange={(e) => {
                  setSelectedCategory(e.target.value)

                  if (errors.category) {
                    setErrors({
                      ...errors,
                      category: undefined
                    })
                  }
                }}
                className="mr-2"
              />

              {cat.name}

            </label>

          ))}

          {errors.category && (
            <p className="md:col-span-3 text-sm text-red-500">
              {errors.category}
            </p>
          )}
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

}