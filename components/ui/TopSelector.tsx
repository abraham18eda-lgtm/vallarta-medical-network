"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Props {
  doctors: any[];
  clinics: any[];
}

export default function TopSelector({
  doctors,
  clinics,
}: Props) {
  const [type, setType] = useState<"doctor" | "clinic">("doctor");

  const items =
    type === "doctor"
      ? doctors.map((d) => ({
          id: d.id,
          name: d.doctor?.name,
          city: d.doctor?.city,
          image: d.doctor?.image,
          href: `/doctors/${d.doctor?.slug}`,
        }))
      : clinics.map((c) => ({
          id: c.id,
          name: c.name,
          city: c.city,
          image: c.image,
          href: `/places/${c.slug}`,
        }));

  return (
    <section className="max-w-7xl mx-auto px-6 md:py-20">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-4 ">
            <h2 className="text-4xl font-bold">TOP</h2>

            <div className="inline-flex rounded-full bg-gray-100 p-1">
            <button
                onClick={() => setType("doctor")}
                className={`px-6 py-2 rounded-full transition ${
                type === "doctor"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-500"
                }`}
            >
                Doctores
            </button>

            <button
                onClick={() => setType("clinic")}
                className={`px-6 py-2 rounded-full transition ${
                type === "clinic"
                    ? "bg-white shadow font-semibold"
                    : "text-gray-500"
                }`}
            >
                Clínicas
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
                <div className="w-full h-full md:w-[300px] md:h-[300px] rounded-full overflow-hidden">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                ) : (
                <div className="w-full h-full md:w-[360px] md:h-[240px] rounded-3xl overflow-hidden shadow-xl">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                )}
              {/* <p className="mt-5 text-gray-500 text-lg">
                {item.city}
              </p> */}
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}