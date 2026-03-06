"use client"

import { useState } from "react"
import { slugify } from "@/lib/slugify"

export default function SlugPreview({ domain }: { domain: string }) {

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [slug, setSlug] = useState("")

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setTitle(value)
    setSlug(slugify(value))
  }

  return (
    <div className="space-y-4">

       {/* preview URL */}
      <div className="text-sm text-gray-500">
        URL:
        <div className="font-mono text-primary">
          {domain}/blog/{category}/{slug}
        </div>
      </div>

      {/* titulo */}
      <input
        name="title"
        placeholder="Título del blog"
        onChange={handleTitle}
        className="w-full border p-3 rounded-lg"
      />

      {/* categoria */}
      {/* <input
        name="category"
        placeholder="Categoria"
        onChange={(e) => setCategory(slugify(e.target.value))}
        className="w-full border p-3 rounded-lg"
      /> */}

      {/* slug */}
      <input
        name="slug"
        placeholder="Slug"
        value={slug}
        readOnly
        className="w-full border p-3 rounded-lg"
      />

    </div>
  )
}