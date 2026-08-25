"use client"

import { useEffect } from "react"

export default function DoctorAnalyticsTracker({
  doctorId
}: {
  doctorId: string
}) {

  useEffect(() => {

    const cookieName = `doctor_view_${doctorId}`
    // Ya visitó este perfil
    if (document.cookie.includes(`${cookieName}=1`)) {
      return
    }
    
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        doctorId,
        type: "PROFILE_VIEW"
      })
    })
    // Guardamos cookie durante 24 horas
    document.cookie =
      `${cookieName}=1; path=/; max-age=${60 * 60 * 48}`
  }, [doctorId])

  return null
}