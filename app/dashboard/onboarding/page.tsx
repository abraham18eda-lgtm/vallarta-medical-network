"use client"

import { useState } from "react"
import StepBasic from "@/components/onboarding/StepBasic"
import StepProfessional from "@/components/onboarding/StepProfessional"
import StepLocation from "@/components/onboarding/StepLocation"
import StepImage from "@/components/onboarding/StepImage"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<any>({})

  const next = () => setStep(s => s + 1)
  const prev = () => setStep(s => s - 1)

  const update = (data: any) => {
    setForm((prev: any) => ({ ...prev, ...data }))
  }

  const finish = async () => {
    try {

      const res = await fetch("/api/doctors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          isActive: true
        })
      })

      const data = await res.json()

      console.log("DOCTOR RESPONSE:", data)

      if (!res.ok) {
        alert(data.error || "Error guardando perfil")
        return
      }

      window.location.href = "/dashboard"

    } catch (err) {
      console.error(err)
      alert("Error de red")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-10 space-y-6">

      <h1 className="text-2xl font-bold">
        Completa tu perfil médico
      </h1>

      {step === 1 && <StepBasic form={form} update={update} next={next} />}
      {step === 2 && <StepProfessional form={form} update={update} next={next} prev={prev} />}
      {step === 3 && <StepLocation form={form} update={update} next={next} prev={prev} />}
      {step === 4 && <StepImage form={form} update={update} finish={finish} prev={prev} />}

      {/* barra progreso */}
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 text-center">
        Paso {step} de 4
      </p>

    </div>
  )
}