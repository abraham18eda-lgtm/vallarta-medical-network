
"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide {
  id: number
  image?: string | null
  imageTablet?: string | null
  imageMobile?: string | null
  title: string
  highlight?: string | null
  description?: string | null
  link?: string | null
}

export default function HeroSlider({
  slides
}: {
  slides: any[]
}) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  )

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const [isMobile, setIsMobile] =
    useState(false)

  const [isTablet, setIsTablet] =
    useState(false)

  // =========================
  // RESPONSIVE DETECTION
  // =========================
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth

      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1280)
    }

    checkScreen()

    window.addEventListener("resize", checkScreen)

    return () => {
      window.removeEventListener("resize", checkScreen)
    }
  }, [])

  // =========================
  // IMAGE SELECTOR
  // =========================
  const getImageForSlide = (
    slide: HeroSlide
  ) => {

    // MOBILE
    if (isMobile) {

      return (
        slide.imageMobile ||
        slide.imageTablet ||
        slide.image ||
        null
      )
    }

    // TABLET
    if (isTablet) {

      return (
        slide.imageTablet ||
        slide.image ||
        null
      )
    }

    // DESKTOP
     return (
        slide.image ||
        slide.imageTablet ||
        slide.imageMobile ||
        null
      )
  }

  if (!slides?.length) return null

 return (
  <section className="relative w-full my-6">
    <div className="mx-auto max-w-7xl px-4">

      {/* Flechas */}
      {/* {slides.length > 1 && (
        <div className="mb-6 flex justify-end gap-3">
          <button
            onClick={scrollPrev}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl border border-slate-200
              bg-white shadow-sm
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollNext}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl border border-slate-200
              bg-white shadow-sm
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )} */}
      {/* Flechas laterales */}
      {slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              shadow-md
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollNext}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              shadow-md
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Embla */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex">

          {slides.map((slide, index) => {

            const imageSrc = getImageForSlide(slide)

            if (!imageSrc) return null

            return (
              
              <div
                key={slide.id}
                className="
                  flex-[0_0_390px]
                  max-w-[390px]
                  px-3
                "
              >
                <Link  href={slide.link} >
                  <div
                    className="
                      relative
                      w-full
                      aspect-[390/500]
                      overflow-hidden
                      rounded-3xl
                      shadow-xl
                      group
                    "
                  >

                    <Image
                      src={imageSrc}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                      "
                    />

                    {/* Contenido */}
                    <div className="absolute inset-0 flex items-end">

                      <div className="w-full p-6 md:p-10 text-white">

                        {slide.highlight && (
                          <p
                            className="
                              mb-3
                              text-sm
                              uppercase
                              tracking-[0.25em]
                              font-semibold
                              text-blue-300
                            "
                          >
                            {slide.highlight}
                          </p>
                        )}

                        <h2
                          className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            leading-tight
                          "
                        >
                          {slide.title}
                        </h2>

                        {slide.description && (
                          <p
                            className="
                              mt-5
                              max-w-lg
                              text-white/90
                              leading-relaxed
                            "
                          >
                            {slide.description}
                          </p>
                        )}

                        {/* {slide.link && (
                          <Link
                            href={slide.link}
                            className="
                              mt-8
                              inline-flex
                              items-center
                              rounded-xl
                              bg-white
                              px-6
                              py-3
                              font-medium
                              text-slate-900
                              transition
                              hover:bg-blue-600
                              hover:text-white
                            "
                          >
                            Ver más
                          </Link>
                        )} */}

                      </div>

                    </div>

                  </div>
                </Link>
              </div>

            )

          })}

        </div>
      </div>

    </div>
  </section>
  )
}