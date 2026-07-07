"use client"

import { useState } from "react"
import EditBannerAds from "@/components/ui/EditBannerAds"

export default function EditBannerAdsWrapper() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* BOTÓN */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Agregar bloque
        </button>
      </div>

      {/* MODAL */}
      <EditBannerAds
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          window.location.reload()
        }}
      />
    </>
  )
}