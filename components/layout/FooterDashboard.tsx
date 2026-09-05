import { getTranslations, getLocale } from "next-intl/server";
import Link from 'next/link';


export default async function FooterDashboard({ locale, dict }: any) {
  if (!dict) return null;
  
  // const locale = await getLocale();
  const t = await getTranslations("footer");


  return (
    <footer className=" bg-gradient-to-br from-[#0F4C81] to-[#0B3558] text-slate-100 pt-16 pb-8">

      {/* ─────────── Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-base  text-slate-400 mb-20 md:mb-0">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-between'>
          <div className='order-2 md:order-1'>
            © {new Date().getFullYear()} Vallarta Medical Network. Todos los derechos reservados.
          </div>
          <div className="order-1 md:order-2">
            <Link
              href={`/${locale}/cookies`}
              className="mx-4 text-slate-400 transition hover:text-sky-600 hover:underline"
            >
              {t("notice.policy")}
            </Link>

            <Link
              href={`/${locale}/privacy`}
              className="mx-4 text-slate-400 transition hover:text-sky-600 hover:underline"
            >
              {t("notice.privacy")}
            </Link>

            <Link
              href={`/${locale}/fraud`}
              className="text-slate-400 transition hover:text-sky-600 hover:underline"
            >
              {t("notice.fraud")}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}