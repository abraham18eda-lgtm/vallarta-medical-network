import Link from 'next/link';

export function PromoBanner({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex justify-center text-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {data.title}
          </h2>

          <p className="mt-4 text-lg text-white/90">
            {data.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {data.primaryButton && (
              <Link
                href={data.primaryButton.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary/90 transition"
              >
                {data.primaryButton.label}
              </Link>
            )}

            {data.secondaryButton && (
              <Link
                href={data.secondaryButton.href}
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-8 py-3 font-medium text-white hover:bg-white/10 transition"
              >
                {data.secondaryButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}