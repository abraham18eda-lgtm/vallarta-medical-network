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

type Locale = "es" | "en";

function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!isLocale(locale)) {
    throw new Error("Locale inválido");
  }

  const dict = await getDictionary(locale);

  return (
    <DictionaryProvider locale={locale} dict={dict}>
      {children}
    </DictionaryProvider>
  );
}