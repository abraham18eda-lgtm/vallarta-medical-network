"use client"

import { useState } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function EditBannerAds({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)

  const createBlock = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/admin/block-ads", {
        method: "POST",
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Error creando bloque")
        return
      }

      onClose()
      onSuccess?.()

    } catch (error) {
      console.error(error)
      alert("Error creando bloque")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-bold mb-2">
          Crear Banner Ads
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Se generará automáticamente el siguiente slot disponible (adsection1 o adsection2)
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={createBlock}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Creando..." : "Crear"}
          </button>

        </div>

      </div>

    </div>
  )
}