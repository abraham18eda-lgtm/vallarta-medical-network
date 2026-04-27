import { Suspense } from "react"
import BuscarPage from "@/components/home/BuscarPage"

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BuscarPage />
    </Suspense>
  )
}