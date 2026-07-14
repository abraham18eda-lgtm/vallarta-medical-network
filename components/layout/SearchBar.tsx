'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ locale }: { locale: string }) {
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // if (!search) return setResults([]);
    if (!search) {
      setResults([]);
      setShow(false);
      return;
    }

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${search}`);
      const data = await res.json();
      setResults(data);
      setShow(true);
    }, 250);

    return () => clearTimeout(delay);
  }, [search]);

   // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const handleSelectResult = (name: string) => {
    setShow(false);
    setResults([]);
    setSearch('');

    router.push(
      `/${locale}/directorio?search=${name}`
    );
  };

  return (
    <div ref={searchRef}
          className="relative w-full">

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

          setShow(false);
          router.push(
            `/${locale}/directorio?search=${search}`
          );
          setSearch('');
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
                handleSelectResult(r.name)
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