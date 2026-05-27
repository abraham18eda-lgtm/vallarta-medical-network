"use client"

export default function StepLocation({ form, update, next, prev }: any) {
  // return (
  //   <div className="space-y-4">

  //     <input
  //       placeholder="Ciudad"
  //       value={form.city || ""}
  //       onChange={e => update({ city: e.target.value })}
  //       className="w-full border p-2 rounded"
  //     />

  //     <input
  //       placeholder="Estado"
  //       value={form.state || ""}
  //       onChange={e => update({ state: e.target.value })}
  //       className="w-full border p-2 rounded"
  //     />

  //     <div className="flex justify-between">
  //       <button onClick={prev}>Atrás</button>
  //       <button onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded">
  //         Continuar
  //       </button>
  //     </div>

  //   </div>
  // )

  return (
    <div className="space-y-5">

      <div>
        <label className="text-sm font-medium">
          Ciudad
        </label>

        <input
          placeholder="Guadalajara"
          value={form.city || ""}
          onChange={e => update({ city: e.target.value })}
          className="w-full mt-1 border p-3 rounded-xl"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Estado
        </label>

        <input
          placeholder="Jalisco"
          value={form.state || ""}
          onChange={e => update({ state: e.target.value })}
          className="w-full mt-1 border p-3 rounded-xl"
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
          onClick={next}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Continuar
        </button>
      </div>

    </div>
  )
}