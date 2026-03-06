import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CMSAdminPage() {
  const blocks = await prisma.block.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CMS – Bloques</h1>

        <Link
          href="/admin/cms/new"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Nuevo bloque
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3">Orden</th>
              <th className="p-3">Activo</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(block => {
              const now = new Date();
              const active =
                (!block.startAt || block.startAt <= now) &&
                (!block.endAt || block.endAt >= now);

              return (
                <tr key={block.id} className="border-t">
                  <td className="p-3 font-medium">{block.type}</td>
                  <td className="p-3 text-center">{block.order}</td>
                  <td className="p-3 text-center">
                    {active ? '✅' : '⛔'}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/cms/${block.id}`}
                      className="text-primary underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}