import { getTranslations, getLocale } from "next-intl/server";

import Link from "next/link";
import {
  Hotel,
  PlaneTakeoff,
  CarFront,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const services = [
    {
        key:"hotel",
        icon:Hotel,
        href:"/hoteles"
    },
    {
        key:"flights",
        icon:PlaneTakeoff,
        href:"/vuelos"
    },
    {
        key:"transport",
        icon:CarFront,
        href:"/transporte"
    },
    {
        key:"coordinator",
        icon:Stethoscope,
        href:"/contacto"
    }
];
export default async function MedicalTravelSection() {

  const locale = await getLocale();    
  const t = await getTranslations("medicalTravel");

  return (
    <section className="section-glow relative over-flow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
         {/* Blobs de fondo */}
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-sky-300/10 blur-[120px]" />
        <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-cyan-300/10 blur-[120px]" />

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold tracking-widest text-sky-700">
            {t("badge")}
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
            <span className="text-gradient-primary"> {t("title_medic")}</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            {t("description")}
          </p>

        </div>

        {/* Grid */}     

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.key}
                href={service.href}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-sky-100
                  bg-white/70
                  p-7
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-sky-300
                  hover:shadow-[0_30px_60px_-20px_rgba(14,165,233,.18)]
                "
              >
                {/* Glow */}

                <div
                  className="
                    absolute
                    -right-12
                    -top-12
                    h-36
                    w-36
                    rounded-full
                    bg-sky-300/20
                    blur-3xl
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>

                  <p className="mt-6 text-xs font-bold tracking-[0.25em] text-sky-600">
                    {t(`services.${service.key}.label`)}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {t(`services.${service.key}.title`)}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                     {t(`services.${service.key}.description`)}
                  </p>

                  <div className="mt-8 flex items-center gap-2 font-medium text-sky-600">
                     {t(`services.${service.key}.action`)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[36px] glass-soft p-10">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>

              <h3 className="text-3xl font-bold text-slate-900">
                {t("cta.title")}
              </h3>

              <p className="mt-3 max-w-2xl text-slate-500">
                {t("cta.description")}
              </p>

            </div>

            <Link
              href="/contacto"
              className="btn-form whitespace-nowrap hover:bg-[#0B3558] z-10"
            >
              {t("cta.button")}
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}