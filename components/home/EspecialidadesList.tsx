"use client";

import { Link } from "@/i18n/navigation";

type Props = {
  locale: "es" | "en";
  categories: any[];
};

export default function EspecialidadesList({
  locale,
  categories,
}: Props) {

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={{
            pathname: "/directorio/especialidad/[slug]",
            params: {
              slug: category.slug,
            },
          }}
          className="
            group
            rounded-3xl
            bg-white
            p-7
            shadow-sm
            border
            transition
            hover:-translate-y-2
          "
        >
          <div
            className="
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
            "
          >
            ✚
          </div>

          <h2 className="text-xl font-bold">
            {category.name}
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            {category._count?.doctors ?? 0} especialistas disponibles
          </p>

          <div className="mt-5 text-sm font-semibold text-[#0F4C81]">
            Ver especialistas →
          </div>
        </Link>
      ))}
    </div>
  );
}