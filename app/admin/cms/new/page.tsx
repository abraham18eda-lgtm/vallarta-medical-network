'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlockPage() {
  const router = useRouter();

  const [type, setType] = useState('hero');
  const [data, setData] = useState('{}');
  const [order, setOrder] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch('/api/cms/blocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        order,
        data: JSON.parse(data),
      }),
    });

    router.push('/admin/cms');
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Nuevo bloque</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="hero">Hero</option>
          <option value="promo_banner">Promo Banner</option>
          <option value="blog_featured">Blog Featured</option>
        </select>

        <input
          type="number"
          value={order}
          onChange={e => setOrder(Number(e.target.value))}
          placeholder="Orden"
          className="w-full border p-3 rounded"
        />

        <textarea
          value={data}
          onChange={e => setData(e.target.value)}
          rows={10}
          className="w-full border p-3 rounded font-mono text-sm"
          placeholder='{"title":"Ejemplo"}'
        />

        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Guardar
        </button>
      </form>
    </div>
  );
}