"use client";

import { useState } from "react";

interface FaqFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    question: string;
    answer: string;
    locale: string;
    order: number;
    isActive: boolean;
  };
}

export default function FaqForm({
  action,
  initialData,
}: FaqFormProps) {

  const [loading, setLoading] = useState(false);

  return (

    <form
      action={async (formData) => {
        setLoading(true);
        await action(formData);
      }}
      className="space-y-6"
    >

      {/* Pregunta */}
      <div>

        <label className="block mb-2 font-medium">
          Pregunta
        </label>

        <input
          name="question"
          required
          defaultValue={initialData?.question}
          className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
          "
        />

      </div>

      {/* Respuesta */}
      <div>

        <label className="block mb-2 font-medium">
          Respuesta
        </label>

        <textarea
          name="answer"
          rows={8}
          required
          defaultValue={initialData?.answer}
          className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
          "
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Idioma */}
        <div>

          <label className="block mb-2 font-medium">
            Idioma
          </label>

          <select
            name="locale"
            defaultValue={initialData?.locale ?? "es"}
            className="
              w-full
              rounded-2xl
              border
              px-4
              py-3
            "
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>

        </div>

        {/* Orden */}
        <div>

          <label className="block mb-2 font-medium">
            Orden
          </label>

          <input
            type="number"
            name="order"
            defaultValue={initialData?.order ?? 0}
            className="
              w-full
              rounded-2xl
              border
              px-4
              py-3
            "
          />

        </div>

        {/* Activa */}
        <div className="flex items-end">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initialData?.isActive ?? true}
            />

            Activa

          </label>

        </div>

      </div>

      <button
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          rounded-2xl
          px-8
          py-3
          disabled:opacity-50
        "
      >

        {loading ? "Guardando..." : "Guardar"}

      </button>

    </form>

  );

}