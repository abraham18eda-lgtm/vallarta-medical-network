"use client"

export default function StepBasic({ form, update, next }: any) {
  // return (
  //   <div className="space-y-4">

  //     <input
  //       placeholder="Nombre completo"
  //       value={form.name || ""}
  //       onChange={e => update({ name: e.target.value })}
  //       className="w-full border p-2 rounded"
  //     />

  //     <input
  //       placeholder="Teléfono"
  //       value={form.phone || ""}
  //       onChange={e => update({ phone: e.target.value })}
  //       className="w-full border p-2 rounded"
  //     />

  //     <button onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded">
  //       Continuar
  //     </button>
  //   </div>
  // )

   return (
    <div className="space-y-5">

      <div>
        <label className="text-sm font-medium text-slate-700">
          Nombre completo
        </label>

        <input
          placeholder="Dr. Juan Pérez"
          value={form.name || ""}
          onChange={e => update({ name: e.target.value })}
          className="w-full mt-1 border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Teléfono
        </label>

        <input
          placeholder="+52 33 1234 5678"
          value={form.phone || ""}
          onChange={e => update({ phone: e.target.value })}
          className="w-full mt-1 border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={next}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
      >
        Continuar
      </button>

    </div>
  )
}