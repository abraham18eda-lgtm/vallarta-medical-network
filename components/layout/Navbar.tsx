'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar({ locale = 'es' }: { locale?: string }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/navigation?locale=${locale}`);
        const data = await res.json();
        setItems(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [locale]);

  return (
    <nav className="flex items-center gap-6 text-sm font-medium">

      {items.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="
            relative text-slate-700 transition
            hover:text-[#0F4C81]
            after:absolute after:-bottom-1 after:left-0
            after:h-[2px] after:w-0 after:bg-[#0F4C81]
            after:transition-all hover:after:w-full
          "
        >
          {item.title}
        </Link>
      ))}

    </nav>
  );
}