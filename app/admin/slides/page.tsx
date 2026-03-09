export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function SlidesPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  })

  const now = new Date()
  const canAddSlide = slides.length < 2
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Slides</h1>

        {canAddSlide && (
          <Link
            href="/admin/slides/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Agregar Slide
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3">Locale</th>
              <th className="p-3">Orden</th>
              <th className="p-3">Activo</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {slides.map(slide => {
              const active =
                slide.isActive &&
                (!slide.startAt || slide.startAt <= now) &&
                (!slide.endAt || slide.endAt >= now)

              return (
                <tr key={slide.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={slide.image}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">
                    <div className="font-medium">
                      {slide.title}
                    </div>
                    {slide.highlight && (
                      <div className="text-xs text-gray-500">
                        {slide.highlight}
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {slide.locale}
                  </td>

                  <td className="p-3 text-center">
                    {slide.order}
                  </td>

                  <td className="p-3 text-center">
                    {active ? "✅" : "⛔"}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/slides/${slide.id}/edit`}
                      className="text-blue-600 underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              )
            })}

            {slides.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No hay slides aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}