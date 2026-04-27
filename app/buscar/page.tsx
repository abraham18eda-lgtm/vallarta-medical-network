"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import DoctorCard from "@/components/utils/DoctorCard"

export default function BuscarPage() {
  const params = useSearchParams()

  const [doctors, setDoctors] = useState([])

  const query = params.get("query") || ""
  const city = params.get("city") || ""

  useEffect(() => {
    fetch(`/api/doctors?query=${query}&city=${city}`)
      .then(res => res.json())
      .then(setDoctors)
  }, [query, city])

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {doctors.map((doc: any) => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  )
}