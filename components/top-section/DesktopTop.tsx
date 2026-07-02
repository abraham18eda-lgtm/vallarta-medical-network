import Link from "next/link";
import Image from "next/image";

export default function DesktopTop({ sections }: any) {
  const Section = ({ title, items, basePath }: any) => (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(items ?? []).map((item: any) => (
          <Link
            key={item.id}
            href={`/${basePath}/${item.slug ?? ""}`}
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
    </div>
  );

  return (
    <section className="hidden md:block py-16 container mx-auto px-6">
      <Section title="🦷 Dentales" items={sections.dentals} basePath="es/dentales" />
      <Section title="👁 Oftalmología" items={sections.ophthalmology} basePath="es/clinicas" />
      <Section title="🏥 Clínicas" items={sections.clinics} basePath="es/clinicas" />
    </section>
  );
}