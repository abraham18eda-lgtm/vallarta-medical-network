"use client"

import { useCallback } from "react"

export default function WhatsAppButton({
  doctorId,
  phone
}: {
  doctorId: string
  phone: string
}) {

  const handleClick = useCallback(() => {
    const data = JSON.stringify({
      doctorId,
      type: "WHATSAPP_CLICK"
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", data)
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      })
    }
  }, [doctorId])

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded-xl text-center"
    >
      WhatsApp
    </a>
  )
}