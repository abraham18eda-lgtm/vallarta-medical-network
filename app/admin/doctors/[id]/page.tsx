// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"

// export default function EditDoctorPage() {
//   const params = useParams()

//   const id = Array.isArray(params.id)
//     ? params.id[0]
//     : params.id

//   const router = useRouter()

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     image: "",
//     description: "",
//     city: "",
//     state: ""
//   })

//   const [loading, setLoading] = useState(false)
//   const [fetching, setFetching] = useState(true)

//   // 🔹 cargar doctor
//   useEffect(() => {
//     const load = async () => {
//       try {

//         console.log("Doctor ID:", id)

//         const res = await fetch(`/api/admin/doctors/${id}`)

//         console.log("STATUS:", res.status)
//         console.log(
//           "CONTENT TYPE:",
//           res.headers.get("content-type")
//         )

//          // validar json
//         if (
//           !res.ok ||
//           !res.headers
//             .get("content-type")
//             ?.includes("application/json")
//         ) {

//         const data = await res.json()

//         console.error(
//             "Respuesta inesperada:",
//             data
//           )
//           throw new Error(
//             "La API no devolvió JSON"
//           )
//         }
        
//         const data = await res.json()

//          setForm({
//           name: data.name || "",
//           email: data.email?.trim() || "",
//           phone: data.phone || "",
//           image: data.image || "",
//           description: data.description || "",
//           city: data.city || "",
//           state: data.state || ""
//         })

//       } catch (error) {
//         console.error(error)
//       } finally {
//         setFetching(false)
//       }
//     }

//     if (id) load()
//   }, [id])

//   // 🔹 guardar cambios
//   const handleUpdate = async () => {
//     try {
//       setLoading(true)

//       const res = await fetch(`/api/admin/doctors/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       })

//       if (!res.ok) {
//         throw new Error("Error al actualizar")
//       }

//       router.push("/admin/doctors")

//     } catch (error) {
//       console.error(error)
//       alert("Error al guardar")
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (fetching) {
//     return (
//       <div className="p-6">
//         Cargando doctor...
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 max-w-xl space-y-4 bg-white rounded-xl shadow">

//        <input
//           className="w-full border p-2 rounded"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           placeholder="Nombre"
//         />

//         <input
//           className="w-full border p-2 rounded"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//           placeholder="Email"
//         />

//         <input
//           className="w-full border p-2 rounded"
//           value={form.phone}
//           onChange={(e) =>
//             setForm({ ...form, phone: e.target.value })
//           }
//           placeholder="Teléfono"
//         />

//         <input
//           className="w-full border p-2 rounded"
//           value={form.city}
//           onChange={(e) =>
//             setForm({ ...form, city: e.target.value })
//           }
//           placeholder="Ciudad"
//         />

//         <input
//           className="w-full border p-2 rounded"
//           value={form.state}
//           onChange={(e) =>
//             setForm({ ...form, state: e.target.value })
//           }
//           placeholder="Estado"
//         />

//         <input
//           className="w-full border p-2 rounded"
//           value={form.image}
//           onChange={(e) =>
//             setForm({ ...form, image: e.target.value })
//           }
//           placeholder="Imagen URL"
//         />

//         <textarea
//           className="w-full border p-2 rounded h-32"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           placeholder="Descripción"
//         />

//       <button
//         onClick={handleUpdate}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
//       >
//         {loading ? "Guardando..." : "Actualizar"}
//       </button>

//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditDoctorPage() {

  const params = useParams()

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    description: "",
    city: "",
    state: ""
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // 🔹 cargar doctor
  useEffect(() => {

    const load = async () => {

      try {

        // console.log("Doctor ID:", id)

        const res = await fetch(
          `/api/admin/doctors/${id}`
        )

        // console.log("STATUS:", res.status)
        // console.log(
        //   "CONTENT TYPE:",
        //   res.headers.get("content-type")
        // )

        // validar json
        if (
          !res.ok ||
          !res.headers
            .get("content-type")
            ?.includes("application/json")
        ) {

          const text = await res.text()

          console.error(
            "Respuesta inesperada:",
            text
          )

          throw new Error(
            "La API no devolvió JSON"
          )
        }

        const data = await res.json()

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          image: data.image || "",
          description: data.description || "",
          city: data.city || "",
          state: data.state || ""
        })

      } catch (error) {

        console.error(error)

        alert(
          "Error cargando doctor"
        )

      } finally {

        setFetching(false)

      }
    }

    if (id) {
      load()
    }

  }, [id])

  // 🔹 guardar cambios
  const handleUpdate = async () => {

    try {

      setLoading(true)

      const res = await fetch(
        `/api/admin/doctors/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(form)
        }
      )

      if (!res.ok) {

        const text = await res.text()

        console.error(text)

        throw new Error(
          "Error actualizando"
        )
      }

      router.push(
        "/admin/listdoctors"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Error guardando doctor"
      )

    } finally {

      setLoading(false)

    }
  }

  if (fetching) {
    return (
      <div className="p-10">
        Cargando doctor...
      </div>
    )
  }

  return (
    <div className="p-10">

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            Editar Doctor
          </h1>

          <p className="text-blue-50 mt-1">
            Actualiza la información
            del doctor
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              placeholder="Nombre"
            />

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              placeholder="Email"
            />

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
              placeholder="Teléfono"
            />

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value
                })
              }
              placeholder="Ciudad"
            />

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              value={form.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  state: e.target.value
                })
              }
              placeholder="Estado"
            />

            <input
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 md:col-span-2"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value
                })
              }
              placeholder="URL de imagen"
            />

          </div>

          <textarea
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 h-40"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
            placeholder="Descripción"
          />

          <div className="flex justify-end pt-4 border-t">

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
            >
              {loading
                ? "Guardando..."
                : "Actualizar Doctor"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}