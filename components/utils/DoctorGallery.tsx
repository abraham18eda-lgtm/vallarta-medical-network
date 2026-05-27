"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function DoctorGallery({ images = [] }: any) {
  const [selected, setSelected] = useState<string | null>(null)

  // cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <>
      {/* GRID */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-bold text-lg mb-3">Galería</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.length === 0 && (
            <p className="text-gray-400 col-span-3">
              Sin imágenes
            </p>
          )}

          {images.map((img: string, i: number) => (
            <div
              key={i}
              onClick={() => setSelected(img)}
              className="relative h-28 md:h-32 cursor-pointer overflow-hidden rounded-xl group"
            >
              <Image
                src={img}
                alt={`gallery-${i}`}
                fill
                className="object-cover group-hover:scale-105 transition"
              />

              {/* overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="relative w-[90%] h-[80%]">
            <Image
              src={selected}
              alt="preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}