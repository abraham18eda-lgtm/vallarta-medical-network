"use client"

import { useEffect } from "react"

export default function DoctorAnalyticsTracker({
  doctorId
}: {
  doctorId: string
}) {

  useEffect(() => {
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
  }, [doctorId])

  return null
}