"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays } from "lucide-react"
import DatePicker from "react-datepicker"
import { Switch } from "@headlessui/react"

interface SubmitResult {
  success: boolean
  error?: string
}

interface Props {
  slide?: any
  mode: "create" | "edit"
  onSubmit:  (data: any) => Promise<SubmitResult>
  loading?: boolean
}

export default function SlideEditForm({
  slide,
  mode,
  onSubmit,
  loading,
}: Props) {
  const router = useRouter()

  const [errorMessage, setErrorMessage] =
  useState("")

  const [successMessage, setSuccessMessage] =
  useState("")

  // IMÁGENES (estado editable)

  const [image, setImage] = useState(slide?.image || "")
  const [imageTablet, setImageTablet] = useState(slide?.imageTablet || "")
  const [imageMobile, setImageMobile] = useState(slide?.imageMobile || "")

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const tabletInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const [startDate, setStartDate] = useState<Date | null>(
    slide?.startAt ? new Date(slide.startAt) : null
  )

  const [endDate, setEndDate] = useState<Date | null>(
    slide?.endAt ? new Date(slide.endAt) : null
  )

  const [enabled, setEnabled] = useState(
    slide?.isActive ?? true
  )

  // =========================
  // UPLOAD A CLOUDINARY
  // =========================
  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    console.log("Status:", res.status)
    console.log("Data:", data)

    if (!res.ok) {
      throw new Error(data.error)
    }
    return data.url // <- Cloudinary URL
  }

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setErrorMessage("")
    setSuccessMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const orderValue =
    formData
      .get("order")
      ?.toString()
      .trim() || ""

    // valido el order
    if (!orderValue) {
      setErrorMessage(
        "Debes ingresar un orden."
      )
      return
    }

    const order =
      Number(orderValue)

    if (
      !Number.isInteger(order) ||
      order < 1 ||
      order > 20
    ) {

      setErrorMessage(
        "El orden debe ser un número entero entre 1 y 20."
      )

      return
    }

    const payload = {
      title: formData.get("title")?.toString() || "",
      highlight: formData.get("highlight")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      link: formData.get("link")?.toString() || "",
      locale: formData.get("locale")?.toString() || "es",
      order,     
     
      isActive: formData.get("isActive") === "true",

      startAt: startDate,
      endAt: endDate,

      image,
      imageTablet,
      imageMobile,
    }

    try {

      const result = await onSubmit(payload)

      if (!result) {
        setErrorMessage(
          "El servidor no devolvió una respuesta."
        )
        return
      }

      if (!result.success) {
        setErrorMessage(
          result.error ||
          "Error actualizando el slide."
        )
        return
      }

      setSuccessMessage(
        mode === "create"
          ? "¡El slide se creó correctamente!"
          : "¡El slide se actualizó correctamente!"
      )

      setTimeout(() => {
        router.push(
          "/admin/slides"
        )
        router.refresh()
      }, 1200)

    } catch (error) {
      console.error(error)
      setErrorMessage(
        "Ocurrió un error inesperado."
      )
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >
      {/* ================= IMAGES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* DESKTOP */}
        <div className="space-y-2">
          {/* <p className="text-sm font-medium">Desktop</p> */}
          {image && (
            <img
              src={image}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

          {/* <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]             
              if (!file) return
              const url = await uploadImage(file)
              setImage(url)
            }}
          /> */}
          <button
            type="button"
            onClick={() => desktopInputRef.current?.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 border rounded-xl py-3 text-sm"
          >
            {image ? "Cambiar imagen Desktop" : "Seleccionar imagen Desktop"}
          </button>

          <input
            ref={desktopInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]

              if (!file) return

              const url = await uploadImage(file)
              console.log("URL PARA PREVIEW:", url)

              setImage(url)
            }}
          />
        </div>

        {/* TABLET */}
        <div className="space-y-2">
          {/* <p className="text-sm font-medium">Tablet</p> */}

          {imageTablet && (
            <img
              src={imageTablet}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

          <button
            type="button"
            onClick={() => tabletInputRef.current?.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 border rounded-xl py-3 text-sm"
          >
            {imageTablet ? "Cambiar imagen Tablet" : "Seleccionar imagen Tablet"}
          </button>

          <input
            ref={tabletInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]

              if (!file) return

              const url = await uploadImage(file)
              console.log("URL PARA PREVIEW:", url)

              setImageTablet(url)
            }}
          />
        </div>

        {/* MOBILE */}
        <div className="space-y-2">
          {/* <p className="text-sm font-medium">Mobile</p> */}

          {imageMobile && (
            <img
              src={imageMobile}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

         <button
            type="button"
            onClick={() => mobileInputRef.current?.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 border rounded-xl py-3 text-sm"
          >
            {imageMobile ? "Cambiar imagen Mobile" : "Seleccionar imagen Mobile"}
          </button>

          <input
            ref={mobileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]

              if (!file) return

              const url = await uploadImage(file)
              console.log("URL PARA PREVIEW:", url)

              setImageMobile(url)
            }}
          />
        </div>
      </div>

      {/* ================= TEXTOS ================= */}
      <input
        name="title"
        defaultValue={slide?.title}
        placeholder="Título"
        className="w-full border p-3 rounded-xl"
      />

      <input
        name="highlight"
        defaultValue={slide?.highlight}
        placeholder="Highlight"
        className="w-full border p-3 rounded-xl"
      />

      <textarea
        name="description"
        defaultValue={slide?.description}
        placeholder="Descripción"
        className="w-full border p-3 rounded-xl h-28"
      />      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="locale"
          defaultValue={slide?.locale || "es"}
          className="w-full border p-3 rounded-xl bg-white"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>

        <input
          name="link"
          defaultValue={slide?.link}
          placeholder="Link"
          className="w-full border p-3 rounded-xl"
        />     

        <input
          name="order"
          type="number"
          min="0"
          max="20"
          step="1"
          required
          defaultValue={slide?.order ?? 1}
          onFocus={(e) => {

            if (e.currentTarget.value === "1") {
              e.currentTarget.value = ""
            }

          }}
          onChange={(e) => {

            const value =
              e.currentTarget.value

            // Permitir que quede vacío
            if (value === "") {
              return
            }

            const number =
              Number(value)

            if (number > 20) {
              e.currentTarget.value = "20"
            }

          }}
          className="w-full border p-3 rounded-xl"
        />
      </div>

      {/* DATES */}
      {/* <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          name="startAt"
          defaultValue={
            slide?.startAt
              ? new Date(slide.startAt).toISOString().slice(0, 16)
              : ""
          }
          className="border p-3 rounded-xl"
        />
        <input
          type="datetime-local"
          name="endAt"
         defaultValue={
          slide?.endAt
            ? new Date(slide.endAt).toISOString().slice(0, 16)
            : ""
          }
          className="border p-3 rounded-xl"
        />
      </div> */}

     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* START DATE */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Fecha de inicio
          </label>

          <div className="relative">
            <DatePicker
              wrapperClassName="w-full"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Selecciona fecha de inicio"
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-white
                px-4 py-3
                pr-12
                text-sm
                text-slate-700
                shadow-sm
                transition-all
                duration-200
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
                outline-none
              "
            />

            <CalendarDays
              size={19}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sky-500
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* END DATE */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Fecha de finalización
          </label>

          <div className="relative">
            <DatePicker
              wrapperClassName="w-full"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Selecciona fecha de fin"
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-white
                px-4 py-3
                pr-12
                text-sm
                text-slate-700
                shadow-sm
                transition-all
                duration-200
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
                outline-none
              "
            />

            <CalendarDays
              size={19}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sky-500
                pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* ACTIVE */}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
            enabled
                ? "bg-green-600"
                : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
        <span
            className={`${
                enabled
                    ? "translate-x-6"
                    : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
    </Switch>

    <input
        type="hidden"
        name="isActive"
        value={enabled ? "true" : "false"}
    />
      {/* <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={slide?.isActive ?? true}
        />
        Activo
      </label> */}

      {/* Mensajes */}

      {errorMessage && (
        <div className="
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          text-red-600
        ">
          {errorMessage}
        </div>
      )}

      {/* mensaje de exito */}
      {successMessage && (
        <div className="
          rounded-xl
          border
          border-green-200
          bg-green-50
          px-4
          py-3
          text-sm
          text-green-700
        ">
          {successMessage}
        </div>
      )}

      {/* BUTTON */}
      <button
        disabled={loading}
        className="btn-form w-full py-3 rounded-xl"
      >
        {mode === "create" ? "Crear Slide" : "Guardar cambios"}
      </button>
    </form>
  )
}