import { ReactNode } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: 'es' | 'en' }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale); 

  return (  
        <main>{children}</main>
  );
}