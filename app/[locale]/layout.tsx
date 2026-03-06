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
    <html lang="es">
      <body suppressHydrationWarning>  {/* suppressHydrationWarning */}
        
        {/* SOLO MOBILE */}
        {/* <div className="hidden md:block">
          <TopBar dict={dict} />
        </div>

        <div className="sticky top-0 z-50 bg-background">
          <Header />
          <Navbar dict={dict} />
        </div> */}

        {/* CONTENIDO */}
        
        <main>{children}</main>

        {/* FOOTER */}
        {/* <Footer dict={dict} /> */}

      </body>
    </html>
  );
}