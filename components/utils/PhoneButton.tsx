"use client"

import { useCallback } from "react"

export default function PhoneButton({
  doctorId,
  phone
}: {
  doctorId: string
  phone: string
}) {

  const handleClick = useCallback(() => {
    const data = JSON.stringify({
      doctorId,
      type: "PHONE_CLICK"
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
      href={`tel:${phone}`}
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-center"
    >
      Llamar
    </a>
  )
}