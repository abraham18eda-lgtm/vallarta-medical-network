// // import { prisma } from "@/lib/prisma"
// // import { writeFile } from "fs/promises"
// // import path from "path"
// // import { redirect } from "next/navigation"
// // import ImageUpload from "@/components/admin/ImageUploadPreview"

// // export default async function CreateHeroSlidePage() {

// //   async function createSlide(formData: FormData) {
// //     "use server"

// //     try {

// //       // ---------------------------
// //       // SUBIR IMAGEN
// //       // ---------------------------
// //       let imagePath = ""

// //       const file = formData.get("imageFile") as File

// //       if (file && file.size > 0) {
// //         const bytes = await file.arrayBuffer()
// //         const buffer = Buffer.from(bytes)

// //         const fileName = `${Date.now()}-${file.name}`

// //         const uploadPath = path.join(
// //           process.cwd(),
// //           "public/uploads",
// //           fileName
// //         )

// //         await writeFile(uploadPath, buffer)

// //         imagePath = `/uploads/${fileName}`
// //       }

// //       if (!imagePath) {
// //         throw new Error("Image is required")
// //       }

// //       // ---------------------------
// //       // FECHAS SEGURAS
// //       // ---------------------------

// //       const startAtValue = formData.get("startAt") as string
// //       const endAtValue = formData.get("endAt") as string

// //       const startAt = startAtValue ? new Date(startAtValue) : null
// //       const endAt = endAtValue ? new Date(endAtValue) : null

// //       // ---------------------------
// //       // CREAR SLIDE
// //       // ---------------------------

// //       await prisma.heroSlide.create({
// //         data: {
// //           image: imagePath,
// //           title: (formData.get("title") as string) || "",
// //           highlight: (formData.get("highlight") as string) || "",
// //           description: (formData.get("description") as string) || "",
// //           link: (formData.get("link") as string) || "",
// //           locale: (formData.get("locale") as string) || "es",

// //           order: parseInt(formData.get("order") as string) || 0,

// //           startAt: startAt,
// //           endAt: endAt,

// //           isActive: formData.get("isActive") === "on",
// //         },
// //       })

// //     } catch (error) {

// //       console.error("CREATE HERO SLIDE ERROR:", error)
// //       throw error

// //     }

// //     redirect("/admin/slides")
// //   }

// //   return (
// //     <form action={createSlide} className="space-y-6 max-w-3xl">

// //       <h1 className="text-2xl font-bold">
// //         Crear Nuevo Hero Slide
// //       </h1>

// //       <ImageUpload
// //         name="imageFile"
// //         defaultImage=""
// //       />

// //       <input
// //         name="title"
// //         placeholder="Título"
// //         className="w-full border p-3 rounded-lg"/>

// //       <input
// //         name="highlight"
// //         placeholder="Texto destacado"
// //         className="w-full border p-3 rounded-lg"
// //       />

// //       <textarea
// //         name="description"
// //         placeholder="Descripción"
// //         className="w-full border p-3 rounded-lg"
// //       />

// //       <input
// //         name="link"
// //         placeholder="URL del botón"
// //         className="w-full border p-3 rounded-lg"
// //       />

// //       <input
// //         name="locale"
// //         defaultValue="es"
// //         placeholder="Locale (es / en)"
// //         className="w-full border p-3 rounded-lg"/>

// //       <input
// //         type="number"
// //         name="order"
// //         defaultValue="0"
// //         placeholder="Orden"
// //         className="w-full border p-3 rounded-lg"
// //       />

// //       <div className="grid grid-cols-2 gap-4">

// //         <input
// //           type="datetime-local"
// //           name="startAt"
// //           className="border p-3 rounded-lg"
// //         />

// //         <input
// //           type="datetime-local"
// //           name="endAt"
// //           className="border p-3 rounded-lg"
// //         />

// //       </div>

// //       <label className="flex items-center gap-2">

// //         <input
// //           type="checkbox"
// //           name="isActive"
// //           defaultChecked
// //         />

// //         Activo

// //       </label>

// //       <button
// //         type="submit"
// //         className="bg-blue-600 text-white px-6 py-2 rounded-lg"
// //       >
// //         Crear Slide
// //       </button>

// //     </form>
// //   )
// // }

// import { prisma } from "@/lib/prisma"
// import { redirect } from "next/navigation"
// import ImageUpload from "@/components/admin/ImageUploadPreview"
// import { v2 as cloudinary } from "cloudinary"
// import Link from "next/link"

// // -----------------------------
// // CLOUDINARY
// // -----------------------------
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export default async function CreateHeroSlidePage() {

//   async function createSlide(formData: FormData) {
//     "use server"

//     try {

//       // -----------------------------
//       // SUBIR IMAGEN CLOUDINARY
//       // -----------------------------
//       let imagePath = ""

//       const file = formData.get("imageFile") as File

//       if (file && file.size > 0) {

//         const bytes = await file.arrayBuffer()
//         const buffer = Buffer.from(bytes)

//         const uploadResult = await new Promise<any>(
//           (resolve, reject) => {

//             cloudinary.uploader
//               .upload_stream(
//                 {
//                   folder: "hero-slides",
//                 },
//                 (error, result) => {

//                   if (error) {
//                     reject(error)
//                   } else {
//                     resolve(result)
//                   }
//                 }
//               )
//               .end(buffer)
//           }
//         )

//         imagePath = uploadResult.secure_url
//       }

//       if (!imagePath) {
//         throw new Error("La imagen es requerida")
//       }

//       // -----------------------------
//       // FECHAS
//       // -----------------------------
//       const startAtValue =
//         formData.get("startAt") as string

//       const endAtValue =
//         formData.get("endAt") as string

//       const startAt =
//         startAtValue
//           ? new Date(startAtValue)
//           : null

//       const endAt =
//         endAtValue
//           ? new Date(endAtValue)
//           : null

//       // -----------------------------
//       // CREAR SLIDE
//       // -----------------------------
//       await prisma.heroSlide.create({
//         data: {
//           image: imagePath,

//           title:
//             (formData.get("title") as string) || "",

//           highlight:
//             (formData.get("highlight") as string) || "",

//           description:
//             (formData.get("description") as string) || "",

//           link:
//             (formData.get("link") as string) || "",

//           locale:
//             (formData.get("locale") as string) || "es",

//           order:
//             parseInt(
//               formData.get("order") as string
//             ) || 0,

//           startAt,
//           endAt,

//           isActive:
//             formData.get("isActive") === "on",
//         },
//       })

//     } catch (error) {

//       console.error(
//         "CREATE HERO SLIDE ERROR:",
//         error
//       )

//       throw error
//     }

//     redirect("/admin/slides")
//   }

//   return (

//     <div className="min-h-screen bg-gray-50 p-6">

//       <div className="max-w-4xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-8">

//           <h1 className="text-3xl font-bold text-gray-800">
//             Crear Hero Slide
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Agrega banners elegantes para tu home
//           </p>

//         </div>

//         {/* CARD */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

//           <form
//             action={createSlide}
//             className="p-8 space-y-8"
//           >

//             {/* IMAGEN */}
//             <div>

//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Imagen principal
//               </h2>

//               <ImageUpload
//                 name="imageFile"
//                 defaultImage=""
//               />

//               <p className="text-sm text-gray-400 mt-2">
//                 La imagen se guardará en Cloudinary
//               </p>

//             </div>

//             {/* INFORMACIÓN */}
//             <div>

//               <h2 className="text-lg font-semibold text-gray-800 mb-5">
//                 Información del Slide
//               </h2>

//               <div className="grid md:grid-cols-2 gap-5">

//                 {/* TITULO */}
//                 <div className="md:col-span-2">

//                   <label className="text-sm font-medium text-gray-600">
//                     Título
//                   </label>

//                   <input
//                     name="title"
//                     placeholder="Ej. Encuentra a los mejores especialistas"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//                 {/* HIGHLIGHT */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     Texto destacado
//                   </label>

//                   <input
//                     name="highlight"
//                     placeholder="Ej. Expertos Certificados"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//                 {/* LINK */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     URL botón
//                   </label>

//                   <input
//                     name="link"
//                     placeholder="https://"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//                 {/* DESCRIPTION */}
//                 <div className="md:col-span-2">

//                   <label className="text-sm font-medium text-gray-600">
//                     Descripción
//                   </label>

//                   <textarea
//                     rows={4}
//                     name="description"
//                     placeholder="Descripción corta del slide..."
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                       resize-none
//                     "
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* CONFIG */}
//             <div>

//               <h2 className="text-lg font-semibold text-gray-800 mb-5">
//                 Configuración
//               </h2>

//               <div className="grid md:grid-cols-2 gap-5">

//                 {/* LOCALE */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     Idioma
//                   </label>

//                   <select
//                     name="locale"
//                     defaultValue="es"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   >
//                     <option value="es">
//                       Español
//                     </option>

//                     <option value="en">
//                       English
//                     </option>

//                   </select>

//                 </div>

//                 {/* ORDER */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     Orden
//                   </label>

//                   <input
//                     type="number"
//                     name="order"
//                     defaultValue="0"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//                 {/* START */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     Inicio
//                   </label>

//                   <input
//                     type="datetime-local"
//                     name="startAt"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//                 {/* END */}
//                 <div>

//                   <label className="text-sm font-medium text-gray-600">
//                     Fin
//                   </label>

//                   <input
//                     type="datetime-local"
//                     name="endAt"
//                     className="
//                       w-full mt-2
//                       border border-gray-200
//                       rounded-2xl
//                       px-4 py-3
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ACTIVE */}
//             <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">

//               <label className="flex items-center gap-3 cursor-pointer">

//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   defaultChecked
//                   className="w-5 h-5"
//                 />

//                 <div>
//                   <p className="font-medium text-gray-700">
//                     Slide Activo
//                   </p>

//                   <p className="text-sm text-gray-400">
//                     Mostrar este slide en el home
//                   </p>
//                 </div>

//               </label>

//             </div>

//             {/* BUTTONS */}
//             <div className="flex justify-end gap-4 pt-4 border-t">
//             <Link
//               href="/admin/slides"
//               className="
//                 px-6 py-3
//                 rounded-2xl
//                 border border-gray-300
//                 hover:bg-gray-100
//                 transition
//                 inline-flex
//                 items-center
//               "
//             >
//               Cancelar
//             </Link>
//             {/*           
//               <button
//                 type="button"
//                 onClick={() =>
//                   history.back()
//                 }
//                 className="
//                   px-6 py-3
//                   rounded-2xl
//                   border border-gray-300
//                   hover:bg-gray-100
//                   transition
//                 "
//               >
//                 Cancelar
//               </button> */}

//               <button
//                 type="submit"
//                 className="
//                   bg-blue-600
//                   hover:bg-blue-700
//                   text-white
//                   px-8 py-3
//                   rounded-2xl
//                   shadow-sm
//                   transition
//                 "
//               >
//                 Crear Slide
//               </button>

//             </div>

//           </form>

//         </div>

//       </div>

//     </div>
//   )
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import ImageUploadPreview from "@/components/admin/ImageUploadPreview";

// export default function CreateHeroSlidePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [imageDesktop, setImageDesktop] = useState("");
//   const [imageTablet, setImageTablet] = useState("");
//   const [imageMobile, setImageMobile] = useState("");

//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);

//     const payload = {
//       title: formData.get("title"),
//       highlight: formData.get("highlight"),
//       description: formData.get("description"),
//       link: formData.get("link"),
//       locale: formData.get("locale"),
//       order: Number(formData.get("order")),
//       isActive: formData.get("isActive") === "on",
//       startAt: formData.get("startAt"),
//       endAt: formData.get("endAt"),
//       imageDesktop,
//       imageTablet,
//       imageMobile,
//     };

//     await fetch("/api/admin/slides", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     router.push("/admin/slides");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Hero Slide</h1>
//         <p className="text-gray-500 mb-6">Agrega banners para la página principal</p>

//         <form onSubmit={onSubmit} className="bg-white p-8 rounded-3xl shadow-md space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <ImageUploadPreview name="imageDesktop" label="Desktop" setImage={setImageDesktop} />
//             <ImageUploadPreview name="imageTablet" label="Tablet" setImage={setImageTablet} />
//             <ImageUploadPreview name="imageMobile" label="Mobile" setImage={setImageMobile} />
//           </div>

//           <input name="title" placeholder="Título" className="border p-3 rounded-xl w-full" />
//           <input name="highlight" placeholder="Highlight" className="border p-3 rounded-xl w-full" />
//           <textarea name="description" placeholder="Descripción" className="border p-3 rounded-xl w-full h-28" />
//           <input name="link" placeholder="Link" className="border p-3 rounded-xl w-full" />
//           <input name="locale" placeholder="Locale" defaultValue="es" className="border p-3 rounded-xl w-full" />
//           <input type="number" name="order" placeholder="Orden" className="border p-3 rounded-xl w-full" />

//           <div className="grid grid-cols-2 gap-4">
//             <input type="datetime-local" name="startAt" className="border p-3 rounded-xl" />
//             <input type="datetime-local" name="endAt" className="border p-3 rounded-xl" />
//           </div>

//           <label className="flex items-center gap-2">
//             <input type="checkbox" name="isActive" defaultChecked /> Activo
//           </label>

//           <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl w-full">
//             {loading ? "Guardando..." : "Crear Slide"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploadPreview from "@/components/admin/ImageUploadPreview"
import SlideEditForm from "@/components/admin/SlideEditForm"

export default function NewSlidePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState("")
  const [imageTablet, setImageTablet] = useState("")
  const [imageMobile, setImageMobile] = useState("")

   const createSlide = async (data: any) => {
    setLoading(true)

    await fetch("/api/admin/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)
    router.push("/admin/slides")
  }
  // async function onSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   setLoading(true)

  //   const formData = new FormData(e.currentTarget as HTMLFormElement)

  //   const payload = {
  //     title: formData.get("title"),
  //     highlight: formData.get("highlight"),
  //     description: formData.get("description"),
  //     link: formData.get("link"),
  //     locale: formData.get("locale") || "es",
  //     order: Number(formData.get("order") || 0),
  //     isActive: formData.get("isActive") === "on",
  //     image,
  //     imageTablet,
  //     imageMobile,
  //   }

  //   await fetch("/api/admin/slides", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   })

  //   setLoading(false)
  //   router.push("/admin/slides")
  // }

  // return (
  //   <div className="p-8 bg-gray-50 min-h-screen">

  //     <div className="max-w-4xl mx-auto">

  //       <h1 className="text-3xl font-bold mb-6">Nuevo Slide</h1>

  //       <form
  //         onSubmit={onSubmit}
  //         className="bg-white p-8 rounded-2xl shadow space-y-6"
  //       >

  //         {/* IMAGES */}
  //         <div className="grid grid-cols-3 gap-4">
  //           <ImageUploadPreview name="desktop" label="Desktop" setImage={setImage} />
  //           <ImageUploadPreview name="tablet" label="Tablet" setImage={setImageTablet} />
  //           <ImageUploadPreview name="mobile" label="Mobile" setImage={setImageMobile} />
  //         </div>

  //         <input name="title" placeholder="Título" className="input" />
  //         <input name="highlight" placeholder="Highlight" className="input" />
  //         <textarea name="description" placeholder="Descripción" className="input" />
  //         <input name="link" placeholder="Link" className="input" />

  //         <div className="grid grid-cols-2 gap-4">
  //           <input name="locale" defaultValue="es" className="input" />
  //           <input type="number" name="order" defaultValue={0} className="input" />
  //         </div>

  //         <label className="flex gap-2 items-center">
  //           <input type="checkbox" name="isActive" defaultChecked />
  //           Activo
  //         </label>

  //         <button
  //           disabled={loading}
  //           className="bg-blue-600 text-white w-full py-3 rounded-xl"
  //         >
  //           {loading ? "Guardando..." : "Crear Slide"}
  //         </button>

  //       </form>
  //     </div>
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Crear Slide
        </h1>

        <SlideEditForm
          mode="create"
          onSubmit={createSlide}
          loading={loading}
        />

      </div>
    </div>
  )
}