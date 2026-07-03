// import { ReactNode } from 'react';
// import '../globals.css';

// type Props = {
//   children: ReactNode;
// };

// export default function LocaleLayout({ children }: Props) {
//   return <>{children}</>;
// }

import { DictionaryProvider } from "@/components/providers/DictionaryProvider";
import { getDictionary } from "@/lib/getDictionary";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "es" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  if (!["es", "en"].includes(locale)) {
     throw new Error("Locale inválido");
  }
  return (
    <DictionaryProvider locale={locale} dict={dict}>
      {children}
    </DictionaryProvider>
  );
}