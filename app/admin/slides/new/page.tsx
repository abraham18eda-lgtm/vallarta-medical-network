"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploadPreview from "@/components/admin/ImageUploadPreview"
import SlideEditForm from "@/components/admin/SlideEditForm"

export default function NewSlidePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState("")
  const [imageTablet, setImageTablet] = useState("")
  const [imageMobile, setImageMobile] = useState("")

   const createSlide = async (data: any) => {
    setLoading(true)

    await fetch("/api/admin/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)
    router.push("/admin/slides")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 md:text-center">
          Crear Slide
        </h1>

        <SlideEditForm
          mode="create"
          onSubmit={createSlide}
          loading={loading}
        />

      </div>
    </div>
  )
}