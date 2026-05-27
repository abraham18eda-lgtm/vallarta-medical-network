"use client"

import { useEffect, useState } from "react"

import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd"

function generateSlug(text: string) {

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export default function NavigationPage() {

  const [items, setItems] = useState<any[]>([])

  const [places, setPlaces] = useState<any[]>([])

  const [savingOrder, setSavingOrder] =
    useState(false)

  const [editingItem, setEditingItem] =
  useState<any | null>(null)  

  const [form, setForm] = useState({
    title: "",
    url: "",
    locale: "es",
    order: 0,
    isActive: true,
    placeId: ""
  })

  // =========================================
  // LOAD DATA
  // =========================================

  const load = async () => {

    try {

      const res = await fetch(
        "/api/admin/navigation"
      )

      const data = await res.json()

      setItems(data)

      const placeRes = await fetch(
        "/api/admin/places"
      )

      const placeData =
        await placeRes.json()

      setPlaces(placeData)

    } catch (error) {

      console.error(error)

    }
  }

  useEffect(() => {
    load()
  }, [])

  // =========================================
  // CREATE ITEM
  // =========================================

  const createItem = async () => {

    try {

      await fetch(
        "/api/admin/navigation",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            ...form,
            slug: generateSlug(
              form.title
            )
          })
        }
      )

      setForm({
        title: "",
        url: "",
        locale: "es",
        order: 0,
        isActive: true,
        placeId: ""
      })

      load()

    } catch (error) {

      console.error(error)

    }
  }

  // =========================================
  // UPDATE ITEM
  // =========================================

  const updateItem = async () => {

  try {

    await fetch(
      `/api/admin/navigation/${editingItem.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          editingItem
        )
      }
    )

    setEditingItem(null)

    load()

  } catch (error) {

    console.error(error)

    alert(
      "Error actualizando"
    )
  }
}

  // =========================================
  // DELETE
  // =========================================

  const removeItem = async (
    id: string
  ) => {

    if (
      !confirm("¿Eliminar item?")
    ) return

    try {

      await fetch(
        `/api/admin/navigation/${id}`,
        {
          method: "DELETE"
        }
      )

      load()

    } catch (error) {

      console.error(error)

    }
  }

  // =========================================
  // DRAG ORDER
  // =========================================

  const handleDragEnd = (
    result: any
  ) => {

    if (!result.destination)
      return

    const reordered =
      Array.from(items)

    const [removed] =
      reordered.splice(
        result.source.index,
        1
      )

    reordered.splice(
      result.destination.index,
      0,
      removed
    )

    const updated =
      reordered.map(
        (item, index) => ({
          ...item,
          order: index + 1
        })
      )

    setItems(updated)
  }

  // =========================================
  // SAVE ORDER
  // =========================================

  const saveOrder = async () => {

    try {

      setSavingOrder(true)

      await fetch(
        "/api/admin/navigation/reorder",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            items: items.map(
              (item) => ({
                id: item.id,
                order: item.order
              })
            )
          })
        }
      )

      alert(
        "Orden guardado"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Error guardando orden"
      )

    } finally {

      setSavingOrder(false)

    }
  }

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="grid lg:grid-cols-[420px_1fr] gap-6">

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <div
          className="
            bg-white rounded-3xl
            border border-gray-100
            shadow-sm p-6 space-y-5
            h-fit
          "
        >

          <div>

            <h1
              className="
                text-2xl font-bold
                text-gray-800
              "
            >
              Nuevo Link
            </h1>

            <p
              className="
                text-sm text-gray-500 mt-1
              "
            >
              Administra el navbar dinámicamente
            </p>

          </div>

          {/* NOMBRE */}

          <div>

            <label
              className="
                text-sm font-medium
                text-gray-600
              "
            >
              Nombre
            </label>

            <input
              value={form.title}

              onChange={(e) => {

                const title =
                  e.target.value

                const slug =
                  generateSlug(title)

                setForm({
                  ...form,
                  title,
                  url: `/es/${slug}`
                })
              }}

              className="
                w-full mt-1
                border border-gray-200
                rounded-2xl px-4 py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

              placeholder="Hospitales"
            />

          </div>

          {/* URL */}

          <div>

            <label
              className="
                text-sm font-medium
                text-gray-600
              "
            >
              URL generada
            </label>

            <input
              value={form.url}

              readOnly

              className="
                w-full mt-1
                border border-gray-200
                rounded-2xl px-4 py-3
                bg-gray-100
                text-gray-500
              "
            />

          </div>

          {/* LOCALE + ORDER */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label
                className="
                  text-sm font-medium
                  text-gray-600
                "
              >
                Idioma
              </label>

              <select
                value={form.locale}

                onChange={(e) =>
                  setForm({
                    ...form,
                    locale:
                      e.target.value
                  })
                }

                className="
                  w-full mt-1
                  border border-gray-200
                  rounded-2xl px-4 py-3
                "
              >

                <option value="es">
                  Español
                </option>

                <option value="en">
                  English
                </option>

              </select>

            </div>

            <div>

              <label
                className="
                  text-sm font-medium
                  text-gray-600
                "
              >
                Orden
              </label>

              <input
                type="number"

                value={form.order}

                onChange={(e) =>
                  setForm({
                    ...form,
                    order: Number(
                      e.target.value
                    )
                  })
                }

                className="
                  w-full mt-1
                  border border-gray-200
                  rounded-2xl px-4 py-3
                "
              />

            </div>

          </div>

          {/* PLACE */}

          <div>

            <label
              className="
                text-sm font-medium
                text-gray-600
              "
            >
              Relacionar con Place
            </label>

            <select
              value={form.placeId}
              onChange={(e) => {

                const place =
                  places.find(
                    (p) => p.id === e.target.value
                  )

                setForm({
                  ...form,

                  // guardar relación
                  placeId: e.target.value,

                  // autocompletar nombre
                  title: place?.name || "",

                  // generar URL automática
                  url: place
                    ? `/${form.locale}/${place.slug}`
                    : ""
                })
              }}
              className="
                w-full
                mt-1
                border
                border-gray-200
                rounded-2xl
                px-4
                py-3
              "
            >
              <option value="">
                Sin relación
              </option>

              {places.map((place) => (

                <option
                  key={place.id}
                  value={place.id}
                >
                  {place.name}
                </option>

              ))}
            </select>  
                     
          </div>

          {/* ACTIVE */}
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isActive: e.target.checked
                  })
                }
                className="sr-only" // ocultamos el checkbox real
              />
              
              {/* Fondo */}
              <div
                className={`
                  w-12 h-6 rounded-full transition-colors duration-300
                  ${form.isActive ? "bg-blue-600" : "bg-gray-300"}
                `}
              ></div>

              {/* Círculo deslizable */}
              <div
                className={`
                  absolute left-0 top-0 w-6 h-6 bg-white border rounded-full shadow-md transform transition-transform duration-300
                  ${form.isActive ? "translate-x-6" : "translate-x-0"}
                `}
              ></div>

              {/* Etiqueta “Activo” solo si está activado */}
              {form.isActive && (
                <span className="mx-2 right-14 text-sm font-medium text-gray-700">
                  Activo
                </span>
              )}
            </label>
          </div>
            {/* <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={form.isActive}
      onChange={(e) =>
        setForm({
          ...form,
          isActive: e.target.checked
        })
      }
      className="sr-only" // ocultamos el checkbox real
    />
    <div
      className={`
        w-12 h-6 rounded-full transition-colors duration-300
        ${form.isActive ? "bg-blue-600" : "bg-gray-300"}
      `}
    ></div>
    <div
      className={`
        absolute left-0 top-0 w-6 h-6 bg-white border rounded-full shadow-md transform transition-transform duration-300
        ${form.isActive ? "translate-x-6" : "translate-x-0"}
      `}
    ></div>
  </label>
       */}
          {/* <label
            className="
              flex items-center gap-3
              text-sm text-gray-700
            "
          > */}

            {/* <input
              type="checkbox"

              checked={form.isActive}

              onChange={(e) =>
                setForm({
                  ...form,
                  isActive:
                    e.target.checked
                })
              }
            /> */}

            {/* Activo */}

          {/* </label> */}

          {/* BUTTON */}

          <button
            onClick={createItem}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white py-3
              rounded-2xl
              font-medium
              transition
            "
          >
            Guardar Link
          </button>

        </div>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div
          className="
            bg-white rounded-3xl
            border border-gray-100
            shadow-sm overflow-hidden
          "
        >

          <div className="p-6 border-b">

            <h2
              className="
                text-xl font-bold
                text-gray-800
              "
            >
              Navbar
            </h2>

            <p
              className="
                text-sm text-gray-500 mt-1
              "
            >
              Arrastra para ordenar
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead
                className="
                  bg-gray-50 text-gray-500
                "
              >

                <tr>

                  <th className="p-4 text-left">
                    Nombre
                  </th>

                  <th className="p-4 text-left">
                    URL
                  </th>

                  <th className="p-4 text-center">
                    Idioma
                  </th>

                  <th className="p-4 text-center">
                    Orden
                  </th>

                  <th className="p-4 text-center">
                    Estado
                  </th>

                  <th className="p-4 text-center">
                    Acciones
                  </th>

                </tr>

              </thead>

              <DragDropContext
                onDragEnd={
                  handleDragEnd
                }
              >

                <Droppable
                  droppableId="navbar"
                >

                  {(provided) => (

                    <tbody
                      ref={
                        provided.innerRef
                      }

                      {
                        ...provided.droppableProps
                      }
                    >

                      {items.map(
                        (
                          item,
                          index
                        ) => (

                          <Draggable
                            key={item.id}

                            draggableId={
                              item.id
                            }

                            index={index}
                          >

                            {(provided) => (

                              <tr
                                ref={
                                  provided.innerRef
                                }

                                {
                                  ...provided.draggableProps
                                }

                                {
                                  ...provided.dragHandleProps
                                }

                                className="
                                  border-t
                                  hover:bg-gray-50
                                  cursor-move
                                "
                              >

                                <td
                                  className="
                                    p-4
                                    font-medium
                                    text-gray-800
                                  "
                                >
                                  {
                                    item.title
                                  }
                                </td>

                                <td
                                  className="
                                    p-4
                                    text-gray-500
                                  "
                                >
                                  {
                                    item.url
                                  }
                                </td>

                                <td className="p-4 text-center">
                                  {
                                    item.locale
                                  }
                                </td>

                                <td className="p-4 text-center">
                                  {
                                    item.order
                                  }
                                </td>

                                {/* <td className="p-4 text-center">
                                  {item.isActive
                                    ? "✅"
                                    : "❌"}
                                </td> */}

                                <td className="p-4 text-center">
                                  <span
                                    className={`
                                      relative inline-flex items-center justify-center w-6 h-6 rounded-full
                                      ${item.isActive ? "bg-green-100 text-green-500" : "bg-gray-100 text-gray-400"}
                                    `}
                                  >
                                    {item.isActive && (
                                      <svg
                                        className="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" />
                                      </svg>
                                    )}
                                  </span>
                                </td>

                                <td className="p-4">

                                  {/* <div className="flex items-center justify-center gap-3">

                                    <button
                                      onClick={() =>
                                        setEditingItem(item)
                                      }
                                      className="
                                        text-blue-600
                                        hover:text-blue-700
                                        font-medium
                                      "
                                    >
                                      Editar
                                    </button>

                                    <button
                                      onClick={() =>
                                        removeItem(item.id)
                                      }
                                      className="
                                        text-red-600
                                        hover:text-red-700
                                        font-medium
                                      "
                                    >
                                      Eliminar
                                    </button>

                                  </div> */}
                                  <div className="flex items-center justify-center gap-3">

                                    {/* Editar */}
                                    <button
                                      onClick={() => setEditingItem(item)}
                                      className="
                                        flex items-center justify-center w-8 h-8 rounded-full
                                        bg-blue-50 text-blue-600 font-medium
                                        hover:bg-blue-100 hover:text-blue-700
                                        transition-colors duration-200
                                      "
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        >
                                          <path d="M12 20h9" />
                                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                        </svg>
                                        {/* Editar */}
                                      </button>

                                      {/* Eliminar */}
                                      <button
                                        onClick={() => removeItem(item.id)}
                                        className="
                                          flex items-center justify-center w-8 h-8 rounded-full
                                          bg-red-50 text-red-600 font-medium
                                          hover:bg-red-100 hover:text-red-700
                                          transition-colors duration-200
                                        "
                                      >
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          viewBox="0 0 24 24"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <path d="M3 6h18" />
                                          <path d="M19 6l-1 14H6L5 6" />
                                          <path d="M10 11v6" />
                                          <path d="M14 11v6" />
                                          <path d="M9 6V4h6v2" />
                                        </svg>
                                        {/* Eliminar */}
                                      </button>

                                  </div>
                                </td>

                              </tr>

                            )}

                          </Draggable>

                        )
                      )}

                      {
                        provided.placeholder
                      }

                    </tbody>

                  )}

                </Droppable>

              </DragDropContext>

            </table>

          </div>

          {/* FOOTER */}

          <div
            className="
              p-5 border-t bg-gray-50
              flex justify-end
            "
          >

            <button
              onClick={saveOrder}

              disabled={savingOrder}

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white px-6 py-3
                rounded-2xl
                font-medium transition
              "
            >
              {savingOrder
                ? "Guardando..."
                : "Guardar Orden"}
            </button>

          </div>

        </div>

      </div>
    {editingItem && (

  <div
    className="
      fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
      p-4
    "
  >

    <div
      className="
        bg-white w-full max-w-lg
        rounded-3xl shadow-2xl
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div className="p-6 border-b">

        <div className="flex justify-between items-center">

          <div>

            <h2
              className="
                text-2xl font-bold
                text-gray-800
              "
            >
              Editar Link
            </h2>

            <p
              className="
                text-sm text-gray-500
              "
            >
              Actualiza la información
            </p>

          </div>

          <button
            onClick={() =>
              setEditingItem(null)
            }
            className="
              w-10 h-10
              rounded-full
              hover:bg-gray-100
            "
          >
            ✕
          </button>

        </div>

      </div>

      {/* BODY */}

      <div className="p-6 space-y-5">

        {/* TITLE */}

        <div>

          <label
            className="
              text-sm font-medium
              text-gray-600
            "
          >
            Nombre
          </label>

          <input
            value={editingItem.title}

            onChange={(e) => {

              const title =
                e.target.value

              const slug =
                generateSlug(title)

              setEditingItem({
                ...editingItem,
                title,
                url: `/es/${slug}`
              })
            }}

            className="
              w-full mt-1
              border border-gray-200
              rounded-2xl
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {/* URL */}

        <div>

          <label
            className="
              text-sm font-medium
              text-gray-600
            "
          >
            URL
          </label>

          <input
            value={editingItem.url}

            readOnly

            className="
              w-full mt-1
              border border-gray-200
              rounded-2xl
              px-4 py-3
              bg-gray-100
              text-gray-500
            "
          />

        </div>

        {/* LOCALE */}

        <div>

          <label
            className="
              text-sm font-medium
              text-gray-600
            "
          >
            Idioma
          </label>

          <select
            value={editingItem.locale}

            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                locale:
                  e.target.value
              })
            }

            className="
              w-full mt-1
              border border-gray-200
              rounded-2xl
              px-4 py-3
            "
          >

            <option value="es">
              Español
            </option>

            <option value="en">
              English
            </option>

          </select>

        </div>

        {/* PLACE */}

        <div>

          <label
            className="
              text-sm font-medium
              text-gray-600
            "
          >
            Relacionar Place
          </label>

          <select
            value={
              editingItem.placeId || ""
            }

            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                placeId:
                  e.target.value
              })
            }

            className="
              w-full mt-1
              border border-gray-200
              rounded-2xl
              px-4 py-3
            "
          >

            <option value="">
              Sin relación
            </option>

            {places.map((place) => (

              <option
                key={place.id}
                value={place.id}
              >
                {place.name}
              </option>

            ))}

          </select>

        </div>

        {/* ACTIVE */}

        <label
          className="
            flex items-center gap-3
            text-sm text-gray-700
          "
        >

          <input
            type="checkbox"

            checked={
              editingItem.isActive
            }

            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                isActive:
                  e.target.checked
              })
            }
          />

          Activo

        </label>

      </div>

      {/* FOOTER */}

      <div
        className="
          p-6 border-t
          bg-gray-50
          flex justify-end gap-3
        "
      >

        <button
          onClick={() =>
            setEditingItem(null)
          }

          className="
            px-5 py-2
            rounded-2xl
            border border-gray-300
            hover:bg-gray-100
          "
        >
          Cancelar
        </button>

        <button
          onClick={updateItem}

          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6 py-2
            rounded-2xl
            font-medium
          "
        >
          Guardar Cambios
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  )
}