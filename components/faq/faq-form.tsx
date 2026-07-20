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
      className="space-y-8
        rounded-3xl
        border
        border-white/60
        bg-white/70
        p-6
        shadow-[0_20px_50px_-25px_rgba(14,165,233,0.25)]
        backdrop-blur-xl
        md:p-8"
      >

      {/* Pregunta */}
      <div>

        <label className="mb-2
          block
          text-sm
          font-semibold
          text-slate-700"
          >
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
            border-slate-200
            bg-white/80
            px-4
            py-3
            text-slate-700

            outline-none
            transition

            focus:border-sky-400
            focus:ring-4
            focus:ring-sky-100
          "
        />

      </div>

      {/* Respuesta */}
      <div>

        <label className="mb-2
          block
          text-sm
          font-semibold
          text-slate-700"
         >
          Respuesta
        </label>

        <textarea
          name="answer"
          rows={8}
          required
          defaultValue={initialData?.answer}
          className="
           w-full
            resize-none
            rounded-2xl
            border
            border-slate-200
            bg-white/80
            px-4
            py-3
            text-slate-700

            outline-none
            transition

            focus:border-sky-400
            focus:ring-4
            focus:ring-sky-100
          "
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Idioma */}
        <div>

          <label className="mb-2
            block
            text-sm
            font-semibold
            text-slate-700"
           >
            Idioma
          </label>

          <select
            name="locale"
            defaultValue={initialData?.locale ?? "es"}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              py-3
              text-slate-700

              outline-none
              transition

              focus:border-sky-400
              focus:ring-4
              focus:ring-sky-100
            "
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>

        </div>

        {/* Orden */}
        <div>

          <label className=" mb-2
              block
              text-sm
              font-semibold
              text-slate-700"
            >
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
              border-slate-200
              bg-white/80
              px-4
              py-3
              text-slate-700

              outline-none
              transition

              focus:border-sky-400
              focus:ring-4
              focus:ring-sky-100
            "
          />

        </div>

        {/* Activa */}
        <div className="flex items-end">

          <label className="flex
            h-[50px]
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white/60
            px-4
            text-sm
            font-semibold
            text-slate-700"
            >

            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initialData?.isActive ?? true}
              className="
                size-5
                accent-sky-600
              "
            />

            Activa

          </label>

        </div>

      </div>

      <button
        disabled={loading}
        className="
          inline-flex
          items-center
          justify-center

          rounded-2xl

          bg-gradient-to-r
          from-cyan-500/90
          to-sky-600/90

          px-8
          py-3

          font-semibold
          text-white

          shadow-md
          shadow-sky-200

          transition-all
          duration-300

          hover:from-sky-600
          hover:to-cyan-600

          hover:-translate-y-0.5

          disabled:opacity-50
        "
      >

        {loading ? "Guardando..." : "Guardar"}

      </button>

    </form>

  );

}