import Image from "next/image"
import Link from "next/link"

type Button = {
  label: string
  href: string
}

type AdsSectionData = {
  image: string
  title?: string
  subtitle?: string
  primaryButton?: Button
  secondaryButton?: Button
}

type Props = {
  data: AdsSectionData
}

export function AdsSection({ data }: Props) {
  if (!data?.image) return null

  return (
    <section className="relative w-full overflow-hidden md:min-h-[320px]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title ?? "Publicidad"}
          fill
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl text-white">
          {data.title && (
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {data.title}
            </h2>
          )}

          {data.subtitle && (
            <p className="mt-4 text-lg text-white/90">
              {data.subtitle}
            </p>
          )}

          {(data.primaryButton || data.secondaryButton) && (
            <div className="mt-8 flex flex-wrap gap-4">
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
          )}
        </div>
      </div>
    </section>
  )
}