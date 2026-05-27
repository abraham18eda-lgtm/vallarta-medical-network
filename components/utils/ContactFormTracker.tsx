"use client"

import { useEffect, useRef } from "react"

export default function ContactFormTracker({
  doctorId
}: {
  doctorId: string
}) {

  const sent = useRef(false)

  useEffect(() => {
    const form = document.getElementById("contact-form")

    if (!form) return

    const handleSubmit = () => {
      if (sent.current) return
      sent.current = true

      const data = JSON.stringify({
        doctorId,
        type: "CONTACT_FORM"
      })

      navigator.sendBeacon
        ? navigator.sendBeacon("/api/analytics", data)
        : fetch("/api/analytics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: data
          })
    }

    form.addEventListener("submit", handleSubmit)

    return () => {
      form.removeEventListener("submit", handleSubmit)
    }
  }, [doctorId])

  return null
}