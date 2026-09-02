"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";

interface Props {
  doctors: any[];
  clinics: any[];
  dentals: any[];
  oftalmologies: any[];
  locale: string;
  dict: any;
}

export default function TopSelector({
  doctors,
  clinics,
  dentals,
  oftalmologies,
  locale,
  dict,
}: Props) {
  
  const [type, setType] = useState<
    "doctor" | "clinic" | "dental" | "oftalmology"
  >("doctor");

  const currentLocale = locale as "es" | "en";

  /*
   * TEXTOS
   */
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
        : type === "clinic"
          ? currentLocale === "es"
            ? "Top Clínicas"
            : "Top Clinics"
          : type === "dental"
            ? currentLocale === "es"
              ? "Top Dentales"
              : "Top Dental"
            : currentLocale === "es"
              ? "Top Oftalmología"
              : "Top Ophthalmology",

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

    dentals:
      currentLocale === "es"
        ? "Dentales"
        : "Dental",

    oftalmologies:
      currentLocale === "es"
        ? "Oftalmología"
        : "Ophthalmology",
  };

  /*
   * ITEMS
   *
   * Aquí traducimos la información de los doctores
   * según el locale actual.
   */
  const items: any[] =
    type === "doctor"
      ? doctors.map((d) => {
          const doctorTranslation =
            d.doctor?.translations?.find(
              (t: any) => t.locale === currentLocale
            );
   
          return {
            id: d.id,

            name: doctorTranslation?.name ?? "",
            city: doctorTranslation?.city ?? "",

            image: d.doctor?.image,

            slug: d.doctor?.slug ?? "",

            gender: d.doctor?.gender ?? "",

            categories:
              d.doctor?.categories?.map((item: any) => {
                const categoryTranslation =
                  item.category?.translations?.find(
                    (t: any) =>
                      t.locale === currentLocale
                  );

                return {
                  id: item.category.id,

                  name:
                    categoryTranslation?.name ||
                    item.category.name,
                };
              }) ?? [],
          };
        })

      : type === "clinic"
        ? clinics.map((c) => ({
            id: c.id,
            name: c.name,
            city: c.city,
            image: c.image,
            slug: c.slug ?? "",
            categories: [],
          }))

        : type === "dental"
          ? dentals.map((d) => ({
              id: d.id,
              name: d.name,
              city: d.city,
              image: d.image,
              slug: d.slug ?? "",
              categories: [],
            }))

          : oftalmologies.map((o) => ({
              id: o.id,
              name: o.name,
              city: o.city,
              image: o.image,
              slug: o.slug ?? "",
              categories: [],
            }));

  /*
   * TABS
   */
  const tabs = [
    {
      key: "doctor" as const,
      label: t.doctors,
    },
    {
      key: "clinic" as const,
      label: t.clinics,
    },
    {
      key: "dental" as const,
      label: t.dentals,
    },
    {
      key: "oftalmology" as const,
      label: t.oftalmologies,
    },
  ];

  /*
   * RUTA DEL BOTÓN "VER TODOS"
   */
  const listRoute =
    type === "doctor"
      ? "/directorio"
      : type === "clinic"
        ? "/clinicas"
        : type === "dental"
          ? "/dentales"
          : "/oftalmologia";

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col items-center gap-6 text-center">

        {/* HEADER */}
        <div className="max-w-2xl">

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-primary
            "
          >
            {t.recommended}
          </span>

          <p
            className="
              mt-3
              text-muted-foreground
              text-base
              md:text-lg
            "
          >
            {t.subtitle}
          </p>

          {/* TABS */}
          <div
            className="
              glass-soft
              mt-6
              inline-flex
              flex-wrap
              justify-center
              gap-1
              rounded-2xl
              p-1.5
              backdrop-blur-md
            "
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setType(tab.key)}
                className={`
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    type === tab.key
                      ? "bg-white/80 text-sky-700 shadow-sm ring-1 ring-sky-100"
                      : "text-gray-500 hover:bg-white/40 hover:text-sky-700"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <h2
          className="
            mt-2
            font-serif
            text-3xl
            md:text-4xl
            font-semibold
            tracking-tight
            font-heading
            text-cyan-600
          "
        >
          {t.title}
        </h2>

        {/* CARDS */}
        <div
          className="
            mt-2
            grid
            w-full
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {items.map((item) => (

            <Link
              key={item.id}

              /*
               * IMPORTANTE:
               *
               * No ponemos /es ni /en manualmente.
               *
               * next-intl toma:
               *
               * /directorio/[slug]
               *
               * y según el idioma genera:
               *
               * ES -> /es/directorio/slug
               * EN -> /en/directory/slug
               */
              href={{
                pathname: "/directorio/[slug]",
                params: {
                  slug: item.slug,
                },
              }}

              className="
                group
                overflow-hidden
                rounded-[28px]
                border
                border-gray-100
                bg-white
                p-3
                hover-shadow-sky
              "
            >

              {/* IMAGEN */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[22px]
                "
              >

                {item.image ? (

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-72
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-72
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-sky-500
                      via-cyan-500
                      to-blue-700
                      text-base
                      text-white
                    "
                  >
                    {item.name?.charAt(0).toUpperCase() || "?"}
                  </div>

                )}

                {/* BADGE */}
                <div
                  className="
                    glass-strong
                    absolute
                    right-3
                    top-3
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-primary
                  "
                >
                  {currentLocale === "es"
                    ? "Verificado"
                    : "Verified"}
                </div>

              </div>

              {/* INFORMACIÓN */}
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  px-4
                  py-4
                "
              >

                <div
                  className="
                    min-w-0
                    flex-1
                    text-left
                  "
                >

                  {/* NOMBRE */}
                  <h3
                    className="
                      text-lg
                      font-semibold
                      leading-tight
                      text-gray-900
                      transition-colors
                    "
                  >
                    {item.gender === "HOMBRE"
                      ? "Dr. "
                      : item.gender === "MUJER"
                        ? "Dra. "
                        : ""}
                    {item.name}
                  </h3>

                  {/* CATEGORÍAS */}
                  {item.categories.length > 0 && (

                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        text-gradient-primary
                        truncate
                      "
                    >
                      {item.categories
                        .map((cat: any) => cat.name)
                        .join(" • ")}
                    </p>

                  )}

                  {/* CIUDAD */}
                  {item.city && (

                    <p
                      className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                        text-sm
                        text-gray-500
                      "
                    >
                      <MapPin
                        className="
                          h-4
                          w-4
                          text-sky-500
                        "
                      />

                      {item.city}
                    </p>

                  )}

                </div>

                {/* ARROW */}
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-sky-50
                    text-sky-600
                    ring-1
                    ring-sky-100
                    transition-all
                    duration-300
                  "
                >
                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  />
                </span>

              </div>

            </Link>

          ))}

        </div>

        {/* BOTÓN VER TODOS */}
        <div className="mt-10 flex justify-center">

          <Link
            href={listRoute  as any}
            className="
              btn-form
              whitespace-nowrap
              hover:bg-[#0B3558]
              z-10
            "
          >
            {type === "doctor"
              ? dict.viewDoctors
              : type === "clinic"
                ? dict.viewClinics
                : type === "dental"
                  ? dict.viewDentals
                  : dict.viewOphthalmology}
          </Link>

        </div>

      </div>
    </section>
  );
}
