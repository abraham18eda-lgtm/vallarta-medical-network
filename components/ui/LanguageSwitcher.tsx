'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLang = (lang: 'es' | 'en') => {
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-2 text-xs">
      <button onClick={() => changeLang('es')}>ES</button>
      <span>|</span>
      <button onClick={() => changeLang('en')}>EN</button>
    </div>
  );
}