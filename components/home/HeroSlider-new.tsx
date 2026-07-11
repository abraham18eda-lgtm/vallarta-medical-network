"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

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

  const [current, setCurrent] = useState(0)

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

      setIsTablet(
        width >= 768 && width < 1280
      )
    }

    checkScreen()

    window.addEventListener(
      "resize",
      checkScreen
    )

    return () =>
      window.removeEventListener(
        "resize",
        checkScreen
      )

  }, [])

  // =========================
  // AUTOPLAY
  // =========================
  useEffect(() => {

    if (slides.length <= 1) return

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      )

    }, 5000)

    return () => clearInterval(interval)

  }, [slides.length])

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

      <div className="relative h-[260px] md:h-[500px] xl:h-[650px]">

        {slides.map((slide, index) => {

          const imageSrc =
            getImageForSlide(slide)

          if (!imageSrc) return null

          return (
            
            <div
              key={slide.id}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-700
                ${
                  current === index
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }
              `}
            >

              {/* IMAGE */}
              {imageSrc ? (

                <Image
                  src={imageSrc}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

              ) : (

                <div
                  className="
                    w-full
                    h-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-gray-400
                  "
                >
                  Sin imagen
                </div>

              )}

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-black/40
                "
              />

              {/* CONTENT */}
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                "
              >

                <div
                  className="
                    max-w-7xl
                    mx-auto
                    px-6
                    w-full
                  "
                >

                  <div
                    className="
                      max-w-2xl
                      text-white
                    "
                  >

                    {slide.highlight && (

                      <p
                        className="
                          text-blue-300
                          font-semibold
                          text-sm
                          md:text-lg
                          mb-3
                          uppercase
                          tracking-wide
                        "
                      >
                        {slide.highlight}
                      </p>

                    )}

                    <h2
                      className="
                        text-3xl
                        md:text-5xl
                        xl:text-6xl
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
                          text-sm
                          md:text-lg
                          text-gray-200
                          leading-relaxed
                        "
                      >
                        {slide.description}
                      </p>

                    )}

                    {slide.link && (

                      <Link
                        href={slide.link}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          mt-8
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-8
                          py-4
                          rounded-2xl
                          transition
                          font-medium
                          shadow-lg
                        "
                      >
                        Ver más
                      </Link>

                    )}

                  </div>

                </div>

              </div>

            </div>

          )
        })}

      </div>

      {/* DOTS */}
      {slides.length > 1 && (

        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            z-30
            flex
            gap-3
          "
        >

          {slides.map((_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrent(index)
              }
              className={`
                w-3
                h-3
                rounded-full
                transition
                ${
                  current === index
                    ? "bg-white scale-125"
                    : "bg-white/40"
                }
              `}
            />

          ))}

        </div>

      )}

    </section>
  )
}