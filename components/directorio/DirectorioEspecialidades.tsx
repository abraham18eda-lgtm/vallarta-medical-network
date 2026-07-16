"use client";

import { useEffect, useState } from "react";
import Filters from "./Filters";
import EspecialidadesList from "@/components/home/EspecialidadesList";
import DoctorsList from "@/components/home/DoctorsList";

type Props = {
  locale: "es" | "en";
};

export default function DirectorioEspecialidades({
  locale
}: Props) {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<any[]>([]);


  useEffect(() => {
    fetch("/api/categories/tree?type=DOCTOR")
      .then(r => r.json())
      .then(data => {
        setCategories(data || []);
      });
  }, []);


  return (

    <div className="container mx-auto px-6 py-20">

      <div
        className="
          grid
          lg:grid-cols-[280px_1fr]
          gap-8
        "
      >

        {/* FILTROS */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(slug)=>{
            setSelectedCategory(slug);
          }}
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