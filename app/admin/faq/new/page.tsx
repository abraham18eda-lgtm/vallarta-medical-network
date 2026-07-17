import Link from "next/link";
import FaqForm from "@/components/faq/faq-form";
import { createFaq } from "../actions";

export default function NewFaqPage() {

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <Link
            href="/admin/faq"
            className="
              text-sm
              text-gray-500
              hover:text-gray-800
            "
          >
            ← Volver a preguntas
          </Link>

          <h1 className="
            text-3xl
            font-bold
            text-gray-800
            mt-4
          ">
            Nueva Pregunta Frecuente
          </h1>

          <p className="text-gray-500 mt-2">
            Agrega una nueva pregunta y respuesta para tu sitio.
          </p>

        </div>


        {/* FORMULARIO */}
        <div className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          p-8
        ">

          <FaqForm
            action={createFaq}
          />

        </div>

      </div>

    </div>

  );
}