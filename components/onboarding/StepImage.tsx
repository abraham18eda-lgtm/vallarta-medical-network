"use client"

import { useState } from "react"

export default function StepImage({ form, update, finish, prev }: any) {
  const [preview, setPreview] = useState<string | null>(null)

  const upload = async (file: File) => {
    const fd = new FormData()
    fd.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd
    })

    const data = await res.json()
    update({ image: data.url })
  }

  // return (
  //   <div className="space-y-4">

  //     <input
  //       type="file"
  //       onChange={async (e) => {
  //         const file = e.target.files?.[0]
  //         if (!file) return

  //         setPreview(URL.createObjectURL(file))
  //         await upload(file)
  //       }}
  //     />

  //     {preview && (
  //       <img src={preview} className="w-32 h-32 rounded-full object-cover" />
  //     )}

  //     <div className="flex justify-between">
  //       <button onClick={prev}>Atrás</button>
  //       <button onClick={finish} className="bg-green-600 text-white px-4 py-2 rounded">
  //         Finalizar
  //       </button>
  //     </div>

  //   </div>
  // )

   return (
    <div className="space-y-6 text-center">

      <div>

        <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-blue-100 shadow">

          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
              Foto
            </div>
          )}

        </div>

        <input
          type="file"
          className="mt-5"
          onChange={async (e) => {
            const file = e.target.files?.[0]

            if (!file) return

            setPreview(URL.createObjectURL(file))

            await upload(file)
          }}
        />

      </div>

      <div className="flex justify-between">
        <button
          onClick={prev}
          className="px-5 py-3 rounded-xl border"
        >
          Atrás
        </button>

        <button
          onClick={finish}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Finalizar perfil
        </button>
      </div>

    </div>
  )
}