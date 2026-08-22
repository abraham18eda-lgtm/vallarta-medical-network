"use client"

import Link from "next/link"
import { useActionState } from "react"

import ImagePreview from "@/components/admin/ImagePreview"
import {
  createMagazine,
  type MagazineActionState
} from "@/actions/magazine.actions"


const initialState: MagazineActionState = {}


export default function MagazineForm() {

  const [
    state,
    formAction,
    isPending
  ] = useActionState(
    createMagazine,
    initialState
  )


  return (

    <form
      action={formAction}
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-8
        space-y-8
      "
    >

    {/* INFORMACIÓN */}

      <div>

        <h2 className="
          text-lg
          font-semibold
          text-gray-800
        ">
          Información de la revista
        </h2>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">
          Datos principales de la publicación.
        </p>

      </div>


      {/* TITULO */}

      <div className="space-y-2">

        <label
          htmlFor="title"
          className="
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
          Título
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Ej: Revista Salud y Bienestar"
          defaultValue={state.values?.title ?? ""}
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            px-5
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            transition
          "
        />
        {state.errors?.title && (
        <p className="text-sm text-red-600">
            {state.errors.title}
        </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">  
        {/* PORTADA */}

        <div className="space-y-2">

            <div>

            <label className="
                block
                text-sm
                font-medium
                text-gray-700
            ">
                Portada
            </label>

            <p className="
                text-xs
                text-gray-500
                mt-1
            ">
                Selecciona la imagen de portada.
            </p>

            </div>

            <ImagePreview
            name="coverFile"
            />
            {state.errors?.coverFile && (
                <p className="text-sm text-red-600">
                    {state.errors.coverFile}
                </p>
            )}

        </div>


        {/* DESCRIPCION */}

        <div className="space-y-2">

            <label
            htmlFor="description"
            className="
                block
                text-sm
                font-medium
                text-gray-700
                md:mb-4
            "
            >
            Descripción
            </label>

            <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Descripción de la revista..."
            defaultValue={state.values?.description ?? ""}
            className="
                w-full
                rounded-2xl
                border
                border-gray-200
                px-5
                py-3
                outline-none
                resize-y
                focus:ring-2
                focus:ring-blue-500
                transition
            "
            />

        </div>
      </div>  

      {/* EDICION / IDIOMA */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      ">

        <div className="space-y-2">

          <label
            htmlFor="edition"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Edición
          </label>

          <input
            id="edition"
            name="edition"
            type="text"
            placeholder="Ej: Agosto 2026"
              defaultValue={state.values?.edition ?? ""}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>


        <div className="space-y-2">

          <label
            htmlFor="locale"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Idioma
          </label>

          <select
            id="locale"
            name="locale"
            defaultValue={state.values?.locale ?? "es"}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-5
              py-3
              bg-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
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

      </div>


      {/* URL */}

      <div className="space-y-2">

        <label
          htmlFor="url"
          className="
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
          URL de la revista
        </label>

        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://..."
          defaultValue={state.values?.url ?? ""}
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            px-5
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
        {state.errors?.url && (
            <p className="text-sm text-red-600">
                {state.errors.url}
            </p>
        )}

      </div>


      {/* OPCIONES */}

      <div className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        p-5
        space-y-4
      ">

        <h3 className="
          font-medium
          text-gray-800
        ">
          Opciones
        </h3>


        <label className="
          flex
          items-center
          gap-3
          cursor-pointer
        ">

          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={state.values?.isFeatured ?? false}
            className="
              w-4
              h-4
            "
          />

          <span className="text-sm">
            Revista destacada
          </span>

        </label>


        <label className="
          flex
          items-center
          gap-3
          cursor-pointer
        ">

          <input
            type="checkbox"
            name="isActive"
             defaultChecked={state.values?.isActive ?? true}
            className="
              w-4
              h-4
            "
          />

          <span className="text-sm">
            Revista activa
          </span>

        </label>

      </div>


      {/* BOTONES */}

      <div className="
        flex
        flex-col-reverse
        sm:flex-row
        sm:justify-end
        gap-3
        pt-4
        border-t
        border-gray-100
      ">

        <Link
          href="/admin/magazines"
          className="
            px-6
            py-3
            rounded-2xl
            border
            border-gray-200
            text-gray-700
            text-center
            hover:bg-gray-50
          "
        >
          Cancelar
        </Link>


        <button
          type="submit"
          disabled={isPending}
          className="
            px-6
            py-3
            rounded-2xl
            bg-gradient-to-r from-blue-600 to-sky-500
            hover:bg-blue-700
            disabled:bg-blue-300
            text-white
            hover:scale-[1.01] transition
            font-medium
          "
        >

          {isPending
            ? "Guardando..."
            : "Guardar revista"
          }

        </button>

      </div>

    </form>

  )
}
