"use client"

import { useActionState } from "react"

type State = {
  error?: string
}

type Props = {
  action: (
    state: State,
    formData: FormData
  ) => Promise<State>
  children: React.ReactNode
}

export default function ActionForm({
  action,
  children,
}: Props) {

  const [state, formAction, pending] =
    useActionState<State, FormData>(
      action,
      {}
    )

  return (
    <form
      action={formAction}
      className="p-8 space-y-8"
    >

      {state.error && (
        <div
          className="
            rounded-2xl
            border border-red-200
            bg-red-50
            px-5 py-4
            text-red-700
          "
        >
          <div className="flex items-start gap-3">

            <span className="text-xl">
              ⚠️
            </span>

            <div>
              <p className="font-semibold">
                No se pudo crear el artículo
              </p>

              <p className="text-sm mt-1">
                {state.error}
              </p>
            </div>

          </div>
        </div>
      )}

      {children}

    </form>
  )
}