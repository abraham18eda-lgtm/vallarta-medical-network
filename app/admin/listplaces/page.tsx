"use client"

import { useEffect, useState } from "react"
import EditPlaceModal from "@/components/ui/EditPlaceModal"

export default function AdminListPlaces() {
  

  const [places, setPlaces] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [editingPlace, setEditingPlace] = useState<string | null>(null)
  // =========================
  // CARGAR PLACES
  // =========================
  const loadPlaces = async () => {

    try {

      setLoading(true)

      const res = await fetch("/api/admin/places")

      if (!res.ok) {
        throw new Error(
          "Error cargando places"
        )
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        setPlaces([])
        return
      }

      setPlaces(data)

    } catch (error) {

      console.error(error)

      setPlaces([])

    } finally {

      setLoading(false)

    }
  }

  // =========================
  // ELIMINAR
  // =========================
  const removePlace = async ( id: string ) => {
    
    // const confirmDelete =
    //   confirm(
    //     "¿Eliminar lugar?"
    //   )

    // if (!confirmDelete) return
     if (!confirm("¿Eliminar lugar?")) return
    try {

      await fetch(
        `/api/admin/places/${id}`,
        {
          method: "DELETE"
        }
      )

      loadPlaces()

    } catch (error) {

      console.error(error)

      alert(
        "Error eliminando"
      )
    }
  }

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    loadPlaces()
  }, [])

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Hospitales, clínicas y laboratorios
          </h1>
{/* 
          <p className="text-gray-500 mt-1">
            Hospitales, clínicas y laboratorios
          </p> */}

        </div>

        {/* <button
          className="
            bg-blue-600 hover:bg-blue-700
            text-white px-5 py-3
            rounded-2xl
            shadow-sm
            transition
          "
        >
          + Nuevo Place
        </button> */}

      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* TOP */}
        <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between">

          <div>

            <h2 className="font-semibold text-gray-800">
              Listado de Places
            </h2>

            <p className="text-sm text-gray-500">
              {places.length} registrados
            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-white border-b">

              <tr className="text-left text-gray-500">

                <th className="px-6 py-4">
                  Lugar
                </th>

                <th className="px-6 py-4">
                  Tipo
                </th>

                <th className="px-6 py-4">
                  Ciudad
                </th>

                <th className="px-6 py-4">
                  Estado
                </th>

                <th className="px-6 py-4">
                  Contacto
                </th>

                <th className="px-6 py-4">
                  Categorías
                </th>

                <th className="px-6 py-4 text-right">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {places.map((place) => (

                <tr
                  key={place.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* PLACE */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border">

                        {place.image ? (

                          <img
                            src={place.image}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            Sin imagen
                          </div>

                        )}

                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">
                          {place.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {place.address || "Sin dirección"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-4">

                    <span
                      className="
                        bg-blue-50
                        text-blue-700
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium
                      "
                    >
                      {place.type}
                    </span>

                  </td>

                  {/* CITY */}
                  <td className="px-6 py-4 text-gray-600">
                    {place.city || "—"}
                  </td>

                  {/* STATE */}
                  <td className="px-6 py-4 text-gray-600">
                    {place.state || "—"}
                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4">

                    <div className="space-y-1">

                      <p className="text-gray-700">
                        {place.phone || "—"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {place.website || ""}
                      </p>

                    </div>

                  </td>

                  {/* CATEGORIES */}
                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-2">

                      {place.categories?.length ? (

                        place.categories.map(
                          (cat: any) => (

                            <span
                              key={cat.category.id}
                              className="
                                bg-green-50
                                text-green-700
                                px-2 py-1
                                rounded-full
                                text-xs
                                font-medium
                              "
                            >
                              {cat.category.name}
                            </span>

                          )
                        )

                      ) : (

                        <span className="text-gray-400 text-xs">
                          Sin categorías
                        </span>

                      )}

                    </div>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* BOTÓN EDITAR */}
                      <button
                        onClick={() => setEditingPlace(place.id)}
                        className="
                          px-4 py-2
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                          hover:bg-blue-100
                          transition
                          text-xs
                          font-medium
                        "
                      >
                        Editar
                      </button>

                      {/* BOTÓN ELIMINAR */}
                      <button
                        onClick={() => removePlace(place.id)}
                        className="
                          px-4 py-2
                          rounded-xl
                          bg-red-50
                          text-red-600
                          hover:bg-red-100
                          transition
                          text-xs
                          font-medium
                        "
                      >
                        Eliminar
                      </button>
                    </div>

                    {/* MODAL */}
                    {editingPlace && (
                      <EditPlaceModal
                        id={editingPlace}
                        onClose={() => setEditingPlace(null)}
                        onSaved={loadPlaces}
                      />
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}
        {!loading &&
          places.length === 0 && (

            <div className="py-20 text-center">

              <p className="text-gray-400">
                No hay places registrados
              </p>

            </div>

          )}

        {/* LOADING */}
        {loading && (

          <div className="py-20 text-center">

            <p className="text-gray-500">
              Cargando places...
            </p>

          </div>

        )}

      </div>

    </div>
  )
}