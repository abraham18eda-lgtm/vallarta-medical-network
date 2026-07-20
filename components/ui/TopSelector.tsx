"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, MapPin, BadgeCheck, ArrowUpRight } from 'lucide-react'

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

  // const [type, setType] = useState<"doctor" | "clinic">("doctor");
  const [type, setType] = useState<"doctor" | "clinic" | "dental" | "oftalmology">("doctor");
  
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
        : "Oftalmology",
  };


  const items =
  type === "doctor"
    ? doctors.map((d) => ({
      id: d.id,
      name: d.doctor?.name,
      city: d.doctor?.city,
      image: d.doctor?.image,

      categories:
        d.doctor?.categories?.map((item: any) => ({
          id: item.category.id,
          name: item.category.name,
        })) ?? [],

      href: `/${locale}/directorio/${d.doctor?.slug}`,
    }))

  : type === "clinic"
    ? clinics.map((c) => ({
        id: c.id,
        name: c.name,
        city: c.city,
        image: c.image,
        categories: [],
        href: `/${currentLocale}/clinicas/${c.slug}`,
      }))

  : type === "dental"
    ? dentals.map((d) => ({
        id: d.id,
        name: d.name,
        city: d.city,
        image: d.image,
        categories: [],
        href: `/${currentLocale}/dentales/${d.slug}`,
      }))

  : oftalmologies.map((o) => ({
      id: o.id,
      name: o.name,
      city: o.city,
      image: o.image,
      categories: [],
      href: `/${currentLocale}/oftalmologia/${o.slug}`,
  }));
  // const items =
  //   type === "doctor"
  //     ? doctors.map((d) => ({
  //         id: d.id,
  //         name: d.doctor?.name,
  //         city: d.doctor?.city,
  //         image: d.doctor?.image,
  //         href: `/${currentLocale}/${
  //           currentLocale === "es"
  //             ? "directorio"
  //             : "directory"
  //         }/${d.doctor?.slug}`,
  //       }))

  //     : clinics.map((c) => ({
  //         id: c.id,
  //         name: c.name,
  //         city: c.city,
  //         image: c.image,
  //         href: `/${currentLocale}/${
  //           currentLocale === "es"
  //             ? "clinicas"
  //             : "clinics"
  //         }/${c.slug}`,
  //       }));


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
      
  return (
  <section className="max-w-7xl mx-auto px-6 py-10">
    <div className="flex flex-col items-center gap-6 text-center">

      {/* Header */}
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



        {/* Tabs */}
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
      <h2
        className="
          mt-2
          font-serif
          text-3xl
          md:text-4xl
          font-semibold
          tracking-tight
          text-gray-900
        "
      >
        {t.title}
      </h2>




      {/* Cards */}
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
            href={item.href}
            className="
              group
              overflow-hidden
              rounded-[28px]
              border
              border-gray-100
              bg-white
              p-3
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-sky-300/50
              hover:shadow-[0_18px_40px_-16px_rgba(2,132,199,0.16)]
            "
          >


            {/* Imagen */}
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
                    bg-gray-100
                    text-sm
                    text-gray-400
                  "
                >
                  Sin imagen
                </div>

              )}



              {/* Badge */}
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
                Verificado
              </div>


            </div>




            {/* Información */}
            <div className="flex items-start justify-between gap-4 px-4 py-4">
              <div className="min-w-0 flex-1 text-left">
                <h3
                  className="
                    text-lg
                    font-semibold
                    leading-tight
                    text-gray-900
                    transition-colors                 
                  "
                >
                  {item.name}
                </h3>

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
                    <MapPin className="h-4 w-4 text-sky-500" />
                    {item.city}
                  </p>
                )}
              </div>

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
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>

          </Link>

        ))}

      </div>




      {/* Botón */}
      <div className="mt-10 flex justify-center">

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
            rounded-2xl
            bg-primary
            px-7
            py-3.5
            text-white
            font-semibold
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-primary/90
            hover:shadow-lg
          "
        >
          {type === "doctor"
            ? dict.viewDoctors
            : type === "clinic"
              ? dict.viewClinics
              : type === "dental"
                ? dict.viewDentals
                : dict.viewOphthalmology
          }
        </Link>

      </div>


    </div>
  </section>
);
      
  // return (
  //   <section className="max-w-7xl mx-auto px-6 md:py-10">
  //     <div className="flex flex-col items-center gap-6 text-center">
    
  //       <div className="max-w-2xl">
  //         <span
  //           className="
  //             text-xs
  //             font-semibold
  //             uppercase
  //             tracking-[0.25em]
  //             text-primary
  //           "
  //         >
  //           {t.recommended}
  //         </span>        

  //         <p
  //           className="
  //             mt-3
  //             text-muted-foreground
  //             text-base
  //             md:text-lg
  //           "
  //         >
  //           {t.subtitle}
  //         </p>

  //         <div
  //           className="
  //             mt-4
  //             inline-flex
  //             flex-wrap
  //             justify-center
  //             gap-1
  //             rounded-2xl
  //             border
  //             border-gray-200
  //             bg-white/80
  //             p-1.5
  //             shadow-sm
  //             backdrop-blur-md
  //           "
  //         >
  //           <button
  //             onClick={() => setType("doctor")}
  //             className={`
  //               rounded-xl
  //               px-5
  //               py-2.5
  //               text-sm
  //               font-semibold
  //               transition-all
  //               duration-300

  //               ${
  //                 type === "doctor"
  //                   ? "bg-white text-primary shadow-lg"
  //                   : "text-gray-500 hover:text-gray-900"
  //               }
  //             `}
  //           >
  //             {t.doctors}
  //           </button>

  //           <button
  //             onClick={() => setType("clinic")}
  //             className={`
  //               rounded-xl
  //               px-5
  //               py-2.5
  //               text-sm
  //               font-semibold
  //               transition-all
  //               duration-300

  //               ${
  //                 type === "clinic"
  //                   ? "bg-white text-primary shadow-lg"
  //                   : "text-gray-500 hover:text-gray-900"
  //               }
  //             `}
  //           >
  //             {t.clinics}
  //           </button>

  //           <button
  //             onClick={() => setType("dental")}
  //             className={`
  //               rounded-full
  //               px-7
  //               py-3
  //               font-semibold
  //               transition-all
  //               duration-300

  //               ${
  //                 type === "dental"
  //                   ? "bg-white text-primary shadow-lg"
  //                   : "text-gray-500 hover:text-gray-900"
  //               }
  //             `}
  //           >
  //             {t.dentals}
  //           </button>


  //           <button
  //             onClick={() => setType("oftalmology")}
  //             className={`
  //               rounded-full
  //               px-7
  //               py-3
  //               font-semibold
  //               transition-all
  //               duration-300

  //               ${
  //                 type === "oftalmology"
  //                   ? "bg-white text-primary shadow-lg"
  //                   : "text-gray-500 hover:text-gray-900"
  //               }
  //             `}
  //           >
  //             {t.oftalmologies}
  //           </button>
  //         </div>
  //         <h2
  //           className="
  //             mt-3
  //             font-serif
  //             text-3xl
  //             md:text-4xl
  //             font-semibold
  //             tracking-tight
  //             text-gray-900
  //           "
  //         >
  //           {t.title}
  //         </h2>
  //       </div>

  //       <div className="mt-12
  //           grid
  //           gap-6
  //           sm:grid-cols-2
  //           lg:grid-cols-3"
  //         >
  //         {items.map((item) => (
  //           <Link
  //             key={item.id}
  //             href={item.href}
  //             className="group
  //               overflow-hidden
  //               rounded-[28px]
  //               border
  //               border-gray-100
  //               bg-white
  //               p-3
  //               shadow-sm
  //               transition-all
  //               duration-300
  //               hover:-translate-y-1
  //               hover:shadow-xl"
  //             >
  //             {/* <h3 className="mb-5 text-xl md:font-bold text-gray-900 uppercase min-h-[30px]">
  //               {item.name}
  //             </h3> */}
  //             <div
  //               className="
  //               relative
  //               overflow-hidden
  //               rounded-[22px]
  //               "
  //               >

  //               <img
  //               src={item.image}
  //               alt={item.name}
  //               className="
  //               h-72
  //               w-full
  //               object-cover
  //               transition-transform
  //               duration-500
  //               group-hover:scale-105
  //               "
  //               />


  //               <div
  //               className="
  //               absolute
  //               right-3
  //               top-3
  //               rounded-full
  //               bg-white/90
  //               px-3
  //               py-1
  //               text-xs
  //               font-semibold
  //               text-primary
  //               backdrop-blur
  //               "
  //               >
  //                 Verificado
  //               </div>


  //               </div>


  //               <div className="px-2 pb-2 pt-4">

  //               <h3
  //               className="
  //               text-lg
  //               font-semibold
  //               text-gray-900
  //               "
  //               >
  //               {item.name}
  //               </h3>


  //               <p
  //               className="
  //               mt-1
  //               text-sm
  //               font-medium
  //               text-primary
  //               "
  //               >
  //               {/* {item.specialty} */}
  //               </p>


  //               </div>


  //             {type === "doctor" ? (
  //               <div className="w-full h-full md:w-[300px] md:h-[300px] rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
  //                 {item.image ? (
  //                   <img
  //                     src={item.image}
  //                     alt={item.name}
  //                     className="w-full h-full object-cover"
  //                   />
  //                 ) : (
  //                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
  //                     Sin imagen
  //                   </div>
  //                 )}
  //               </div>
  //             ) : (
  //               <div className="w-full h-full md:w-[360px] md:h-[240px] rounded-3xl overflow-hidden shadow-xl">
  //                 {item.image ? (
  //                   <img
  //                     src={item.image}
  //                     alt={item.name}
  //                     className="w-full h-full object-cover"
  //                   />
  //                 ) : (
  //                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
  //                     Sin imagen
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </Link>
  //         ))}
  //       </div>

  //       <div className="mt-16 flex justify-center">
  //         <Link
  //           href={`/${locale}/${
  //             type === "doctor"
  //               ? locale === "es"
  //                 ? "directorio"
  //                 : "directory"
  //               : locale === "es"
  //                 ? "clinicas"
  //                 : "clinics"
  //           }`}
  //           className="
  //             inline-flex
  //             items-center
  //             rounded-full
  //             rounded-2xl
  //             bg-primary
  //             px-7
  //             py-3.5
  //             shadow-md
  //             transition-all
  //             hover:-translate-y-0.5
  //             hover:shadow-lg
  //             text-white
  //             font-semibold
  //             transition-all
  //             hover:scale-105
  //             hover:bg-primary/90
  //           "
  //         >
  //           {type === "doctor"
  //             ? dict.viewDoctors
  //             : type === "clinic"
  //               ? dict.viewClinics
  //               : type === "dental"
  //                 ? dict.viewDentals
  //                 : dict.viewOphthalmology
  //           }
  //         </Link>
  //       </div>

  //     </div>
  //   </section>
  // );
}
