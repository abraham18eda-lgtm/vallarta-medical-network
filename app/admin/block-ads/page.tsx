import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function BlockAdsPage() {
  const ads = await prisma.block.findMany({
    where: {
      type: {
        in: ["adsection1", "adsection2"],
      },
    },
    orderBy: { order: "asc" },
  })

  const now = new Date()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Block Ads
      </h1>

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