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
        console.log(data);
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
      "/es/oftalmologia",
      "/oftalmology",
      "/en/oftalmology",

      "/blog",
      "/es/blog",
      "/blog",
      "/en/blog",

      "/noticias",
      "/es/noticias",
      "/news",
      "/en/news",
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
    <nav className="flex items-center gap-2 text-sm font-medium uppercase">

      {items.map((item) => (
        <Link
          key={item.id}
          href={validateCmsUrl(item)}
          className="
            rounded-full
            px-2.5 py-1
            text-sm
            font-semibold
            text-gray-500
            transition-colors duration-200

            hover:bg-sky-100/50
            hover:text-sky-600/80
          "
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}