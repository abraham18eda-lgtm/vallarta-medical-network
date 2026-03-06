export default async function BlocksPage() {
  const blocks = await fetch('http://localhost:3000/api/cms/blocks')
    .then(res => res.json());

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