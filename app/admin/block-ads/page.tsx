export const dynamic = "force-dynamic"

import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

import  EditBannerAdsWrapper from "@/components/admin/EditBannerAdsWrapper"

export default async function BlockAdsPage() {
   const ads = await prisma.block.findMany({
    where: {
      type: {
        in: ["adsection1", "adsection2"],
      },
    },
    orderBy: { order: "asc" },
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

  const now = new Date()

  return (
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

                  <td className="p-3 text-center">
                    {active ? "✅" : "⛔"}
                  </td>

                  <td className="p-3 text-xs text-center">
                    {ad.startAt?.toLocaleString() || "—"} <br />
                    {ad.endAt?.toLocaleString() || "—"}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/block-ads/${ad.id}/edit`}
                      className="text-blue-600 underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}