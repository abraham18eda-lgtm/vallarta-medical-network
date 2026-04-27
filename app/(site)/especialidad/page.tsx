import { Suspense } from "react"
import DoctorsPage from "@/components/home/DoctorPage"

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DoctorsPage />
    </Suspense>
  )
}