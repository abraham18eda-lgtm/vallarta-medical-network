"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const options = [
  { key: "doctors", label: "Doctores" },
  { key: "clinics", label: "Clínicas" },
  { key: "dentals", label: "Dentales" },
  { key: "ophthalmology", label: "Oftalmología" },
  { key: "cardiology", label: "Cardiología" },
  { key: "nutrition", label: "Nutrición" },
];

export default function MobileTop({ sections }: any) {
  const [selected, setSelected] = useState("clinics");
  const items = sections[selected];

  return (
    <section className="md:hidden py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Explorar
      </h2>

      {/* Selector */}
      <select
        className="w-full border rounded-xl p-3 mb-6"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Cards */}
      <div className="space-y-6">
        {items?.map((item: any) => (
          <Link
            key={item.id}
            href={`/es/clinicas/${item.slug}`}
            className="block rounded-2xl overflow-hidden shadow-md"
          >
            <div className="relative w-full h-64">
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.city}
              </p>

              <span className="text-blue-600 text-sm font-medium">
                Ver perfil →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}