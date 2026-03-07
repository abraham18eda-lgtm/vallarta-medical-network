"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation"

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()

    await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        image: formData.get("image"),
        categoryId: formData.get("categoryId"),
      }),
    })

    router.push("/admin")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-20 space-y-6">
      <input name="title" placeholder="Title" className="input" />
      <input name="slug" placeholder="Slug" className="input" />
      <input name="image" placeholder="Image URL" className="input" />
      <textarea name="content" placeholder="Content" />
      <button disabled={loading}>Crear</button>
    </form>
  )
}