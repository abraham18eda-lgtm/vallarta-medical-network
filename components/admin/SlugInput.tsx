"use client"

import { useState } from "react"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // quita acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function SlugInput() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setTitle(value)
    setSlug(slugify(value))
  }

  function handleSlug(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(slugify(e.target.value))
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="text-sm font-medium">Título</label>
        <input
          name="title"
          value={title}
          onChange={handleTitle}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Slug</label>
        <input
          name="slug"
          value={slug}
          onChange={handleSlug}
          className="w-full border p-3 rounded-lg"
        />
      </div>

    </div>
  )
}