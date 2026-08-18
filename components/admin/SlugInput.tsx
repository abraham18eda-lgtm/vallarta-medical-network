// "use client"

// import { useState } from "react"

// function slugify(text: string) {
//   return text
//     .toLowerCase()
//     .normalize("NFD") // quita acentos
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9\s-]/g, "")
//     .trim()
//     .replace(/\s+/g, "-")
// }

// export default function SlugInput() {
//   const [title, setTitle] = useState("")
//   const [slug, setSlug] = useState("")

//   function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = e.target.value
//     setTitle(value)
//     setSlug(slugify(value))
//   }

//   function handleSlug(e: React.ChangeEvent<HTMLInputElement>) {
//     setSlug(slugify(e.target.value))
//   }

//   return (
//     <div className="space-y-4">

//       <div>
//         <label className="text-sm font-medium">Título</label>
//         <input
//           name="title"
//           value={title}
//           onChange={handleTitle}
//           className="w-full border p-3 rounded-lg"
//         />
//       </div>

//       <div>
//         <label className="text-sm font-medium">Slug</label>
//         <input
//           name="slug"
//           value={slug}
//           onChange={handleSlug}
//           className="w-full border p-3 rounded-lg"
//         />
//       </div>

//     </div>
//   )
// }

"use client"

import { useState } from "react"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

type Props = {
  defaultTitle?: string
  defaultSlug?: string
}

export default function SlugInput({
  defaultTitle = "",
  defaultSlug = "",
}: Props) {

  const [title, setTitle] = useState(defaultTitle)

  const [slug, setSlug] = useState(
    defaultSlug || slugify(defaultTitle)
  )

  function handleTitle(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const value = e.target.value

    setTitle(value)

    setSlug(slugify(value))
  }

  return (
    <div className="space-y-4">

      {/* TÍTULO */}

      <div>

        <label className="text-sm font-medium">
          Título
        </label>

        <input
          name="title"
          value={title}
          onChange={handleTitle}
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>


      {/* SLUG */}

      <div>

        <label className="text-sm font-medium">
          Slug
        </label>

        <input
          name="slug"
          value={slug}
          readOnly
          className="
            w-full
            border border-gray-200
            rounded-xl
            px-4 py-3
            bg-gray-100
            text-gray-600
            cursor-not-allowed
          "
        />

        <p className="text-xs text-gray-500 mt-1">
          El slug se genera automáticamente a partir del título.
        </p>

      </div>

    </div>
  )
}