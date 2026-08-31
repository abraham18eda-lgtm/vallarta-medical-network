// "use client"

// import { useEffect, useState } from "react"

// interface EditPlaceModalProps {
//   id: string
//   onClose: () => void
//   onSaved: () => void
// }

// interface TranslationForm {
//   locale: string
//   name: string
//   slug: string
//   description: string
//   city: string
//   state: string
//   address: string
// }

// const emptyTranslation = (locale: string): TranslationForm => ({
//   locale,
//   name: "",
//   slug: "",
//   description: "",
//   city: "",
//   state: "",
//   address: "",
// })

// export default function EditPlaceModal({
//   id,
//   onClose,
//   onSaved,
// }: EditPlaceModalProps) {

//   // ============================================================
//   // PLACE
//   // ============================================================

//   const [form, setForm] = useState({
//     type: "CLINIC",

//     email: "",
//     phone: "",
//     mobile: "",
//     phone2: "",
//     postalCode: "",
//     image: "",

//     facebook: "",
//     instagram: "",
//     twitter: "",
//     youtube: "",
//     website: "",

//     locale: "es",
//     isActive: true,
//     showInNavbar: false,
//     navbarOrder: 0,

//     categoryIds: [] as string[],
//     doctorIds: [] as string[],
//   })

//   // ============================================================
//   // TRADUCCIONES
//   // ============================================================

//   const [translations, setTranslations] = useState<
//     Record<string, TranslationForm>
//   >({
//     es: emptyTranslation("es"),
//     en: emptyTranslation("en"),
//   })

//   const [currentLocale, setCurrentLocale] = useState("es")

//   // ============================================================
//   // ESTADOS
//   // ============================================================

//   const [loading, setLoading] = useState(false)
//   const [fetching, setFetching] = useState(true)
//   const [uploading, setUploading] = useState(false)

//   const [preview, setPreview] = useState<string | null>(null)

//   const [doctors, setDoctors] = useState<any[]>([])
//   const [categories, setCategories] = useState<any[]>([])

//   // ============================================================
//   // TRADUCCIÓN ACTUAL
//   // ============================================================

//   const currentTranslation =
//     translations[currentLocale] ||
//     emptyTranslation(currentLocale)

//   // ============================================================
//   // CARGAR PLACE
//   // ============================================================

//   useEffect(() => {

//     if (!id) return

//     const load = async () => {

//       setFetching(true)

//       try {

//         // --------------------------------------------------------
//         // PLACE
//         // --------------------------------------------------------

//         const res = await fetch(
//           `/api/admin/places/${id}`
//         )

//         if (!res.ok) {
//           throw new Error("Error cargando lugar")
//         }

//         const data = await res.json()

//         // --------------------------------------------------------
//         // DATOS GENERALES
//         // --------------------------------------------------------

//         setForm({
//           type: data.type || "CLINIC",

//           email: data.email || "",
//           phone: data.phone || "",
//           mobile: data.mobile || "",
//           phone2: data.phone2 || "",
//           postalCode: data.postalCode || "",
//           image: data.image || "",

//           facebook: data.facebook || "",
//           instagram: data.instagram || "",
//           twitter: data.twitter || "",
//           youtube: data.youtube || "",
//           website: data.website || "",

//           locale: data.locale || "es",

//           isActive:
//             data.isActive ?? true,

//           showInNavbar:
//             data.showInNavbar ?? false,

//           navbarOrder:
//             data.navbarOrder ?? 0,

//           doctorIds:
//             data.doctors?.map(
//               (d: any) => d.doctor.id
//             ) || [],

//           categoryIds:
//             data.categories?.map(
//               (c: any) => c.category.id
//             ) || [],
//         })

//         // --------------------------------------------------------
//         // TRADUCCIONES
//         // --------------------------------------------------------

//         const translationMap: Record<
//           string,
//           TranslationForm
//         > = {}

//         if (Array.isArray(data.translations)) {

//           data.translations.forEach(
//             (translation: any) => {

//               translationMap[
//                 translation.locale
//               ] = {

//                 locale:
//                   translation.locale,

//                 name:
//                   translation.name || "",

//                 slug:
//                   translation.slug || "",

//                 description:
//                   translation.description || "",

//                 city:
//                   translation.city || "",

//                 state:
//                   translation.state || "",

//                 address:
//                   translation.address || "",
//               }
//             }
//           )
//         }

//         setTranslations({

//           es:
//             translationMap.es ||
//             emptyTranslation("es"),

//           en:
//             translationMap.en ||
//             emptyTranslation("en"),

//         })

//         // --------------------------------------------------------
//         // IMAGEN
//         // --------------------------------------------------------

//         setPreview(
//           data.image || null
//         )

//         // --------------------------------------------------------
//         // DOCTORES
//         // --------------------------------------------------------

//         const docs =
//           await fetch(
//             "/api/admin/doctors"
//           )

//         if (docs.ok) {

//           const docsData =
//             await docs.json()

//           setDoctors(
//             Array.isArray(docsData)
//               ? docsData
//               : []
//           )
//         }

//         // --------------------------------------------------------
//         // CATEGORÍAS
//         // --------------------------------------------------------

//         const cats =
//           await fetch(
//             "/api/admin/categories?type=PLACE"
//           )

//         if (cats.ok) {

//           const catsData =
//             await cats.json()

//           setCategories(
//             Array.isArray(catsData)
//               ? catsData
//               : []
//           )
//         }

//       } catch (error) {

//         console.error(error)

//         alert(
//           "Error cargando información del lugar"
//         )

//       } finally {

//         setFetching(false)

//       }

//     }

//     load()

//   }, [id])

//   // ============================================================
//   // CAMBIAR IDIOMA
//   // ============================================================

//   const changeLocale = (
//     locale: string
//   ) => {

//     setCurrentLocale(locale)

//   }

//   // ============================================================
//   // ACTUALIZAR TRADUCCIÓN
//   // ============================================================

//   const updateTranslation = (
//     field: keyof TranslationForm,
//     value: string
//   ) => {

//     setTranslations(prev => ({

//       ...prev,

//       [currentLocale]: {

//         ...(prev[currentLocale] ||
//           emptyTranslation(currentLocale)),

//         locale:
//           currentLocale,

//         [field]:
//           value,

//       },

//     }))
//   }

//   // ============================================================
//   // SUBIR IMAGEN
//   // ============================================================

//   const handleImageUpload = async (
//     file: File
//   ) => {

//     try {

//       setUploading(true)

//       setPreview(
//         URL.createObjectURL(file)
//       )

//       const formData =
//         new FormData()

//       formData.append(
//         "file",
//         file
//       )

//       const res =
//         await fetch(
//           "/api/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         )

//       if (!res.ok) {

//         throw new Error(
//           "Error subiendo imagen"
//         )

//       }

//       const data =
//         await res.json()

//       setForm(prev => ({
//         ...prev,
//         image:
//           data.url,
//       }))

//       setPreview(
//         data.url
//       )

//     } catch (error) {

//       console.error(error)

//       alert(
//         "Error subiendo imagen"
//       )

//     } finally {

//       setUploading(false)

//     }
//   }

//   // ============================================================
//   // GUARDAR
//   // ============================================================

//   const save = async () => {

//     try {

//       setLoading(true)

//       // --------------------------------------------------------
//       // VALIDAR ESPAÑOL
//       // --------------------------------------------------------

//       const spanish =
//         translations.es

//       if (!spanish?.name.trim()) {

//         setCurrentLocale("es")

//         alert(
//           "El nombre en español es obligatorio"
//         )

//         setLoading(false)

//         return
//       }

//       // --------------------------------------------------------
//       // VALIDAR INGLÉS
//       // --------------------------------------------------------

//       const english =
//         translations.en

//       if (!english?.name.trim()) {

//         setCurrentLocale("en")

//         alert(
//           "El nombre en inglés es obligatorio"
//         )

//         setLoading(false)

//         return
//       }

//       // --------------------------------------------------------
//       // VALIDAR CATEGORÍAS
//       // --------------------------------------------------------

//       if (
//         !form.categoryIds.length
//       ) {

//         alert(
//           "Selecciona al menos una especialidad"
//         )

//         setLoading(false)

//         return
//       }

//       // --------------------------------------------------------
//       // PAYLOAD
//       // --------------------------------------------------------

//       const payload = {

//         ...form,

//         translations: [

//           {
//             locale: "es",

//             name:
//               translations.es.name,

//             slug:
//               translations.es.slug,

//             description:
//               translations.es.description,

//             city:
//               translations.es.city,

//             state:
//               translations.es.state,

//             address:
//               translations.es.address,
//           },

//           {
//             locale: "en",

//             name:
//               translations.en.name,

//             slug:
//               translations.en.slug,

//             description:
//               translations.en.description,

//             city:
//               translations.en.city,

//             state:
//               translations.en.state,

//             address:
//               translations.en.address,
//           },

//         ],

//         // También enviamos la traducción actual
//         // para compatibilidad con el route actual.

//         translation:
//           currentTranslation,

//         doctorIds:
//           form.doctorIds,

//         categoryIds:
//           form.categoryIds,

//       }

//       // --------------------------------------------------------
//       // REQUEST
//       // --------------------------------------------------------

//       const res =
//         await fetch(
//           `/api/admin/places/${id}`,
//           {
//             method: "PUT",

//             headers: {
//               "Content-Type":
//                 "application/json",
//             },

//             body:
//               JSON.stringify(payload),
//           }
//         )

//       const data =
//         await res.json()

//       if (!res.ok) {

//         throw new Error(
//           data.error ||
//           "Error al guardar lugar"
//         )

//       }

//       // --------------------------------------------------------
//       // ÉXITO
//       // --------------------------------------------------------

//       onSaved()

//       onClose()

//     } catch (error) {

//       console.error(error)

//       alert(
//         error instanceof Error
//           ? error.message
//           : "Error al guardar lugar"
//       )

//     } finally {

//       setLoading(false)

//     }
//   }

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (fetching) {

//     return (

//       <div className="
//         fixed
//         inset-0
//         bg-black/50
//         z-50
//         flex
//         items-center
//         justify-center
//       ">

//         <div className="
//           bg-white
//           p-6
//           rounded-xl
//           shadow-xl
//         ">

//           Cargando información
//           del lugar...

//         </div>

//       </div>

//     )

//   }

//   // ============================================================
//   // MODAL
//   // ============================================================

//   return (

//     <div className="
//       fixed
//       inset-0
//       bg-black/50
//       z-50
//       overflow-y-auto
//     ">

//       <div className="
//         min-h-screen
//         flex
//         items-center
//         justify-center
//         p-4
//       ">

//         <div className="
//           bg-white
//           w-full
//           max-w-4xl
//           rounded-3xl
//           shadow-2xl
//           overflow-hidden
//         ">

//           {/* ================================================= */}
//           {/* HEADER */}
//           {/* ================================================= */}

//           <div className="
//             px-6
//             py-5
//             border-b
//             bg-gray-50
//             flex
//             items-center
//             justify-between
//           ">

//             <div>

//               <h2 className="
//                 font-heading
//                 text-sky-800
//                 text-3xl
//                 font-bold
//               ">

//                 Editar Lugar

//               </h2>

//               <p className="
//                 text-base
//                 text-slate-500
//               ">

//                 Actualiza la información
//                 del lugar

//               </p>

//             </div>

//             <button
//               onClick={onClose}
//               disabled={loading}
//               className="
//                 w-10
//                 h-10
//                 rounded-full
//                 hover:bg-gray-200
//                 transition
//               "
//             >

//               ✕

//             </button>

//           </div>

//           {/* ================================================= */}
//           {/* BODY */}
//           {/* ================================================= */}

//           <div className="
//             p-6
//             space-y-8
//           ">

//             {/* ================================================= */}
//             {/* IMAGEN */}
//             {/* ================================================= */}

//             <div>

//               <p className="
//                 font-semibold
//                 text-gray-700
//                 mb-3
//               ">

//                 Imagen del lugar

//               </p>

//               <div className="
//                 flex
//                 items-center
//                 gap-5
//               ">

//                 <div className="
//                   w-40
//                   h-40
//                   rounded-3xl
//                   overflow-hidden
//                   border-2
//                   border-gray-200
//                   bg-gray-100
//                   flex
//                   items-center
//                   justify-center
//                 ">

//                   {preview ||
//                   form.image ? (

//                     <img
//                       src={
//                         preview ||
//                         form.image
//                       }
//                       className="
//                         w-full
//                         h-full
//                         object-cover
//                       "
//                       alt="Imagen del lugar"
//                     />

//                   ) : (

//                     <span className="
//                       text-gray-400
//                       text-sm
//                     ">

//                       Sin imagen

//                     </span>

//                   )}

//                 </div>

//                 <div>

//                   <label className="
//                     cursor-pointer
//                     inline-flex
//                     items-center
//                     gap-2
//                     bg-blue-600
//                     hover:bg-blue-700
//                     text-white
//                     px-4
//                     py-2
//                     rounded-xl
//                     transition
//                   ">

//                     {form.image
//                       ? "Cambiar imagen"
//                       : "Subir imagen"}

//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={e => {

//                         const file =
//                           e.target.files?.[0]

//                         if (file) {

//                           handleImageUpload(
//                             file
//                           )

//                         }

//                       }}
//                     />

//                   </label>

//                   {uploading && (

//                     <p className="
//                       text-sm
//                       text-gray-500
//                       mt-1
//                     ">

//                       Subiendo imagen...

//                     </p>

//                   )}

//                 </div>

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* IDIOMA */}
//             {/* ================================================= */}

//             <div>

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//                 mb-3
//               ">

//                 Idioma

//               </h3>

//               <div className="
//                 flex
//                 gap-3
//               ">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     changeLocale("es")
//                   }
//                   className={`
//                     px-5
//                     py-2
//                     rounded-xl
//                     font-medium
//                     transition
//                     ${
//                       currentLocale === "es"
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }
//                   `}
//                 >

//                   🇪🇸 Español

//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     changeLocale("en")
//                   }
//                   className={`
//                     px-5
//                     py-2
//                     rounded-xl
//                     font-medium
//                     transition
//                     ${
//                       currentLocale === "en"
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }
//                   `}
//                 >

//                   🇺🇸 English

//                 </button>

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* INFORMACIÓN DE TRADUCCIÓN */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//               border
//               rounded-2xl
//               p-5
//               bg-slate-50
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Información en{" "}

//                 {currentLocale === "es"
//                   ? "Español"
//                   : "English"}

//               </h3>

//               {/* NOMBRE */}

//               <div>

//                 <label className="
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 ">

//                   {currentLocale === "es"
//                     ? "Nombre"
//                     : "Name"}

//                 </label>

//                 <input
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     mt-1
//                     bg-white
//                     focus:ring-2
//                     focus:ring-blue-500
//                     outline-none
//                   "
//                   value={
//                     currentTranslation.name
//                   }
//                   onChange={e =>
//                     updateTranslation(
//                       "name",
//                       e.target.value
//                     )
//                   }
//                 />

//               </div>

//               {/* SLUG */}

//               <div>

//                 <label className="
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 ">

//                   Slug

//                 </label>

//                 <input
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     mt-1
//                     bg-white
//                     focus:ring-2
//                     focus:ring-blue-500
//                     outline-none
//                   "
//                   value={
//                     currentTranslation.slug
//                   }
//                   onChange={e =>
//                     updateTranslation(
//                       "slug",
//                       e.target.value
//                     )
//                   }
//                 />

//               </div>

//               {/* CIUDAD / ESTADO */}

//               <div className="
//                 grid
//                 md:grid-cols-2
//                 gap-4
//               ">

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     {currentLocale === "es"
//                       ? "Ciudad"
//                       : "City"}

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       bg-white
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       currentTranslation.city
//                     }
//                     onChange={e =>
//                       updateTranslation(
//                         "city",
//                         e.target.value
//                       )
//                     }
//                   />

//                 </div>

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     {currentLocale === "es"
//                       ? "Estado"
//                       : "State"}

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       bg-white
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       currentTranslation.state
//                     }
//                     onChange={e =>
//                       updateTranslation(
//                         "state",
//                         e.target.value
//                       )
//                     }
//                   />

//                 </div>

//               </div>

//               {/* DIRECCIÓN */}

//               <div>

//                 <label className="
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 ">

//                   {currentLocale === "es"
//                     ? "Dirección"
//                     : "Address"}

//                 </label>

//                 <input
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     mt-1
//                     bg-white
//                     focus:ring-2
//                     focus:ring-blue-500
//                     outline-none
//                   "
//                   value={
//                     currentTranslation.address
//                   }
//                   onChange={e =>
//                     updateTranslation(
//                       "address",
//                       e.target.value
//                     )
//                   }
//                 />

//               </div>

//               {/* DESCRIPCIÓN */}

//               <div>

//                 <label className="
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 ">

//                   {currentLocale === "es"
//                     ? "Descripción"
//                     : "Description"}

//                 </label>

//                 <textarea
//                   rows={4}
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     mt-1
//                     bg-white
//                     focus:ring-2
//                     focus:ring-blue-500
//                     outline-none
//                   "
//                   value={
//                     currentTranslation.description
//                   }
//                   onChange={e =>
//                     updateTranslation(
//                       "description",
//                       e.target.value
//                     )
//                   }
//                 />

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* INFORMACIÓN GENERAL */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Información General

//               </h3>

//               <div className="
//                 grid
//                 md:grid-cols-2
//                 gap-4
//               ">

//                 {/* TIPO */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Tipo

//                   </label>

//                   <select
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                     "
//                     value={form.type}
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         type:
//                           e.target.value,
//                       }))
//                     }
//                   >

//                     <option value="HOSPITAL">
//                       Hospital
//                     </option>

//                     <option value="CLINIC">
//                       Clínica
//                     </option>

//                     <option value="LAB">
//                       Laboratorio
//                     </option>

//                     <option value="DENTAL">
//                       Dental
//                     </option>

//                   </select>

//                 </div>

//                 {/* EMAIL */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Email

//                   </label>

//                   <input
//                     type="email"
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.email
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         email:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* CONTACTO */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Contacto

//               </h3>

//               <div className="
//                 grid
//                 md:grid-cols-3
//                 gap-4
//               ">

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Teléfono Fijo 1

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.phone
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         phone:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Teléfono Fijo 2

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.mobile
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         mobile:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Celular

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.phone2
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         phone2:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//               </div>

//               {/* CÓDIGO POSTAL */}

//               <div>

//                 <label className="
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 ">

//                   Código Postal

//                 </label>

//                 <input
//                   className="
//                     w-full
//                     md:w-1/3
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4
//                     py-3
//                     mt-1
//                     focus:ring-2
//                     focus:ring-blue-500
//                     outline-none
//                   "
//                   value={
//                     form.postalCode
//                   }
//                   onChange={e =>
//                     setForm(prev => ({
//                       ...prev,
//                       postalCode:
//                         e.target.value,
//                     }))
//                   }
//                 />

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* REDES SOCIALES */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Redes Sociales

//               </h3>

//               <div className="
//                 grid
//                 md:grid-cols-2
//                 gap-4
//               ">

//                 {/* FACEBOOK */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Facebook

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.facebook
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         facebook:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 {/* INSTAGRAM */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Instagram

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-pink-500
//                       outline-none
//                     "
//                     value={
//                       form.instagram
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         instagram:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 {/* TWITTER */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Twitter

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-400
//                       outline-none
//                     "
//                     value={
//                       form.twitter
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         twitter:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 {/* YOUTUBE */}

//                 <div>

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     YouTube

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-red-500
//                       outline-none
//                     "
//                     value={
//                       form.youtube
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         youtube:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//                 {/* WEBSITE */}

//                 <div className="
//                   md:col-span-2
//                 ">

//                   <label className="
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   ">

//                     Website

//                   </label>

//                   <input
//                     className="
//                       w-full
//                       border
//                       border-gray-200
//                       rounded-xl
//                       px-4
//                       py-3
//                       mt-1
//                       focus:ring-2
//                       focus:ring-blue-500
//                       outline-none
//                     "
//                     value={
//                       form.website
//                     }
//                     onChange={e =>
//                       setForm(prev => ({
//                         ...prev,
//                         website:
//                           e.target.value,
//                       }))
//                     }
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* CATEGORÍAS */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Especialidades

//               </h3>

//               <div className="
//                 grid
//                 md:grid-cols-3
//                 gap-3
//               ">

//                 {categories.map(
//                   (cat: any) => (

//                     <label
//                       key={cat.id}
//                       className={`
//                         border
//                         rounded-xl
//                         p-3
//                         cursor-pointer
//                         transition
//                         ${
//                           form.categoryIds.includes(
//                             cat.id
//                           )
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200"
//                         }
//                       `}
//                     >

//                       <input
//                         type="checkbox"
//                         checked={
//                           form.categoryIds.includes(
//                             cat.id
//                           )
//                         }
//                         onChange={e => {

//                           if (
//                             e.target.checked
//                           ) {

//                             setForm(prev => ({
//                               ...prev,

//                               categoryIds:
//                                 prev.categoryIds.includes(
//                                   cat.id
//                                 )
//                                   ? prev.categoryIds
//                                   : [
//                                       ...prev.categoryIds,
//                                       cat.id,
//                                     ],
//                             }))

//                           } else {

//                             setForm(prev => ({
//                               ...prev,

//                               categoryIds:
//                                 prev.categoryIds.filter(
//                                   categoryId =>
//                                     categoryId !==
//                                     cat.id
//                                 ),
//                             }))

//                           }

//                         }}
//                       />

//                       <span className="
//                         ml-2
//                       ">

//                         {cat.name}

//                       </span>

//                     </label>

//                   )
//                 )}

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* DOCTORES */}
//             {/* ================================================= */}

//             <div className="
//               space-y-4
//             ">

//               <h3 className="
//                 font-semibold
//                 text-gray-800
//               ">

//                 Doctores

//               </h3>

//               <div className="
//                 grid
//                 md:grid-cols-3
//                 gap-3
//                 max-h-80
//                 overflow-y-auto
//               ">

//                 {doctors.map(
//                   (doc: any) => (

//                     <label
//                       key={doc.id}
//                       className={`
//                         border
//                         rounded-xl
//                         p-3
//                         cursor-pointer
//                         transition
//                         ${
//                           form.doctorIds.includes(
//                             doc.id
//                           )
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200"
//                         }
//                       `}
//                     >

//                       <input
//                         type="checkbox"
//                         checked={
//                           form.doctorIds.includes(
//                             doc.id
//                           )
//                         }
//                         onChange={e => {

//                           if (
//                             e.target.checked
//                           ) {

//                             setForm(prev => ({
//                               ...prev,

//                               doctorIds:
//                                 prev.doctorIds.includes(
//                                   doc.id
//                                 )
//                                   ? prev.doctorIds
//                                   : [
//                                       ...prev.doctorIds,
//                                       doc.id,
//                                     ],
//                             }))

//                           } else {

//                             setForm(prev => ({
//                               ...prev,

//                               doctorIds:
//                                 prev.doctorIds.filter(
//                                   doctorId =>
//                                     doctorId !==
//                                     doc.id
//                                 ),
//                             }))

//                           }

//                         }}
//                       />

//                       <span className="
//                         ml-2
//                       ">

//                         {doc.name}

//                       </span>

//                     </label>

//                   )
//                 )}

//               </div>

//             </div>

//           </div>

//           {/* ================================================= */}
//           {/* FOOTER */}
//           {/* ================================================= */}

//           <div className="
//             px-6
//             py-5
//             bg-gray-50
//             flex
//             justify-end
//             gap-3
//             border-t
//           ">

//             <button
//               onClick={onClose}
//               disabled={loading}
//               className="
//                 px-6
//                 py-2
//                 rounded-xl
//                 bg-gray-200
//                 text-gray-700
//                 hover:bg-gray-300
//                 transition
//               "
//             >

//               Cancelar

//             </button>

//             <button
//               onClick={save}
//               disabled={
//                 loading ||
//                 uploading
//               }
//               className={`
//                 px-6
//                 py-2
//                 rounded-xl
//                 bg-blue-600
//                 text-white
//                 hover:bg-blue-700
//                 transition
//                 ${
//                   loading ||
//                   uploading
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }
//               `}
//             >

//               {loading
//                 ? "Guardando..."
//                 : "Guardar"}

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>

//   )
// }
"use client"

import { useEffect, useState } from "react"

interface EditPlaceModalProps {
  id: string
  onClose: () => void
  onSaved: () => void
}

interface TranslationForm {
  locale: string
  name: string
  slug: string
  description: string
  city: string
  state: string
  address: string
}

const emptyTranslation = (locale: string): TranslationForm => ({
  locale,
  name: "",
  slug: "",
  description: "",
  city: "",
  state: "",
  address: "",
})

export default function EditPlaceModal({
  id,
  onClose,
  onSaved,
}: EditPlaceModalProps) {

  const [form, setForm] = useState({
    type: "CLINIC",
    email: "",
    phone: "",
    mobile: "",
    phone2: "",
    postalCode: "",
    image: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    website: "",
    locale: "es",
    isActive: true,
    showInNavbar: false,
    navbarOrder: 0,
    categoryIds: [] as string[],
    doctorIds: [] as string[],
  })

  const [translations, setTranslations] = useState<
    Record<string, TranslationForm>
  >({
    es: emptyTranslation("es"),
    en: emptyTranslation("en"),
  })

  const [currentLocale, setCurrentLocale] = useState("es")

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const [doctors, setDoctors] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const currentTranslation =
    translations[currentLocale] ||
    emptyTranslation(currentLocale)

  useEffect(() => {

    if (!id) return

    const load = async () => {

      setFetching(true)

      try {

        const res = await fetch(
          `/api/admin/places/${id}`
        )

        if (!res.ok) {
          throw new Error("Error cargando lugar")
        }

        const data = await res.json()

        setForm({
          type: data.type || "CLINIC",

          email: data.email || "",
          phone: data.phone || "",
          mobile: data.mobile || "",
          phone2: data.phone2 || "",
          postalCode: data.postalCode || "",
          image: data.image || "",

          facebook: data.facebook || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
          youtube: data.youtube || "",
          website: data.website || "",

          locale: data.locale || "es",

          isActive:
            data.isActive ?? true,

          showInNavbar:
            data.showInNavbar ?? false,

          navbarOrder:
            data.navbarOrder ?? 0,

          doctorIds:
            data.doctors?.map(
              (d: any) => d.doctor.id
            ) || [],

          categoryIds:
            data.categories?.map(
              (c: any) => c.category.id
            ) || [],
        })

        const translationMap: Record<
          string,
          TranslationForm
        > = {}

        if (Array.isArray(data.translations)) {

          data.translations.forEach(
            (translation: any) => {

              translationMap[
                translation.locale
              ] = {
                locale:
                  translation.locale,

                name:
                  translation.name || "",

                slug:
                  translation.slug || "",

                description:
                  translation.description || "",

                city:
                  translation.city || "",

                state:
                  translation.state || "",

                address:
                  translation.address || "",
              }
            }
          )
        }

        setTranslations({
          es:
            translationMap.es ||
            emptyTranslation("es"),

          en:
            translationMap.en ||
            emptyTranslation("en"),
        })

        setPreview(
          data.image || null
        )

        const docs =
          await fetch(
            "/api/admin/doctors"
          )

        if (docs.ok) {

          const docsData =
            await docs.json()

          setDoctors(
            Array.isArray(docsData)
              ? docsData
              : []
          )
        }

        const cats =
          await fetch(
            "/api/admin/categories?type=PLACE"
          )

        if (cats.ok) {

          const catsData =
            await cats.json()

          setCategories(
            Array.isArray(catsData)
              ? catsData
              : []
          )
        }

      } catch (error) {

        console.error(error)

        alert(
          "Error cargando información del lugar"
        )

      } finally {

        setFetching(false)

      }

    }

    load()

  }, [id])

  const changeLocale = (
    locale: string
  ) => {

    setCurrentLocale(locale)

  }

  const updateTranslation = (
    field: keyof TranslationForm,
    value: string
  ) => {

    setTranslations(prev => ({

      ...prev,

      [currentLocale]: {

        ...(prev[currentLocale] ||
          emptyTranslation(currentLocale)),

        locale:
          currentLocale,

        [field]:
          value,

      },

    }))
  }

  const handleImageUpload = async (
    file: File
  ) => {

    try {

      setUploading(true)

      setPreview(
        URL.createObjectURL(file)
      )

      const formData =
        new FormData()

      formData.append(
        "file",
        file
      )

      const res =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        )

      if (!res.ok) {

        throw new Error(
          "Error subiendo imagen"
        )

      }

      const data =
        await res.json()

      setForm(prev => ({
        ...prev,
        image:
          data.url,
      }))

      setPreview(
        data.url
      )

    } catch (error) {

      console.error(error)

      alert(
        "Error subiendo imagen"
      )

    } finally {

      setUploading(false)

    }
  }

  const save = async () => {

    try {

      setLoading(true)

      const spanish =
        translations.es

      if (!spanish?.name.trim()) {

        setCurrentLocale("es")

        alert(
          "El nombre en español es obligatorio"
        )

        setLoading(false)

        return
      }

      const english =
        translations.en

      if (!english?.name.trim()) {

        setCurrentLocale("en")

        alert(
          "El nombre en inglés es obligatorio"
        )

        setLoading(false)

        return
      }

      if (
        !form.categoryIds.length
      ) {

        alert(
          "Selecciona al menos una especialidad"
        )

        setLoading(false)

        return
      }

      const payload = {

        ...form,

        translations: [

          {
            locale: "es",
            name:
              translations.es.name,
            slug:
              translations.es.slug,
            description:
              translations.es.description,
            city:
              translations.es.city,
            state:
              translations.es.state,
            address:
              translations.es.address,
          },

          {
            locale: "en",
            name:
              translations.en.name,
            slug:
              translations.en.slug,
            description:
              translations.en.description,
            city:
              translations.en.city,
            state:
              translations.en.state,
            address:
              translations.en.address,
          },

        ],

        translation:
          currentTranslation,

        doctorIds:
          form.doctorIds,

        categoryIds:
          form.categoryIds,

      }

      const res =
        await fetch(
          `/api/admin/places/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(payload),
          }
        )

      const data =
        await res.json()

      if (!res.ok) {

        throw new Error(
          data.error ||
          "Error al guardar lugar"
        )

      }

      onSaved()

      onClose()

    } catch (error) {

      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : "Error al guardar lugar"
      )

    } finally {

      setLoading(false)

    }
  }

  if (fetching) {

    return (

      <div className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-4
      ">

        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-2xl
          text-center
        ">

          <div className="
            w-10
            h-10
            border-4
            border-blue-100
            border-t-blue-600
            rounded-full
            animate-spin
            mx-auto
            mb-4
          " />

          <p className="
            text-gray-700
            font-medium
          ">

            Cargando información del lugar...

          </p>

        </div>

      </div>

    )

  }

  return (

    <div className="
      fixed
      inset-0
      bg-black/50
      z-50
      overflow-y-auto
    ">

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        p-4
      ">

        <div className="
          bg-white
          w-full
          max-w-4xl
          rounded-3xl
          shadow-2xl
          overflow-hidden
        ">

          {/* HEADER */}

          <div className="
            px-6
            py-5
            border-b
            bg-gray-50
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-sky-800
                ">

                  Editar Lugar

                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Actualiza la información
                  del lugar

                </p>

              </div>

              <button
                onClick={onClose}
                disabled={loading}
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:bg-gray-200
                  hover:text-gray-700
                  transition
                "
              >

                ✕

              </button>

            </div>

          </div>

          {/* BODY */}

          <div className="
            p-6
            space-y-7
          ">

            {/* FOTO */}

            <div>

              <p className="
                font-semibold
                text-gray-700
                mb-3
              ">

                Imagen del lugar

              </p>

              <div className="
                flex
                flex-col
                sm:flex-row
                items-start
                sm:items-center
                gap-5
              ">

                <div className="
                  w-80
                  h-48
                  shrink-0
                  rounded-3xl
                  overflow-hidden
                  border-2
                  border-gray-200
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                ">

                  {preview ||
                  form.image ? (

                    <img
                      src={
                        preview ||
                        form.image
                      }
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                      alt="Imagen del lugar"
                    />

                  ) : (

                    <div className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-gray-400
                      text-sm
                    ">

                      <span className="text-3xl mb-1">
                        🏥
                      </span>

                      Sin imagen

                    </div>

                  )}

                </div>

                <div className="
                  space-y-2
                ">

                  <label className="
                    cursor-pointer
                    inline-flex
                    items-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2.5
                    rounded-xl
                    font-medium
                    transition
                  ">

                    {form.image
                      ? "Cambiar imagen"
                      : "Subir imagen"}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {

                        const file =
                          e.target.files?.[0]

                        if (file) {

                          handleImageUpload(
                            file
                          )

                        }

                      }}
                    />

                  </label>

                  {uploading && (

                    <p className="
                      text-sm
                      text-gray-500
                    ">

                      Subiendo imagen...

                    </p>

                  )}

                </div>

              </div>

            </div>

            {/* IDIOMAS */}

            <div className="
              border
              border-gray-200
              rounded-2xl
              p-4
              bg-gray-50
            ">

              <div className="
                mb-3
              ">

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Idioma

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                ">

                  Administra la información
                  del lugar por idioma

                </p>

              </div>

              <div className="
                flex
                flex-wrap
                gap-2
              ">

                <button
                  type="button"
                  onClick={() =>
                    changeLocale("es")
                  }
                  className={`
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                    transition
                    ${
                      currentLocale === "es"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >

                  🇪🇸 Español

                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeLocale("en")
                  }
                  className={`
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                    transition
                    ${
                      currentLocale === "en"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >

                  🇺🇸 English

                </button>

              </div>

            </div>

            {/* INFORMACIÓN TRADUCCIÓN */}

            <div className="
              border
              border-gray-200
              rounded-2xl
              p-5
              bg-gray-50
              space-y-5
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Información en{" "}

                  {currentLocale === "es"
                    ? "Español"
                    : "English"}

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Datos específicos para
                  este idioma.

                </p>

              </div>

              {/* NOMBRE / SLUG */}

              <div className="
                grid
                md:grid-cols-2
                gap-4
              ">

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    {currentLocale === "es"
                      ? "Nombre"
                      : "Name"}

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                      outline-none
                      transition
                    "
                    value={
                      currentTranslation.name
                    }
                    onChange={e =>
                      updateTranslation(
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Slug

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                      outline-none
                      transition
                    "
                    value={
                      currentTranslation.slug
                    }
                    onChange={e =>
                      updateTranslation(
                        "slug",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* CIUDAD / ESTADO */}

              <div className="
                grid
                md:grid-cols-2
                gap-4
              ">

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    {currentLocale === "es"
                      ? "Ciudad"
                      : "City"}

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      currentTranslation.city
                    }
                    onChange={e =>
                      updateTranslation(
                        "city",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    {currentLocale === "es"
                      ? "Estado"
                      : "State"}

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      currentTranslation.state
                    }
                    onChange={e =>
                      updateTranslation(
                        "state",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* DIRECCIÓN */}

              <div>

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                ">

                  {currentLocale === "es"
                    ? "Dirección"
                    : "Address"}

                </label>

                <input
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3
                    mt-1
                    bg-white
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                  "
                  value={
                    currentTranslation.address
                  }
                  onChange={e =>
                    updateTranslation(
                      "address",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* DESCRIPCIÓN */}

              <div>

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                ">

                  {currentLocale === "es"
                    ? "Descripción"
                    : "Description"}

                </label>

                <textarea
                  rows={5}
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3
                    mt-1
                    bg-white
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                    resize-none
                  "
                  value={
                    currentTranslation.description
                  }
                  onChange={e =>
                    updateTranslation(
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* INFORMACIÓN GENERAL */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Información General

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Configuración básica
                  del lugar.

                </p>

              </div>

              <div className="
                grid
                md:grid-cols-2
                gap-4
              ">

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Tipo

                  </label>

                  <select
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={form.type}
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        type:
                          e.target.value,
                      }))
                    }
                  >

                    <option value="HOSPITAL">
                      Hospital
                    </option>

                    <option value="CLINIC">
                      Clínica
                    </option>

                    <option value="LAB">
                      Laboratorio
                    </option>

                    <option value="DENTAL">
                      Dental
                    </option>

                  </select>

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Email

                  </label>

                  <input
                    type="email"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      bg-white
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.email
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        email:
                          e.target.value,
                      }))
                    }
                  />

                </div>

              </div>

            </div>

            {/* CONTACTO */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Contacto

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Teléfonos y código postal.

                </p>

              </div>

              <div className="
                grid
                md:grid-cols-3
                gap-4
              ">

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Teléfono Fijo 1

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.phone
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        phone:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Teléfono Fijo 2

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.mobile
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        mobile:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Celular

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.phone2
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        phone2:
                          e.target.value,
                      }))
                    }
                  />

                </div>

              </div>

              <div>

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                ">

                  Código Postal

                </label>

                <input
                  className="
                    w-full
                    md:w-1/3
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3
                    mt-1
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                  "
                  value={
                    form.postalCode
                  }
                  onChange={e =>
                    setForm(prev => ({
                      ...prev,
                      postalCode:
                        e.target.value,
                    }))
                  }
                />

              </div>

            </div>

            {/* REDES */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Redes Sociales

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Enlaces públicos del lugar.

                </p>

              </div>

              <div className="
                grid
                md:grid-cols-2
                gap-4
              ">

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Facebook

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.facebook
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        facebook:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Instagram

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-pink-500
                      outline-none
                    "
                    value={
                      form.instagram
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        instagram:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Twitter

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-400
                      outline-none
                    "
                    value={
                      form.twitter
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        twitter:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div>

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    YouTube

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-red-500
                      outline-none
                    "
                    value={
                      form.youtube
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        youtube:
                          e.target.value,
                      }))
                    }
                  />

                </div>

                <div className="
                  md:col-span-2
                ">

                  <label className="
                    text-sm
                    font-medium
                    text-gray-600
                  ">

                    Website

                  </label>

                  <input
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      mt-1
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                    value={
                      form.website
                    }
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        website:
                          e.target.value,
                      }))
                    }
                  />

                </div>

              </div>

            </div>

            {/* ESTADO */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <h3 className="
                font-semibold
                text-gray-800
              ">

                Configuración

              </h3>

              <label className="
                flex
                items-start
                gap-3
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  checked={
                    form.isActive
                  }
                  onChange={e =>
                    setForm(prev => ({
                      ...prev,
                      isActive:
                        e.target.checked,
                    }))
                  }
                  className="
                    mt-1
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-blue-600
                    focus:ring-blue-500
                  "
                />

                <div>

                  <p className="
                    text-sm
                    font-medium
                    text-gray-700
                  ">

                    Lugar activo

                  </p>

                  <p className="
                    text-xs
                    text-gray-500
                  ">

                    El lugar podrá mostrarse
                    públicamente.

                  </p>

                </div>

              </label>

              <label className="
                flex
                items-start
                gap-3
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  checked={
                    form.showInNavbar
                  }
                  onChange={e =>
                    setForm(prev => ({
                      ...prev,
                      showInNavbar:
                        e.target.checked,
                    }))
                  }
                  className="
                    mt-1
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-blue-600
                    focus:ring-blue-500
                  "
                />

                <div>

                  <p className="
                    text-sm
                    font-medium
                    text-gray-700
                  ">

                    Mostrar en navegación

                  </p>

                  <p className="
                    text-xs
                    text-gray-500
                  ">

                    Permite mostrar este lugar
                    directamente en el navbar.

                  </p>

                </div>

              </label>

            </div>

            {/* CATEGORÍAS */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Especialidades

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Selecciona una o varias.

                </p>

              </div>

              {form.categoryIds.length > 0 && (

                <div className="
                  flex
                  flex-wrap
                  gap-2
                ">

                  {categories
                    .filter((cat: any) =>
                      form.categoryIds.includes(
                        cat.id
                      )
                    )
                    .map((cat: any) => (

                      <span
                        key={cat.id}
                        className="
                          bg-blue-50
                          text-blue-700
                          px-3
                          py-1.5
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >

                        {cat.name}

                      </span>

                    ))}

                </div>

              )}

              <div className="
                grid
                md:grid-cols-3
                gap-3
              ">

                {categories.map(
                  (cat: any) => (

                    <label
                      key={cat.id}
                      className={`
                        border
                        rounded-2xl
                        p-3
                        cursor-pointer
                        transition
                        text-sm
                        ${
                          form.categoryIds.includes(
                            cat.id
                          )
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={
                          form.categoryIds.includes(
                            cat.id
                          )
                        }
                        onChange={e => {

                          if (
                            e.target.checked
                          ) {

                            setForm(prev => ({
                              ...prev,

                              categoryIds:
                                prev.categoryIds.includes(
                                  cat.id
                                )
                                  ? prev.categoryIds
                                  : [
                                      ...prev.categoryIds,
                                      cat.id,
                                    ],
                            }))

                          } else {

                            setForm(prev => ({
                              ...prev,

                              categoryIds:
                                prev.categoryIds.filter(
                                  categoryId =>
                                    categoryId !==
                                    cat.id
                                ),
                            }))

                          }

                        }}
                        className="
                          accent-blue-600
                        "
                      />

                      <span className="
                        ml-2
                        font-medium
                        text-gray-700
                      ">

                        {cat.name}

                      </span>

                    </label>

                  )
                )}

              </div>

            </div>

            {/* DOCTORES */}

            <div className="
              border-t
              pt-6
              space-y-4
            ">

              <div>

                <h3 className="
                  font-semibold
                  text-gray-800
                ">

                  Doctores

                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Selecciona los doctores
                  asociados a este lugar.

                </p>

              </div>

              {form.doctorIds.length > 0 && (

                <div className="
                  flex
                  flex-wrap
                  gap-2
                ">

                  {doctors
                    .filter((doc: any) =>
                      form.doctorIds.includes(
                        doc.id
                      )
                    )
                    .map((doc: any) => (

                      <span
                        key={doc.id}
                        className="
                          bg-blue-50
                          text-blue-700
                          px-3
                          py-1.5
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >

                        {doc.name}

                      </span>

                    ))}

                </div>

              )}

              <div className="
                grid
                md:grid-cols-3
                gap-3
                max-h-80
                overflow-y-auto
                pr-1
              ">

                {doctors.map(
                  (doc: any) => (

                    <label
                      key={doc.id}
                      className={`
                        border
                        rounded-2xl
                        p-3
                        cursor-pointer
                        transition
                        text-sm
                        ${
                          form.doctorIds.includes(
                            doc.id
                          )
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={
                          form.doctorIds.includes(
                            doc.id
                          )
                        }
                        onChange={e => {

                          if (
                            e.target.checked
                          ) {

                            setForm(prev => ({
                              ...prev,

                              doctorIds:
                                prev.doctorIds.includes(
                                  doc.id
                                )
                                  ? prev.doctorIds
                                  : [
                                      ...prev.doctorIds,
                                      doc.id,
                                    ],
                            }))

                          } else {

                            setForm(prev => ({
                              ...prev,

                              doctorIds:
                                prev.doctorIds.filter(
                                  doctorId =>
                                    doctorId !==
                                    doc.id
                                ),
                            }))

                          }

                        }}
                        className="
                          accent-blue-600
                        "
                      />

                      <span className="
                        ml-2
                        font-medium
                        text-gray-700
                      ">

                        {doc.name}

                      </span>

                    </label>

                  )
                )}

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="
            border-t
            bg-gray-50
            px-6
            py-4
            flex
            justify-end
            gap-3
          ">

            <button
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-700
                hover:bg-gray-100
                transition
                disabled:opacity-50
              "
            >

              Cancelar

            </button>

            <button
              onClick={save}
              disabled={
                loading ||
                uploading
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-2.5
                rounded-xl
                font-medium
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {loading
                ? "Guardando..."
                : "Guardar cambios"}

            </button>

          </div>

        </div>

      </div>

    </div>

  )
}
