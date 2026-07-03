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
import { notFound } from "next/navigation";

type Locale = "es" | "en";

function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <DictionaryProvider locale={locale} dict={dict}>
      {children}
    </DictionaryProvider>
  );
}