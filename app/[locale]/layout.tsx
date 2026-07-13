import { DictionaryProvider } from "@/components/providers/DictionaryProvider";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottonBar from "@/components/layout/Bottombar";

import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

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

  const messages = await getMessages();

  return (

    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >

      <DictionaryProvider
        locale={locale}
        dict={dict}
      >

        <div className="sticky top-0 z-50 bg-background">
          <Header />
        </div>


        {children}


        <Footer
          locale={locale}
          dict={dict}
        />
        {/* Bottom bar */}
        <div className="block md:hidden">
          <BottonBar />
        </div>

      </DictionaryProvider>

    </NextIntlClientProvider>

  );
}