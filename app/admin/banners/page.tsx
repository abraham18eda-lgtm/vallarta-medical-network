import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function BannersPage() {
  console.log("TABLE TEST")
  const test = await prisma.$queryRaw`SELECT COUNT(*) FROM "PromoBanner"`
  console.log(test)
  const banners = await prisma.promoBanner.findMany({
    orderBy: { createdAt: "desc" },
  })

  const now = new Date()
console.log("BANNERS:", banners)
  // Verificamos si ya existe un banner activo o no
  const bannerExists = banners.length > 0
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Promo Banners</h1>

       {/* Condicional para mostrar el botón de agregar banner solo si no hay banner */}
      {!bannerExists && (
        <div className="mb-6">
          <Link
            href="/admin/banners/new"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Agregar+
          </Link>
        </div>
      )}

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
            { banners.map((banner) => {
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