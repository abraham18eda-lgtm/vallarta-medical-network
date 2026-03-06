"use client"

import { useState } from "react"

export default function ImagePreview() {
  const [preview, setPreview] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
  }

  return (
    <div className="space-y-4">

      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-40 object-cover rounded-lg border"
        />
      )}

    </div>
  )
}