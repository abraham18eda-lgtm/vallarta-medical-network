// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import ImageUploadPreview from "@/components/admin/ImageUploadPreview"

// export default function EditSlideForm({ slide }: any) {
//   const router = useRouter()

//   const [image, setImage] = useState(slide.image)
//   const [imageTablet, setImageTablet] = useState(slide.imageTablet)
//   const [imageMobile, setImageMobile] = useState(slide.imageMobile)

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault()

//     const formData = new FormData(e.currentTarget as HTMLFormElement)

//     await fetch(`/api/admin/slides/${slide.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: formData.get("title"),
//         highlight: formData.get("highlight"),
//         description: formData.get("description"),
//         link: formData.get("link"),
//         order: Number(formData.get("order")),
//         isActive: formData.get("isActive") === "on",
//         image,
//         imageTablet,
//         imageMobile,
//       }),
//     })

//     router.push("/admin/slides")
//   }

//   return (
//     <div className="p-8">

//       <form onSubmit={onSubmit} className="space-y-6">

//         <div className="grid grid-cols-3 gap-4">
//           <ImageUploadPreview label="Desktop" defaultImage={slide.image} setImage={setImage} />
//           <ImageUploadPreview label="Tablet" defaultImage={slide.imageTablet} setImage={setImageTablet} />
//           <ImageUploadPreview label="Mobile" defaultImage={slide.imageMobile} setImage={setImageMobile} />
//         </div>

//         <input name="title" defaultValue={slide.title} className="input" />
//         <input name="highlight" defaultValue={slide.highlight} className="input" />
//         <textarea name="description" defaultValue={slide.description} className="input" />

//         <input name="link" defaultValue={slide.link} className="input" />
//         <input name="order" type="number" defaultValue={slide.order} className="input" />

//         <label className="flex gap-2">
//           <input type="checkbox" name="isActive" defaultChecked={slide.isActive} />
//           Activo
//         </label>

//         <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
//           Guardar cambios
//         </button>

//       </form>

//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import ImageUploadPreview from "@/components/admin/ImageUploadPreview"
// import { useRouter } from "next/navigation"

// export default function SlideEditForm({
//   mode,
//   slide,
//   onSubmit,
//   loading,
// }: {
//   mode: "create" | "edit"
//   slide?: any
//   onSubmit: (data: any) => Promise<void>
//   loading?: boolean
// }) {
//   const router = useRouter()

//   const [image, setImage] = useState(slide?.image || "")
//   const [imageTablet, setImageTablet] = useState(slide?.imageTablet || "")
//   const [imageMobile, setImageMobile] = useState(slide?.imageMobile || "")

//   const handleSubmit = async (e: any) => {
//     e.preventDefault()

//     const data = {
//       title: e.target.title.value,
//       highlight: e.target.highlight.value,
//       description: e.target.description.value,
//       link: e.target.link.value,
//       locale: e.target.locale.value,
//       order: Number(e.target.order.value),
//       isActive: e.target.isActive.checked,

//       image,
//       imageTablet,
//       imageMobile,

//       startAt: e.target.startAt.value
//         ? new Date(e.target.startAt.value)
//         : null,

//       endAt: e.target.endAt.value
//         ? new Date(e.target.endAt.value)
//         : null,
    
//     }

//     await onSubmit(data)

//     router.refresh()
//     router.push("/admin/slides")
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-3xl shadow space-y-6"
//     >
//       {/* IMAGES */}
//       <div className="grid grid-cols-3 gap-4">
//         <ImageUploadPreview
//           name="image"
//           label="Desktop"
//           setImage={setImage}
//           defaultImage={slide?.image}
//         />

//         <ImageUploadPreview
//           name="imageTablet"
//           label="Tablet"
//           setImage={setImageTablet}
//           defaultImage={slide?.imageTablet}
//         />

//         <ImageUploadPreview
//           name="imageMobile"
//           label="Mobile"
//           setImage={slide?.setImageMobile}
//           defaultImage={imageMobile}
//         />
//       </div>

//        {/* FORM GRID */}
//     <div className="grid md:grid-cols-2 gap-4">

//       <input
//         name="title"
//         defaultValue={slide?.title}
//         placeholder="Título"
//         className="input border rounded-xl p-3"
//       />

//       <input
//         name="highlight"
//         defaultValue={slide?.highlight}
//         placeholder="Highlight"
//         className="input border rounded-xl p-3"
//       />

//       <input
//         name="link"
//         defaultValue={slide?.link}
//         placeholder="Link"
//         className="input border rounded-xl p-3 md:col-span-2"
//       />

//       <textarea
//         name="description"
//         defaultValue={slide?.description}
//         placeholder="Descripción"
//         className="input border rounded-xl p-3 md:col-span-2 h-24"
//       />

//       <input
//         name="locale"
//         defaultValue={slide?.locale || "es"}
//         className="border rounded-xl p-3"
//       />

//       <input
//         name="order"
//         type="number"
//         defaultValue={slide?.order}
//         className="border rounded-xl p-3"
//       />
//     </div>

//     {/* DATES */}
//     <div className="grid md:grid-cols-2 gap-4">
//       <input
//         type="datetime-local"
//         name="startAt"
//         className="border rounded-xl p-3"
//       />
//       <input
//         type="datetime-local"
//         name="endAt"
//         className="border rounded-xl p-3"
//       />
//     </div>

//     {/* ACTIVE */}
//     <label className="flex items-center gap-2 text-gray-700">
//       <input
//         type="checkbox"
//         name="isActive"
//         defaultChecked={slide?.isActive ?? true}
//       />
//       Activo
//     </label>

//     {/* BUTTON */}
//     <button
//       type="submit"
//       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
//     >
//       Guardar cambios
//     </button>
//     </form>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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

    const payload = {
      title: form.title.value,
      highlight: form.highlight.value,
      description: form.description.value,
      link: form.link.value,
      locale: form.locale.value,
      order: Number(form.order.value || 0),
      isActive: form.isActive.checked,

      startAt: form.startAt.value || null,
      endAt: form.endAt.value || null,

      image,
      imageTablet,
      imageMobile,
    }

    await onSubmit(payload)

    router.push("/admin/slides")
    router.refresh()
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

      <input
        name="locale"
        defaultValue={slide?.locale || "es"}
        className="w-full border p-3 rounded-xl"
      />

      <input
        name="order"
        type="number"
        defaultValue={slide?.order || 0}
        className="w-full border p-3 rounded-xl"
      />

      {/* DATES */}
      <div className="grid grid-cols-2 gap-4">
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
          slide?.startAt
            ? new Date(slide.startAt).toISOString().slice(0, 16)
            : ""
          }
          className="border p-3 rounded-xl"
        />
      </div>

      {/* ACTIVE */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={slide?.isActive ?? true}
        />
        Activo
      </label>

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