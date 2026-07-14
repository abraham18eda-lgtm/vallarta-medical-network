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
  
  // function validateCmsUrl(item: any) {
  //   if (item.url) {
  //     return item.url;
  //   }

  //   if (item.placeId) {
  //     return `/clinicas/${item.slug}`;
  //   }

  //   return "/";
  // }
  
  function validateCmsUrl(item:any){
    const allowed = [
      "/directorio",
      "/es/directorio",
      "/directory",
      "/en/directory",

      "/clinicas",
      "/es/clinicas",
      "/clinics",
      "/en/clinics",

      "/hospitales",
      "/es/hospitales",
      "/hospital",
      "/en/hospital",

      "/laboratorios",
      "/es/laboratorios",
      "/laboratories",
      "/en/laboratories",

      "/dentales",
      "/es/dentales",
      "/dental",
      "/en/dental",

      "/oftalmologia",
      "/es/oftalmologias",
      "/oftalmology",
      "/en/oftalmology",
    ];
    if(
      allowed.includes(item.url)
    ){
      return item.url;
    }

    if(item.placeId){
      return `/clinicas/${item.slug}`;
    }
    return "/";
  }

  return (
    <nav className="flex items-center gap-6 text-sm font-medium uppercase">

      {items.map((item) => (
        <Link
          key={item.id}
          href={validateCmsUrl(item)}
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