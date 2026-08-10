"use client";

interface Props {
  locale: "es" | "en";
}

export default function NoticiasList({ locale }: Props) {
  return (
    <section className="section-glow px-6 py-16 lg:px-20">
      <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center">
        <div className="rounded-3xl bg-white px-10 py-16 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === "en"
              ? "No information found"
              : "No se encontró información"}
          </h2>
        </div>
      </div>
    </section>
  );
}