export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import SlideActions from "@/components/admin/SlideActions"

export default async function SlidesPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  })

  const now = new Date()

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">CMS Carrousel</h1>
            {/* <p className="text-gray-500">CMS de banners</p> */}
          </div>

          <Link
            href="/admin/slides/new"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl">
            + Nuevo
          </Link>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Imagen</th>
                <th className="p-4">Título</th>
                <th className="p-4">Idioma</th>
                <th className="p-4">Orden</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {slides.map((slide) => {
                const active =
                  slide.isActive &&
                  (!slide.startAt || new Date(slide.startAt) <= now) &&
                  (!slide.endAt || new Date(slide.endAt) >= now)

                return (
                  <tr key={slide.id} className="border-t">
                    <td className="p-4">
                      <img
                        src={slide.image}
                        className="w-24 h-14 object-cover rounded-lg"
                        alt={slide.title}
                      />
                    </td>

                    <td className="p-4">{slide.title}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          slide.locale === "es"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {slide.locale === "es" ? "ES" : "EN"}
                      </span>
                    </td>

                    <td className="p-4 text-center">{slide.order}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`
                          relative inline-flex items-center justify-center
                          w-6 h-6 rounded-full
                          ${
                            active
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-500"
                          }
                        `}
                        title={active ? "Activo" : "Inactivo"}
                      >

                        {active ? (

                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0-1.414-1.414z" />
                          </svg>

                        ) : (

                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>

                        )}

                      </span>
                    </td>

                    <td className="p-4">
                      <SlideActions id={String(slide.id)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}