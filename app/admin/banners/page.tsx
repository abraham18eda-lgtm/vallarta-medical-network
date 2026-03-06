import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function BannersPage() {
  const banners = await prisma.promoBanner.findMany({
    orderBy: { createdAt: "desc" },
  })

  const now = new Date()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Promo Banners</h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3">Locale</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner) => {
              const active =
                banner.isActive &&
                (!banner.startAt || banner.startAt <= now) &&
                (!banner.endAt || banner.endAt >= now)

              return (
                <tr key={banner.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={banner.image}
                      className="w-24 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 text-center">
                    {banner.locale}
                  </td>

                  <td className="p-3 text-center">
                    {active ? "🟢 Activo" : "🔴 Inactivo"}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/banners/${banner.id}/edit`}
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