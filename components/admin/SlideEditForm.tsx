"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import { Switch } from "@headlessui/react"

interface Props {
  slide?: any
  mode: "create" | "edit"
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
}

export default function SlideEditForm({
  slide,
  mode,
  onSubmit,
  loading,
}: Props) {
  const router = useRouter()

  // =========================
  // IMÁGENES (estado editable)
  // =========================
  const [image, setImage] = useState(slide?.image || "")
  const [imageTablet, setImageTablet] = useState(slide?.imageTablet || "")
  const [imageMobile, setImageMobile] = useState(slide?.imageMobile || "")

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
    return data.url // <- Cloudinary URL
  }

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const payload = {
      title: formData.get("title")?.toString() || "",
      highlight: formData.get("highlight")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      link: formData.get("link")?.toString() || "",
      locale: formData.get("locale")?.toString() || "",
      order: Number(formData.get("order") || 0),      
      // isActive: formData.get("isActive") === "on",
      isActive: formData.get("isActive") === "true",
      
      // startAt: formData.get("startAt") || null,
      // endAt: formData.get("endAt") || null,

      startAt: startDate,
      endAt: endDate,

      image,
      imageTablet,
      imageMobile,
    }

    await onSubmit(payload)

    // router.push("/admin/slides")
    // router.refresh()
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
          <p className="text-sm font-medium">Desktop</p>

          {image && (
            <img
              src={image}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const url = await uploadImage(file)
              setImage(url)
            }}
          />
        </div>

        {/* TABLET */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Tablet</p>

          {imageTablet && (
            <img
              src={imageTablet}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const url = await uploadImage(file)
              setImageTablet(url)
            }}
          />
        </div>

        {/* MOBILE */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Mobile</p>

          {imageMobile && (
            <img
              src={imageMobile}
              className="h-40 w-full object-cover rounded-xl border"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const url = await uploadImage(file)
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

      <input
        name="link"
        defaultValue={slide?.link}
        placeholder="Link"
        className="w-full border p-3 rounded-xl"
      />

      {/* <input
        name="locale"
        defaultValue={slide?.locale || "es"}
        className="w-full border p-3 rounded-xl"
      /> */}

      <select
        name="locale"
        defaultValue={slide?.locale || "es"}
        className="w-full border p-3 rounded-xl bg-white"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>

      <input
        name="order"
        type="number"
        defaultValue={slide?.order || 0}
        className="w-full border p-3 rounded-xl"
      />

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* START DATE */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de inicio
          </label>

          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecciona fecha de inicio"
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* END DATE */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de finalización
          </label>

          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecciona fecha de fin"
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
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

      {/* BUTTON */}
      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl"
      >
        {mode === "create" ? "Crear Slide" : "Guardar cambios"}
      </button>
    </form>
  )
}