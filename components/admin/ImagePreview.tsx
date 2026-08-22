// "use client"

// import { useState } from "react"

// interface Props {
//   currentImage?: string | null
// }

// export default function ImagePreview({
//   currentImage = null,
// }: Props) {

//   const [preview, setPreview] = useState(currentImage)

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {

//     const file = e.target.files?.[0]

//     if (!file) return

//     console.log("Nueva imagen:", file.name)

//     const url = URL.createObjectURL(file)

//     console.log("Preview:", url)

//     setPreview(url)
//   }

//   return (
//     <div className="space-y-4">

//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//           className="
//             w-full
//             h-64
//             object-cover
//             rounded-xl
//             border
//           // "
//         />
//       )}

//       <input
//         type="file"
//         name="imageFile"
//         accept="image/*"
//         onChange={handleChange}
//         className="
//           w-full
//           border
//           p-3
//           rounded-xl
//           bg-white
//         "
//       />

//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"

interface Props {
  currentImage?: string | null
  name?: string
}

export default function ImagePreview({
  currentImage = null,
  name = "imageFile",
}: Props) {

  const [preview, setPreview] =
    useState<string | null>(currentImage)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0]

    if (!file) return

    const url =
      URL.createObjectURL(file)

    setPreview(url)
  }

  useEffect(() => {

    return () => {

      if (
        preview &&
        preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(preview)
      }

    }

  }, [preview])

  return (

    <div className="space-y-4">

      {/* PREVIEW */}

      {preview ? (

        <div className="
          relative
          overflow-hidden
          rounded-2xl
          border
          bg-gray-100
        ">

          <img
            src={preview}
            alt="Preview"
            className="
              w-full
              h-72
              object-cover
            "
          />

        </div>

      ) : (

        <div className="
          w-full
          h-72
          rounded-2xl
          border-2
          border-dashed
          border-gray-200
          bg-gray-50
          flex
          items-center
          justify-center
          text-gray-400
          text-sm
        ">
          No hay imagen seleccionada
        </div>

      )}

      {/* FILE */}

      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="
          w-full
          border
          p-3
          rounded-xl
          bg-white
          text-sm
        "
      />

    </div>

  )
}
