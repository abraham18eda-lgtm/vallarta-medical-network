"use client";

import { useEffect, useState } from "react";
import Filters from "./Filters";
import EspecialidadesList from "@/components/home/EspecialidadesList";
import DoctorsList from "@/components/home/DoctorsList";
import { useRouter } from "next/navigation";

type Props = {
  locale: "es" | "en";
  initialCategory?: string;
};

export default function DirectorioEspecialidades({
  locale,
  initialCategory = "",
}: Props) {

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<any[]>([]);


  useEffect(() => {
    // fetch("/api/categories/tree?type=DOCTOR")
     fetch(`/api/categories/tree?type=DOCTOR&locale=${locale}`)
      .then(r => r.json())
      .then(data => {
        setCategories(data || []);
      });
  }, [locale]);

  const getSpecialtyUrl = (locale: "es" | "en", slug: string) => {
    return locale === "es"
      ? `/${locale}/directorio/especialidad/${slug}`
      : `/${locale}/directory/specialty/${slug}`;
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);

    if (!slug) {
      router.push(
        locale === "es"
          ? "/es/directorio"
          : "/en/directory"
      );

      return;
    }

      router.push(getSpecialtyUrl(locale, slug));
  };

  return (

    <div className="container mx-auto px-2 py-16">
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">

        {/* FILTROS */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          // onCategoryChange={(slug)=>{
          //   setSelectedCategory(slug);
          // }}
          search={search}
          onSearchChange={(value)=>{
            setSearch(value);
          }}
        />


        {/* RESULTADOS */}
        <div>

          {
            search || selectedCategory
            ?
            <DoctorsList
              locale={locale}
              initialCategory={selectedCategory}
              search={search}
            />
            :
            <EspecialidadesList
              locale={locale}
              categories={categories}
            />
          }

        </div>


      </div>

    </div>

  );
}