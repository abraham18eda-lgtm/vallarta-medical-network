"use client"

import { useState } from "react"

export default function Lightbox({ images }: any) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images?.length) return null

  return (
    <>
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-3">

        <img
          src={images[0]}
          onClick={() => {
            setIndex(0)
            setOpen(true)
          }}
          className="w-full h-72 object-cover rounded-2xl cursor-pointer hover:opacity-90"
        />

        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              onClick={() => {
                setIndex(i + 1)
                setOpen(true)
              }}
              className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-90"
            />
          ))}
        </div>

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <button
            onClick={prev}
            className="absolute left-6 text-white text-3xl"
          >
            ‹
          </button>

          <img
            src={images[index]}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
          />

          <button
            onClick={next}
            className="absolute right-6 text-white text-3xl"
          >
            ›
          </button>

        </div>
      )}
    </>
  )
}