
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
  title?: string
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

  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    onSelect()

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }

  }, [emblaApi])



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
  <section className="relative w-full overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 py-0">

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
            left-3
            top-1/2
            -translate-y-1/2
            z-20

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-sky-50
            to-gray-200

            text-sky-700

            shadow-sm
            ring-1
            ring-sky-200/80

            transition-all
            duration-200

            hover:from-sky-600
            hover:to-blue-600
            hover:text-white

            active:scale-95
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollNext}
            className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            z-20

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-sky-50
            to-gray-200

            text-sky-700

            shadow-sm
            ring-1
            ring-sky-200/80

            transition-all
            duration-200

            hover:from-sky-600
            hover:to-blue-600
            hover:text-white

            active:scale-95
            "
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Embla */}
      <div
        ref={emblaRef}
        className="overflow-hidden py-8"
      >
        <div className="flex items-center">

          {slides.map((slide, index) => {

            const imageSrc = getImageForSlide(slide)

            if (!imageSrc) return null

            return (
              <div
                key={slide.id}
                className={`
                   flex-[0_0_420px]
                    max-w-[420px]
                    px-2
                    py-6
                `}
              >


                <Link href={slide.link}>

                  <div
                    className={`
                      relative
                      w-full
                      overflow-hidden
                      rounded-[36px]
                      bg-slate-100
                      
                      border-2
                      border-white/30

                      transition-transform
                      duration-500
                      ease-out

                       ${
                          selectedIndex === index
                            ? `
                              aspect-[390/500]
                              scale-[1.08]
                              z-10
                              
                            `
                            : `
                              aspect-[390/500]
                              scale-95
                              
                            `
                        }

                      shadow-[0_25px_45px_-25px_rgba(14,165,233,0.45)]
                      group
                    `}
                  >


                    <Image
                      src={imageSrc}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-out
                        group-hover:scale-[1.06]
                      "
                    />


                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-slate-950/90
                        via-slate-900/30
                        to-transparent
                      "
                    />


                    {(slide.title || slide.description || slide.highlight) && (
                      <div className="absolute inset-0 flex items-end p-5">

                        <div
                          className="
                            w-full
                            rounded-2xl
                            bg-white/10
                            backdrop-blur-md
                            p-5
                            text-white
                            border
                            border-white/10
                          "
                        >

                          {slide.highlight && (
                            <p
                              className="
                                mb-3
                                inline-flex
                                rounded-full
                                bg-white/10
                                px-3
                                py-1
                                text-xs
                                uppercase
                                tracking-[0.2em]
                                text-sky-200
                              "
                            >
                              {slide.highlight}
                            </p>
                          )}

                          <h2
                            className="
                              text-3xl
                              md:text-4xl
                              font-semibold
                              leading-tight
                              tracking-tight
                            "
                          >
                            {slide.title}
                          </h2>

                          {slide.description && (
                            <p
                              className="
                                mt-5
                                text-white/90
                                leading-relaxed
                              "
                            >
                              {slide.description}
                            </p>
                          )}

                        </div>

                      </div>
                    )}

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