import { notFound } from "next/navigation";

export default async function BlocksPage() {
  
  // Usamos fetch relativo y deshabilitamos cache para SSR
  const res = await fetch("/api/cms/blocks", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudieron obtener los bloques CMS");
  }

  const blocks = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cms/blocks`, {
    cache: 'no-store', // para SSR
  }).then(res => res.json())

  if (!blocks) return notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bloques CMS</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Activo</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((b: any) => (
            <tr key={b.id}>
              <td>{b.type}</td>
              <td>{b.is_active ? 'Sí' : 'No'}</td>
              <td>{b.start_date}</td>
              <td>{b.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}