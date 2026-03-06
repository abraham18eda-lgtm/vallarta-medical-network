"use client"

import { useState } from "react"

export default function ImageUploadPreview({
  defaultImage,
  name,
}: {
  defaultImage: string
  name: string
}) {
  const [preview, setPreview] = useState(defaultImage)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <img
        src={preview}
        className="w-full rounded-xl border"
      />

      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>
  )
}