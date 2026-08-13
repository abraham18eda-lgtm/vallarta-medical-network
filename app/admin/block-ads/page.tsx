export const dynamic = "force-dynamic"

import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

import  EditBannerAdsWrapper from "@/components/admin/EditBannerAdsWrapper"
import ActionButtons from "@/components/admin/ui/ActionButtons"
import { Trash2 } from "lucide-react"

export default async function BlockAdsPage() {

  const now = new Date()

  const ads = await prisma.block.findMany({
    where: {
      type: {
        in: ["adsection1", "adsection2"],
      },
    },
    orderBy: {
      order: "asc",
    },
  })

  async function createBlock() {
    "use server"

    const total = await prisma.block.count({
      where: {
        type: {
          in: ["adsection1", "adsection2"],
        },
      },
    })

    // Validación de seguridad
    if (total >= 2) {
      return
    }

    // ¿Qué bloque falta?
    const exists1 = await prisma.block.findFirst({
      where: { type: "adsection1" },
    })

    const newType = exists1 ? "adsection2" : "adsection1"

    await prisma.block.create({
      data: {
        type: newType,
        locale: "es",
        order: total + 1,
        isActive: false,
        data: {
          title: "",
          description: "",
          image: "",
          link: "",
          alt: "",
        },
      },
    })

    redirect("/admin/block-ads")
  }

  async function removeBanner(id: number) {
    "use server"

    await prisma.block.delete({
      where: {
        id,
      },
    })

    redirect("/admin/block-ads")
  }  

  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Banner Ads
        </h1>

        {ads.length < 4 && (
          <div className="flex justify-end py-4">
            <form action={createBlock}>
              {/* <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                + Agregar bloque
              </button> */}
              {/* <button
                onClick={() => setOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                + Agregar bloque
              </button> */}
              <EditBannerAdsWrapper />
            </form>
          </div>
        )}
      
        
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3">Idioma</th>
                <th className="p-3">Activo</th>
                <th className="p-3">Fechas</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ads.map(ad => {
                const active =
                  ad.isActive &&
                  (!ad.startAt || ad.startAt <= now) &&
                  (!ad.endAt || ad.endAt >= now)

                return (
                  <tr key={ad.id} className="border-t">
                    <td className="p-3">{ad.type}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ad.locale === "es"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {ad.locale === "es" ? "ES" : "EN"}
                      </span>
                    </td>

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
                   
                    <td className="p-3 text-xs text-center">
                      {ad.startAt?.toLocaleString() || "—"} <br />
                      {ad.endAt?.toLocaleString() || "—"}
                    </td>

                    <td className="p-4 text-center">
                      <ActionButtons
                        editHref={`/admin/block-ads/${ad.id}/edit`}
                        deleteAction={removeBanner.bind(null, ad.id)}
                      />
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