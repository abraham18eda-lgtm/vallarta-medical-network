'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export function HeroSlider({ slides = []  }: { slides: any[] }) {
  // const slides = dict?.hero?.slides ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides?.length) return null;


  return (
    <section className="relative h-[520px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image 
            src={slide.image?.startsWith("/") ? slide.image : `/${slide.image}`}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-center text-center px-4 text-white">
        <span className="inline-block mx-auto bg-primary/90 px-4 py-1 rounded-full text-sm font-semibold">
          {slides[index].title}{' '}
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
          {slides[index].title}{' '} 
          <span className="text-primary">
            {slides[index].highlight}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
          {slides[index].description}
        </p>

        {/* Bullets */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() =>
            setIndex((index - 1 + slides.length) % slides.length)
          }
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 text-white"
        >
          <Icon icon="solar:alt-arrow-left-linear" />
        </button>

        <button
          onClick={() =>
            setIndex((index + 1) % slides.length)
          }
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 text-white"
        >
          <Icon icon="solar:alt-arrow-right-linear" />
        </button>
      </div>
    </section>
  );
}