'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ locale }: { locale: string }) {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!search) return setResults([]);

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${search}`);
      const data = await res.json();
      setResults(data);
      setShow(true);
    }, 250);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="relative w-full">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="
          w-full rounded-xl border border-slate-200
          px-4 py-2 pr-24 outline-none
          focus:ring-2 focus:ring-[#0F4C81]
        "
      />

      <button
        onClick={() => {
          if (!search) return;
          router.push(`/${locale}/directorio?search=${search}`);
        }}
        className="
          absolute right-1 top-1 rounded-lg
          bg-[#0F4C81] px-4 py-1.5 text-white
          hover:bg-[#0B3558]
        "
      >
        Buscar
      </button>

      {/* dropdown simple */}
      {show && results.length > 0 && (
        <div className="absolute top-12 z-50 w-full rounded-xl border bg-white shadow-lg">

          {results.map((r) => (
            <div
              key={r.id}
              className="cursor-pointer px-4 py-3 hover:bg-slate-50"
              onClick={() =>
                router.push(`/${locale}/directorio?search=${r.name}`)
              }
            >
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-slate-400">{r.type}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}