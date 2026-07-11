import Link from "next/link";
import Image from "next/image";

export default function DesktopTop({ sections, locale }: any) {
  const Section = ({ title, items, basePath, buttonText  }: any) => (

    <div className="my-20">
      <h2 className="text-2xl font-bold my-12">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(items ?? []).map((item: any) => (
          <Link
            key={item.id}
            href={`/${locale}/${basePath}/${item.slug ?? ""}`}
            // href={`/${basePath}/${item.slug ?? ""}`}
            className="
              group
              overflow-hidden
              rounded-2xl
              border
              bg-white
              shadow-sm
              hover:shadow-xl
              transition
            "
          >
            {/* IMAGE */}
            <div className="relative w-full h-48 md:h-56">
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.name || "item"}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center md:text-left">
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.city}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTON VER TODOS */}
      <div className="mt-10 flex justify-center">

        <Link
          href={`/${locale}/${basePath}`}
          className="
            rounded-full
            bg-primary
            px-8
            py-3
            text-white
            font-semibold
            shadow-lg
            hover:bg-primary/90
            transition
          "
        >
          {buttonText}
        </Link>

      </div>
    </div>
  );

  return (
     <section className="hidden md:block py-16 container mx-auto px-6 text-center">
      <Section
        title={
          locale === "es"
            ? "TOP Dentales"
            : "TOP Dental Clinics"
        }
        items={sections.dentals}
        basePath={
          locale === "es"
            ? "dentales"
            : "dental"
        }
        buttonText={
          locale === "es"
            ? "Ver todos los dentales"
            : "View all dental clinics"
        }
      />


      <Section
        title={
          locale === "es"
            ? "TOP Oftalmología"
            : "TOP Ophthalmology"
        }
        items={sections.ophthalmology}
        basePath={
          locale === "es"
            ? "clinicas"
            : "clinics"
        }
        buttonText={
          locale === "es"
            ? "Ver clínicas de oftalmología"
            : "View ophthalmology clinics"
        }
      />


      <Section
        title={
          locale === "es"
            ? "TOP Clínicas"
            : "TOP Clinics"
        }
        items={sections.clinics}
        basePath={
          locale === "es"
            ? "clinicas"
            : "clinics"
        }
        buttonText={
          locale === "es"
            ? "Ver todas las clínicas"
            : "View all clinics"
        }
      />
    </section>

  );
}