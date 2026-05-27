"use client"

import { useState } from "react"

export default function ImageUploadPreview({
  defaultImage,
  name,
  setImage,
}: {
  defaultImage?: string
  name: string
  setImage: (file: string) => void
}) {
  const [preview, setPreview] = useState(defaultImage || "")

  // async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   const url = URL.createObjectURL(file)
  //   setPreview(url)

  //   // 👉 aquí ya mandas URL o subida real
  //   setImage(url)
  // }
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.url) {
      setImage(data.url) // 👈 URL de Cloudinary
    }
  }
  
  return (
    <div className="space-y-3">

      {preview ? (
        <img
          src={preview}
          className="w-full h-48 object-cover rounded-xl border"
        />
      ) : (
        <div className="w-full h-48 border-2 border-dashed flex items-center justify-center text-gray-400 rounded-xl">
          Sin imagen
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2 rounded-lg"
      />
    </div>
  )
}