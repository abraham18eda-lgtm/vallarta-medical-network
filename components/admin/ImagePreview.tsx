"use client"

import { useState } from "react"

interface Props {
  currentImage?: string | null
}

export default function ImagePreview({
  currentImage = null,
}: Props) {

  const [preview, setPreview] = useState(currentImage)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0]

    if (!file) return

    console.log("Nueva imagen:", file.name)

    const url = URL.createObjectURL(file)

    console.log("Preview:", url)

    setPreview(url)
  }

  return (
    <div className="space-y-4">

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="
            w-full
            h-64
            object-cover
            rounded-xl
            border
          "
        />
      )}

      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleChange}
        className="
          w-full
          border
          p-3
          rounded-xl
          bg-white
        "
      />

    </div>
  )
}