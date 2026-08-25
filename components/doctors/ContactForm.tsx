"use client"

import { useState } from "react"

interface ContactFormProps {
  doctorId: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export default function ContactForm({
  doctorId,
}: ContactFormProps) {

  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState("")

  const [error, setError] = useState("")

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })


  // =========================
  // CAMBIAR CAMPOS
  // =========================

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {

    const {
      name,
      value,
    } = e.target

    setForm({
      ...form,
      [name]: value,
    })

    // Quitar error del campo
    // cuando el usuario empieza
    // a corregirlo

    setErrors({
      ...errors,
      [name]: undefined,
    })

    setError("")
    setSuccess("")
  }


  // =========================
  // VALIDACIÓN FRONTEND
  // =========================

  function validateForm() {

    const newErrors: FormErrors = {}

    // NOMBRE

    if (!form.name.trim()) {

      newErrors.name =
        "El nombre es obligatorio"

    } else if (
      form.name.trim().length < 2
    ) {

      newErrors.name =
        "El nombre debe tener al menos 2 caracteres"

    }


    // EMAIL

    if (!form.email.trim()) {

      newErrors.email =
        "El email es obligatorio"

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {

      newErrors.email =
        "Introduce un email válido"

    }


    // TELÉFONO

    if (
      form.phone.trim() &&
      form.phone.trim().length < 7
    ) {

      newErrors.phone =
        "El teléfono no parece válido"

    }


    // MENSAJE

    if (!form.message.trim()) {

      newErrors.message =
        "El mensaje es obligatorio"

    } else if (
      form.message.trim().length < 5
    ) {

      newErrors.message =
        "El mensaje debe tener al menos 5 caracteres"

    }


    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }


  // =========================
  // ENVIAR
  // =========================

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    setSuccess("")
    setError("")

    // Primero validamos
    // en el navegador

    const isValid =
      validateForm()

    if (!isValid) {
      return
    }

    setLoading(true)

    try {

      const response =
        await fetch("/api/contact", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...form,

            doctorId,

          }),

        })


      const data =
        await response.json()


      // =========================
      // ERROR DEL BACKEND
      // =========================

      if (!response.ok) {

        // Errores provenientes
        // de Zod

        if (
          data.details?.fieldErrors
        ) {

          const backendErrors =
            data.details.fieldErrors

          setErrors({
            name:
              backendErrors.name?.[0],

            email:
              backendErrors.email?.[0],

            phone:
              backendErrors.phone?.[0],

            message:
              backendErrors.message?.[0],
          })

          return
        }

        throw new Error(
          data.error ||
          "No se pudo enviar el mensaje"
        )
      }


      // =========================
      // ÉXITO
      // =========================

      setSuccess(
        "Mensaje enviado correctamente. El doctor recibirá tu mensaje."
      )

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      setErrors({})


    } catch (err) {

      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al enviar el mensaje."
      )

    } finally {

      setLoading(false)

    }
  }


  return (

    <div className="
      glass-soft
      p-6
      rounded-2xl
      shadow-sm
    ">

      <h2 className="font-bold mb-2">
        Contactar doctor
      </h2>

      <p className="
        text-sm
        text-slate-500
        mb-5
      ">
        Completa el formulario y el doctor
        recibirá tu mensaje.
      </p>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >

       {/* NOMBRE */}
        
        <div>

          <label
            htmlFor="name"
            className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-1
            "
          >
            Nombre
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            disabled={loading}
            maxLength={100}
            className={`
              w-full
              border
              p-3
              rounded-xl
              outline-none
              transition
              ${
                errors.name
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200"
              }
            `}
          />

          {errors.name && (

            <p className="
              mt-1
              text-sm
              text-red-600
            ">
              {errors.name}
            </p>

          )}

        </div>

       {/* EMAIL */}
        
        <div>

          <label
            htmlFor="email"
            className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-1
            "
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            disabled={loading}
            maxLength={150}
            className={`
              w-full
              border
              p-3
              rounded-xl
              outline-none
              transition
              ${
                errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200"
              }
            `}
          />

          {errors.email && (

            <p className="
              mt-1
              text-sm
              text-red-600
            ">
              {errors.email}
            </p>

          )}

        </div>

       {/* TELÉFONO */}
        
        <div>

          <label
            htmlFor="phone"
            className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-1
            "
          >
            Teléfono
            <span className="
              text-slate-400
              font-normal
            ">
              {" "}
              (opcional)
            </span>
          </label>

          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Tu teléfono"
            disabled={loading}
            maxLength={30}
            className={`
              w-full
              border
              p-3
              rounded-xl
              outline-none
              transition
              ${
                errors.phone
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200"
              }
            `}
          />

          {errors.phone && (

            <p className="
              mt-1
              text-sm
              text-red-600
            ">
              {errors.phone}
            </p>

          )}

        </div>

       {/* MENSAJE */}
        
        <div>

          <label
            htmlFor="message"
            className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-1
            "
          >
            Mensaje
          </label>

          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            disabled={loading}
            maxLength={3000}
            className={`
              w-full
              border
              p-3
              rounded-xl
              min-h-[140px]
              outline-none
              transition
              ${
                errors.message
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200"
              }
            `}
          />

          {errors.message && (

            <p className="
              mt-1
              text-sm
              text-red-600
            ">
              {errors.message}
            </p>

          )}

        </div>

       {/* ERROR GENERAL */}
        
        {error && (

          <div className="
            rounded-xl
            bg-red-50
            border
            border-red-200
            text-red-700
            px-4
            py-3
            text-sm
          ">
            {error}
          </div>

        )}

       {/* ÉXITO */}
        
        {success && (

          <div className="
            rounded-xl
            bg-emerald-50
            border
            border-emerald-200
            text-emerald-700
            px-4
            py-3
            text-sm
          ">
            {success}
          </div>

        )}

       {/* BOTÓN */}
        
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-sky-500
            to-cyan-500
            px-6
            py-3
            font-semibold
            text-white
            shadow-xl
            transition
            hover:-translate-y-1
            hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.6)]
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:translate-y-0
          "
        >

          {loading
            ? "Enviando..."
            : "Enviar mensaje"}

        </button>

      </form>

    </div>
  )
}
