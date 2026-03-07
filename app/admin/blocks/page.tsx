export default async function BlocksPage() {
  // Usamos la variable de entorno para obtener la URL de la API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Verificamos si la URL está definida, si no, lanzamos un error
  if (!apiUrl) {
    throw new Error('API URL is not defined.');
  }
  
   // Realizamos la solicitud usando la URL correcta
  const blocks = await fetch(`${apiUrl}/api/cms/blocks`)
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error fetching blocks:', error);
      return [];
    });

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