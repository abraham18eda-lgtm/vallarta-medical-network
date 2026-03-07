import { ReactNode } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import '../globals.css';

type Locale = 'en' | 'es';

type Props = {
  children: ReactNode;
  params: { locale: Locale } | Promise<{ locale: Locale }> // puede ser Promise
};

export default async function LocaleLayout({ children, params }: Props) {
  
  const resolvedParams = params instanceof Promise ? await params : params;
  const { locale } = resolvedParams; 
  
  // Diccionario asincrónico
  const dict = await getDictionary(locale);

  return (  
        <main>{children}</main>
  );
}