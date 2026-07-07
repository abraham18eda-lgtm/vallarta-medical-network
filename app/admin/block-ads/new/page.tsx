"use client"

import { useState, useEffect  } from "react"
import { useRouter } from "next/navigation"

export default function NewBlockAdPage() {
  const router = useRouter()
  const [used, setUsed] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/block-ads/used")
        .then(res => res.json())
        .then(setUsed)
  }, [])  

  const isDisabled = used.some(
   u => u.type === "adsection1" && u.locale === "es")

  const [form, setForm] = useState({
    type: "adsection1",
    locale: "es",
    isActive: false,
    startAt: "",
    endAt: "",
    data: {
      title: "",
      description: "",
      image: "",
      link: "",
      alt: "",
    },
  })

  const save = async () => {
    await fetch("/api/admin/block-ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    router.push("/admin/block-ads")
    router.refresh()
  }

  

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Nuevo Block Ad</h1>

      {/* TYPE */}
      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value="adsection1">Ad Section 1</option>
        <option value="adsection2">Ad Section 2</option>
      </select>

      {/* LOCALE */}
      <select
        value={form.locale}
        onChange={(e) =>
          setForm({ ...form, locale: e.target.value })
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value="es" disabled={isDisabled}>Español</option>
        <option value="en" disabled={isDisabled}>English</option>
      </select>

      {/* TITLE */}
      <input
        placeholder="Título"
        className="w-full border p-3 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            data: {
              ...form.data,
              title: e.target.value,
            },
          })
        }
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Descripción"
        className="w-full border p-3 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            data: {
              ...form.data,
              description: e.target.value,
            },
          })
        }
      />

      {/* IMAGE */}
      <input
        placeholder="Imagen URL"
        className="w-full border p-3 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            data: {
              ...form.data,
              image: e.target.value,
            },
          })
        }
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-3 rounded-xl w-full"
      >
        Guardar Block
      </button>
    </div>
  )
}