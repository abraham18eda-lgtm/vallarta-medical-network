"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploadPreview from "@/components/admin/ImageUploadPreview"
import SlideEditForm from "@/components/admin/SlideEditForm"

interface SubmitResult {
  success: boolean
  error?: string
}

export default function NewSlidePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState("")
  const [imageTablet, setImageTablet] = useState("")
  const [imageMobile, setImageMobile] = useState("")

  const createSlide = async (data: any): Promise<SubmitResult> => {

    try {

      setLoading(true)

      const res = await fetch(
        "/api/admin/slides",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(data),
        }
      )

      const result =
        await res.json() 

      if (!res.ok) {

        return {
          success: false,

          error:
            result.error ||
            "Error creando el slide."
        }
      }

      return {
        success: true
      }

    } catch (error) {

      console.error(error)

      return {
        success: false,

        error:
          "No se pudo conectar con el servidor."
      }

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl text-heading text-gradient-second font-bold mb-6 md:text-center">
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