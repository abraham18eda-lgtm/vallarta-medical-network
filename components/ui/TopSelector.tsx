"use client";

import Link from "next/link";
import { useState } from "react";

interface Props {
  doctors: any[];
  clinics: any[];
  locale: string;
  dict: any;
}

export default function TopSelector({
  doctors,
  clinics,
  locale,
  dict,
}: Props) {

  const [type, setType] = useState<"doctor" | "clinic">("doctor");

  const currentLocale = locale as "es" | "en";

  const t = {
    recommended:
      currentLocale === "es"
        ? "Recomendados"
        : "Featured",

    title:
      type === "doctor"
        ? currentLocale === "es"
          ? "Top Doctores"
          : "Top Doctors"
        : currentLocale === "es"
          ? "Top Clínicas"
          : "Top Clinics",

    subtitle:
      currentLocale === "es"
        ? "Descubre los especialistas y clínicas mejor valorados."
        : "Discover our highest-rated specialists and clinics.",

    doctors:
      currentLocale === "es"
        ? "Doctores"
        : "Doctors",

    clinics:
      currentLocale === "es"
        ? "Clínicas"
        : "Clinics",
  };


  const items =
    type === "doctor"
      ? doctors.map((d) => ({
          id: d.id,
          name: d.doctor?.name,
          city: d.doctor?.city,
          image: d.doctor?.image,
          href: `/${currentLocale}/${
            currentLocale === "es"
              ? "directorio"
              : "directory"
          }/${d.doctor?.slug}`,
        }))

      : clinics.map((c) => ({
          id: c.id,
          name: c.name,
          city: c.city,
          image: c.image,
          href: `/${currentLocale}/${
            currentLocale === "es"
              ? "clinicas"
              : "clinics"
          }/${c.slug}`,
        }));


  const listRoute =
    type === "doctor"
      ? `/${currentLocale}/${
          currentLocale === "es"
            ? "directorio"
            : "directory"
        }`
      : `/${currentLocale}/${
          currentLocale === "es"
            ? "clinicas"
            : "clinics"
        }`;

  return (
    <section className="max-w-7xl mx-auto px-6 md:py-20">
      <div className="flex flex-col items-center gap-8">

        <div className="flex flex-col items-center text-center">
          <span
            className="
              text-primary
              text-sm
              font-semibold
              tracking-[0.35em]
              uppercase
            "
          >
            {t.recommended}
          </span>

          <h2
            className="
              mt-3
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
            "
          >
            {t.title}
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-muted-foreground
              text-lg
            "
          >
            {t.subtitle}
          </p>

          <div
            className="
              mt-8
              inline-flex
              rounded-full
              bg-gray-100
              p-1.5
              shadow-inner
            "
          >
            <button
              onClick={() => setType("doctor")}
              className={`
                rounded-full
                px-7
                py-3
                font-semibold
                transition-all
                duration-300

                ${
                  type === "doctor"
                    ? "bg-white text-primary shadow-lg"
                    : "text-gray-500 hover:text-gray-900"
                }
              `}
            >
              {t.doctors}
            </button>

            <button
              onClick={() => setType("clinic")}
              className={`
                rounded-full
                px-7
                py-3
                font-semibold
                transition-all
                duration-300

                ${
                  type === "clinic"
                    ? "bg-white text-primary shadow-lg"
                    : "text-gray-500 hover:text-gray-900"
                }
              `}
            >
              {t.clinics}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 mt-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col items-center text-center"
            >
              <h3 className="mb-5 text-xl md:font-bold text-gray-900 uppercase min-h-[30px]">
                {item.name}
              </h3>

              {type === "doctor" ? (
                <div className="w-full h-full md:w-[300px] md:h-[300px] rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      Sin imagen
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full md:w-[360px] md:h-[240px] rounded-3xl overflow-hidden shadow-xl">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      Sin imagen
                    </div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={`/${locale}/${
              type === "doctor"
                ? locale === "es"
                  ? "directorio"
                  : "directory"
                : locale === "es"
                  ? "clinicas"
                  : "clinics"
            }`}
            className="
              inline-flex
              items-center
              rounded-full
              bg-primary
              px-8
              py-4
              text-white
              font-semibold
              shadow-lg
              transition-all
              hover:scale-105
              hover:bg-primary/90
            "
          >
            {type === "doctor"
              ? dict.viewDoctors
              : dict.viewClinics}
          </Link>
        </div>

      </div>
    </section>
  );
}
