"use client"

import { useEffect, useState } from "react"
import EditPlaceModal from "@/components/admin/EditPlaceModal"


type PlaceFormErrors = {
  name?: string
  type?: string
  description?: string

  city?: string
  state?: string
  address?: string
  postalCode?: string

  phone?: string
  phone2?: string
  mobile?: string
  email?: string

  website?: string
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string

  categoryIds?: string
  doctorIds?: string
  treatmentIds?: string
}

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const PHONE_DIGITS_REGEX =
  /^\d{10}$/

const POSTAL_CODE_REGEX =
  /^\d{5}$/

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[^\s]+\.[^\s]+/i


function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}



export default function AdminPlaces() {
  const [places, setPlaces] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [treatments, setTreatments] = useState<string[]>([])
  const [treatmentInput, setTreatmentInput] = useState("")

  type FormErrors = {
    name?: string
    type?: string
    description?: string
    city?: string
    state?: string
    address?: string
    postalCode?: string
    phone?: string
    phone2?: string
    mobile?: string
    email?: string
    website?: string
    facebook?: string
    instagram?: string
    youtube?: string
    twitter?: string
    categoryIds?: string
    doctorIds?: string
  }

  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)


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

    const cats = await fetch("/api/admin/categories?type=PLACE")
    setCategories(await cats.json())
  }

  useEffect(() => {
    load()
  }, [])

  const validateForm = () => {
    const newErrors: PlaceFormErrors = {}

    const name = form.name.trim()
    const description = form.description.trim()

    const city = form.city.trim()
    const state = form.state.trim()
    const address = form.address.trim()
    const postalCode = form.postalCode.trim()

    const phone = form.phone.trim()
    const phone2 = form.phone2.trim()
    const mobile = form.mobile.trim()
    const email = form.email.trim()

    const website = form.website.trim()
    const facebook = form.facebook.trim()
    const instagram = form.instagram.trim()
    const youtube = form.youtube.trim()
    const twitter = form.twitter.trim()

    // NOMBRE

    if (!name) {
      newErrors.name =
        "El nombre es obligatorio"
    } else if (name.length < 3) {
      newErrors.name =
        "El nombre debe tener al menos 3 caracteres"
    } else if (name.length > 150) {
      newErrors.name =
        "El nombre no puede superar los 150 caracteres"
    }

    // TIPO
  
    const validTypes = [
      "HOSPITAL",
      "CLINIC",
      "LAB",
      "DENTAL",
      "OFTALMOLOGY"
    ]

    if (!validTypes.includes(form.type)) {
      newErrors.type =
        "Selecciona un tipo de establecimiento válido"
    }

    // DESCRIPCIÓN

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

    // UBICACIÓN
  
    if (!city) {
      newErrors.city =
        "La ciudad es obligatoria"
    } else if (city.length < 2) {
      newErrors.city =
        "Ingresa una ciudad válida"
    } else if (city.length > 100) {
      newErrors.city =
        "La ciudad no puede superar los 100 caracteres"
    }

    if (!state) {
      newErrors.state =
        "El estado es obligatorio"
    } else if (state.length < 2) {
      newErrors.state =
        "Ingresa un estado válido"
    } else if (state.length > 100) {
      newErrors.state =
        "El estado no puede superar los 100 caracteres"
    }

    if (!address) {
      newErrors.address =
        "La dirección es obligatoria"
    } else if (address.length < 5) {
      newErrors.address =
        "Ingresa una dirección válida"
    } else if (address.length > 250) {
      newErrors.address =
        "La dirección no puede superar los 250 caracteres"
    }

    if (!postalCode) {
      newErrors.postalCode =
        "El código postal es obligatorio"
    } else if (!POSTAL_CODE_REGEX.test(postalCode)) {
      newErrors.postalCode =
        "El código postal debe tener 5 dígitos"
    }

    // TELÉFONOS

    const phoneDigits = form.phone.replace(/\D/g, "")

    if (
      phoneDigits.length > 0 &&
      !PHONE_DIGITS_REGEX.test(phoneDigits)
    ) {
      newErrors.phone =
        "El teléfono debe tener 10 dígitos"
    }

    const phone2Digits = form.phone2.replace(/\D/g, "")

    if (
      phone2Digits.length > 0 &&
      !PHONE_DIGITS_REGEX.test(phone2Digits)
    ) {
      newErrors.phone2 =
        "El teléfono debe tener 10 dígitos"
    }

    const mobileDigits = form.mobile.replace(/\D/g, "")

    if (
      mobileDigits.length > 0 &&
      !PHONE_DIGITS_REGEX.test(mobileDigits)
    ) {
      newErrors.mobile =
        "El teléfono debe tener 10 dígitos"
    }

    // EMAIL
  
    if (email && !EMAIL_REGEX.test(email)) {
      newErrors.email =
        "Ingresa un email válido"
    }

     // URLS
    const urlFields = [
      {
        value: website,
        key: "website" as const,
        label: "sitio web"
      },
      {
        value: facebook,
        key: "facebook" as const,
        label: "Facebook"
      },
      {
        value: instagram,
        key: "instagram" as const,
        label: "Instagram"
      },
      {
        value: youtube,
        key: "youtube" as const,
        label: "YouTube"
      },
      {
        value: twitter,
        key: "twitter" as const,
        label: "Twitter"
      }
    ]

    // REDES
    urlFields.forEach(({ value, key, label }) => {
      if (value && !URL_REGEX.test(value)) {
        newErrors[key] =
          `Ingresa una URL válida para ${label}`
      }
    })

    // ESPECIALIDADES
    
    if (form.categoryIds.length === 0) {
      newErrors.categoryIds =
        "Selecciona al menos una especialidad"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {

      setSaving(true)

      const normalizedForm = {
        ...form,

        name: form.name.trim(),
        description: form.description.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        address: form.address.trim(),
        postalCode: form.postalCode.trim(),

        phone: form.phone
          ? formatPhone(form.phone)
          : "",

        phone2: form.phone2
          ? formatPhone(form.phone2)
          : "",

        mobile: form.mobile
          ? formatPhone(form.mobile)
          : "",

        email: form.email.trim(),

        website: form.website.trim(),
        facebook: form.facebook.trim(),
        instagram: form.instagram.trim(),
        youtube: form.youtube.trim(),
        twitter: form.twitter.trim()
      }

      const res = await fetch(
        "/api/admin/places",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            normalizedForm
          )
        }
      )

      if (!res.ok) {

        const data = await res.json()

        throw new Error(
          data.error ||
          "Error creando place"
        )
      }

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
        categoryIds: [],
        treatmentIds: []
      })

      setErrors({})

      await load()

    } catch (error) {

      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : "Error guardando place"
      )

    } finally {

      setSaving(false)

    }
  }


  const remove = async (id: string) => {
    if (!confirm("Eliminar?")) return

    await fetch(`/api/admin/places/${id}`, {
      method: "DELETE"
    })

    load()
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="p-8 space-y-10 bg-white rounded-3xl shadow-sm">
        <div className="mb-6">

          <h1 className="font-heanding text-sky-800 text-2xl font-bold text-gray-800">
            Crear Place
          </h1>

          <p className="text-base text-slate-500 mt-1">
            Información general de la clínica o hospital
          </p>

        </div>
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
                type="text"
                placeholder="Nombre de la clínica"
                value={form.name}
                maxLength={150}
                autoComplete="organization"
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name
                    ? "place-name-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
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

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value = form.name.trim()

                  if (!value) {

                    setErrors({
                      ...errors,
                      name: "El nombre es obligatorio"
                    })

                  } else if (value.length < 3) {

                    setErrors({
                      ...errors,
                      name:
                        "El nombre debe tener al menos 3 caracteres"
                    })

                  } else if (value.length > 150) {

                    setErrors({
                      ...errors,
                      name:
                        "El nombre no puede superar los 150 caracteres"
                    })

                  }

                }}
              />

              {errors.name && (
                <p
                  id="place-name-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Categoría
              </label>

              <select
                value={form.type}
                aria-invalid={!!errors.type}
                aria-describedby={
                  errors.type
                    ? "place-type-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition bg-white
                  ${
                    errors.type
                      ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    type: e.target.value
                  })

                  if (errors.type) {
                    setErrors({
                      ...errors,
                      type: undefined
                    })
                  }

                }}
              >
                <option value="HOSPITAL">
                  Hospital
                </option>

                <option value="CLINIC">
                  Clínica
                </option>

                <option value="LAB">
                  Laboratorio
                </option>

                <option value="DENTAL">
                  Dental
                </option>

                <option value="OFTALMOLOGY">
                  Oftalmología
                </option>

              </select>

              {errors.type && (
                <p
                  id="place-type-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.type}
                </p>
              )}

            </div>

          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Descripción
            </label>

            <textarea
              rows={4}
              maxLength={2000}
              placeholder="Descripción del lugar..."
              value={form.description}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description
                  ? "place-description-error"
                  : undefined
              }
              className={`
                w-full rounded-xl px-4 py-3 outline-none border transition resize-none
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
                <p
                  id="place-description-error"
                  className="text-sm text-red-500"
                >
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
        </div>

        {/* UBICACION */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Ubicación
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Ciudad
              </label>

              <input
                type="text"
                placeholder="Puerto Vallarta"
                value={form.city}
                maxLength={100}
                autoComplete="address-level2"
                aria-invalid={!!errors.city}
                aria-describedby={
                  errors.city
                    ? "place-city-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.city
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                onBlur={() => {

                  const value = form.city.trim()

                  if (!value) {

                    setErrors({
                      ...errors,
                      city: "La ciudad es obligatoria"
                    })

                  } else if (value.length < 2) {

                    setErrors({
                      ...errors,
                      city: "Ingresa una ciudad válida"
                    })

                  }

                }}
              />

              {errors.city && (
                <p
                  id="place-city-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.city}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Estado
              </label>

              <input
                type="text"
                placeholder="Jalisco"
                value={form.state}
                maxLength={100}
                autoComplete="address-level1"
                aria-invalid={!!errors.state}
                aria-describedby={
                  errors.state
                    ? "place-state-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.state
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                onBlur={() => {

                  const value = form.state.trim()

                  if (!value) {

                    setErrors({
                      ...errors,
                      state: "El estado es obligatorio"
                    })

                  } else if (value.length < 2) {

                    setErrors({
                      ...errors,
                      state: "Ingresa un estado válido"
                    })

                  }

                }}
              />

              {errors.state && (
                <p
                  id="place-state-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.state}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Dirección
              </label>

              <input
                type="text"
                placeholder="Av. Francisco Medina Ascencio #123"
                value={form.address}
                maxLength={250}
                autoComplete="street-address"
                aria-invalid={!!errors.address}
                aria-describedby={
                  errors.address
                    ? "place-address-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.address
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    address: e.target.value
                  })

                  if (errors.address) {
                    setErrors({
                      ...errors,
                      address: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value = form.address.trim()

                  if (!value) {

                    setErrors({
                      ...errors,
                      address:
                        "La dirección es obligatoria"
                    })

                  } else if (value.length < 5) {

                    setErrors({
                      ...errors,
                      address:
                        "Ingresa una dirección válida"
                    })

                  }

                }}
              />

              {errors.address && (
                <p
                  id="place-address-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.address}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Código Postal
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="48300"
                maxLength={5}
                value={form.postalCode}
                aria-invalid={!!errors.postalCode}
                aria-describedby={
                  errors.postalCode
                    ? "place-postal-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.postalCode
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 5)

                  setForm({
                    ...form,
                    postalCode: value
                  })

                  if (errors.postalCode) {
                    setErrors({
                      ...errors,
                      postalCode: undefined
                    })
                  }

                }}
                onBlur={() => {

                  if (!form.postalCode) {

                    setErrors({
                      ...errors,
                      postalCode:
                        "El código postal es obligatorio"
                    })

                  } else if (
                    form.postalCode.length !== 5
                  ) {

                    setErrors({
                      ...errors,
                      postalCode:
                        "El código postal debe tener 5 dígitos"
                    })

                  }

                }}
              />

              {errors.postalCode && (
                <p
                  id="place-postal-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.postalCode}
                </p>
              )}
            </div>


          </div>
        </div>

        {/* CONTACTO */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Contacto
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Teléfono fijo
              </label>

              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(322) 123-4567"
                value={form.phone}
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone
                    ? "place-phone-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.phone
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
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

                  if (
                    digits &&
                    digits.length !== 10
                  ) {

                    setErrors({
                      ...errors,
                      phone:
                        "El teléfono debe tener 10 dígitos"
                    })

                  }

                }}
              />

              {errors.phone && (
                <p
                  id="place-phone-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.phone}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Teléfono fijo 2
              </label>

              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(322) 123-4567"
                value={form.phone2}
                aria-invalid={!!errors.phone2}
                aria-describedby={
                  errors.phone2
                    ? "place-phone2-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.phone2
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  const formatted =
                    formatPhone(e.target.value)

                  setForm({
                    ...form,
                    phone2: formatted
                  })

                  if (errors.phone2) {
                    setErrors({
                      ...errors,
                      phone2: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const digits =
                    form.phone2.replace(/\D/g, "")

                  if (
                    digits &&
                    digits.length !== 10
                  ) {

                    setErrors({
                      ...errors,
                      phone2:
                        "El teléfono debe tener 10 dígitos"
                    })

                  }

                }}
              />

              {errors.phone2 && (
                <p
                  id="place-phone2-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.phone2}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Celular
              </label>

              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(322) 123-4567"
                value={form.mobile}
                aria-invalid={!!errors.mobile}
                aria-describedby={
                  errors.mobile
                    ? "place-mobile-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.mobile
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  const formatted =
                    formatPhone(e.target.value)

                  setForm({
                    ...form,
                    mobile: formatted
                  })

                  if (errors.mobile) {
                    setErrors({
                      ...errors,
                      mobile: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const digits =
                    form.mobile.replace(/\D/g, "")

                  if (
                    digits &&
                    digits.length !== 10
                  ) {

                    setErrors({
                      ...errors,
                      mobile:
                        "El celular debe tener 10 dígitos"
                    })

                  }

                }}
              />

              {errors.mobile && (
                <p
                  id="place-mobile-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.mobile}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                E-mail
              </label>

              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="contacto@clinica.com"
                value={form.email}
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email
                    ? "place-email-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.email
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
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

                  const email =
                    form.email.trim()

                  if (
                    email &&
                    !EMAIL_REGEX.test(email)
                  ) {

                    setErrors({
                      ...errors,
                      email:
                        "Ingresa un email válido"
                    })

                  }

                }}
              />

              {errors.email && (
                <p
                  id="place-email-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.email}
                </p>
              )}
            </div>


          </div>
        </div>

        {/* REDES */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Redes Sociales
          </h3>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Sitio web
              </label>

              <input
                type="url"
                inputMode="url"
                placeholder="https://www.clinica.com"
                value={form.website}
                aria-invalid={!!errors.website}
                aria-describedby={
                  errors.website
                    ? "place-website-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.website
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    website: e.target.value
                  })

                  if (errors.website) {
                    setErrors({
                      ...errors,
                      website: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value =
                    form.website.trim()

                  if (
                    value &&
                    !URL_REGEX.test(value)
                  ) {

                    setErrors({
                      ...errors,
                      website:
                        "Ingresa una URL válida"
                    })

                  }

                }}
              />

              {errors.website && (
                <p
                  id="place-website-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.website}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Facebook
              </label>

              <input
                type="url"
                inputMode="url"
                placeholder="https://facebook.com/clinica"
                value={form.facebook}
                aria-invalid={!!errors.facebook}
                aria-describedby={
                  errors.facebook
                    ? "place-facebook-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.facebook
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    facebook: e.target.value
                  })

                  if (errors.facebook) {
                    setErrors({
                      ...errors,
                      facebook: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value =
                    form.facebook.trim()

                  if (
                    value &&
                    !URL_REGEX.test(value)
                  ) {

                    setErrors({
                      ...errors,
                      facebook:
                        "Ingresa una URL válida de Facebook"
                    })

                  }

                }}
              />

              {errors.facebook && (
                <p
                  id="place-facebook-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.facebook}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Instagram
              </label>

              <input
                type="url"
                inputMode="url"
                placeholder="https://instagram.com/clinica"
                value={form.instagram}
                aria-invalid={!!errors.instagram}
                aria-describedby={
                  errors.instagram
                    ? "place-instagram-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.instagram
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    instagram: e.target.value
                  })

                  if (errors.instagram) {
                    setErrors({
                      ...errors,
                      instagram: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value =
                    form.instagram.trim()

                  if (
                    value &&
                    !URL_REGEX.test(value)
                  ) {

                    setErrors({
                      ...errors,
                      instagram:
                        "Ingresa una URL válida de Instagram"
                    })

                  }

                }}
              />

              {errors.instagram && (
                <p
                  id="place-instagram-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.instagram}
                </p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                YouTube
              </label>

              <input
                type="url"
                inputMode="url"
                placeholder="https://youtube.com/@clinica"
                value={form.youtube}
                aria-invalid={!!errors.youtube}
                aria-describedby={
                  errors.youtube
                    ? "place-youtube-error"
                    : undefined
                }
                className={`
                  w-full rounded-xl px-4 py-3 outline-none border transition
                  ${
                    errors.youtube
                      ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }
                `}
                onChange={(e) => {

                  setForm({
                    ...form,
                    youtube: e.target.value
                  })

                  if (errors.youtube) {
                    setErrors({
                      ...errors,
                      youtube: undefined
                    })
                  }

                }}
                onBlur={() => {

                  const value =
                    form.youtube.trim()

                  if (
                    value &&
                    !URL_REGEX.test(value)
                  ) {

                    setErrors({
                      ...errors,
                      youtube:
                        "Ingresa una URL válida de YouTube"
                    })

                  }

                }}
              />

              {errors.youtube && (
                <p
                  id="place-youtube-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.youtube}
                </p>
              )}
            </div>


           <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Twitter / X
            </label>

            <input
              type="url"
              inputMode="url"
              placeholder="https://x.com/clinica"
              value={form.twitter}
              aria-invalid={!!errors.twitter}
              aria-describedby={
                errors.twitter
                  ? "place-twitter-error"
                  : undefined
              }
              className={`
                w-full rounded-xl px-4 py-3 outline-none border transition
                ${
                  errors.twitter
                    ? "border-red-400 bg-red-50/50 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }
              `}
              onChange={(e) => {

                setForm({
                  ...form,
                  twitter: e.target.value
                })

                if (errors.twitter) {
                  setErrors({
                    ...errors,
                    twitter: undefined
                  })
                }

              }}
              onBlur={() => {

                const value =
                  form.twitter.trim()

                if (
                  value &&
                  !URL_REGEX.test(value)
                ) {

                  setErrors({
                    ...errors,
                    twitter:
                      "Ingresa una URL válida de Twitter/X"
                  })

                }

              }}
            />

            {errors.twitter && (
              <p
                id="place-twitter-error"
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.twitter}
              </p>
            )}
          </div>


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
                className={`
                  border rounded-2xl p-4
                  cursor-pointer
                  transition
                  ${
                    form.categoryIds.includes(cat.id)
                      ? "border-blue-500 bg-blue-50"
                      : errors.categoryIds
                        ? "border-red-200 hover:border-red-300"
                        : "border-gray-200 hover:border-blue-300"
                  }
                `}
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

                      if (errors.categoryIds) {
                        setErrors({
                          ...errors,
                          categoryIds: undefined
                        })
                      }

                    }}
                    className="
                      h-4
                      w-4
                      rounded
                      border-gray-300
                      text-green-600
                      focus:ring-green-500
                    "
                  />

                  <span className="font-medium">
                    {cat.name}
                  </span>

                </div>

              </label>

            ))}

          </div>

          {errors.categoryIds && (
            <p className="text-sm text-red-500">
              {errors.categoryIds}
            </p>
          )}

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
                className={`
                  border rounded-2xl p-4
                  cursor-pointer
                  transition
                  ${
                    form.doctorIds.includes(doc.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}
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
                    className="
                      h-4
                      w-4
                      rounded
                      border-gray-300
                      text-blue-600
                      focus:ring-blue-500
                    "
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
            disabled={saving}
            className="
              bg-gradient-to-r from-blue-600 to-sky-500
              hover:opacity-90
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              px-8
              py-3
              rounded-2xl
              font-semibold
              shadow-lg
              hover:scale-[1.01] transition
            "
          >
            {saving
              ? "Guardando..."
              : "Guardar Place"}
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