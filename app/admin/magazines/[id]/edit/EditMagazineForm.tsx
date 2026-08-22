"use client"

import Link from "next/link"
import { useActionState } from "react"

import ImagePreview from "@/components/admin/ImagePreview"

import {
  updateMagazine,
  type MagazineActionState
} from "@/actions/magazine.actions"


interface Magazine {
  id: string
  title: string
  coverImage: string
  description: string | null
  url: string
  edition: string | null
  isFeatured: boolean
  isActive: boolean
  locale: string
}


interface Props {
  magazine: Magazine
}


export default function EditMagazineForm({
  magazine
}: Props) {

  const action =
    updateMagazine.bind(
      null,
      magazine.id
    )


  const initialState: MagazineActionState = {
    values: {
      title: magazine.title,
      url: magazine.url,
      description: magazine.description ?? "",
      edition: magazine.edition ?? "",
      locale: magazine.locale,
      isFeatured: magazine.isFeatured,
      isActive: magazine.isActive
    }
  }


  const [
    state,
    formAction,
    isPending
  ] = useActionState(action, initialState )


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

      {/* ERROR GENERAL */}

      {state.errors?.general && (

        <div className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          px-5
          py-4
          text-sm
          text-red-700
        ">
          {state.errors.general}
        </div>

      )}


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
          defaultValue={state.values?.title ?? magazine.title}
          placeholder="Ej: Revista Salud y Bienestar"
          className={`
            w-full
            rounded-2xl
            border
            px-5
            py-3
            outline-none
            transition
            ${
              state.errors?.title
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-200 focus:ring-blue-500"
            }
          `}
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
                Selecciona una nueva imagen solamente si
                deseas reemplazar la portada actual.
            </p>

            </div>


            <ImagePreview
            currentImage={magazine.coverImage}
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
                mb-6
            "
            >
            Descripción
            </label>

            <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={
                state.values?.description ??
                magazine.description ??
                ""
            }
            placeholder="Descripción de la revista..."
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
            "
            />

        </div>    
       
      </div>  

      <div className="grid md:grid-cols-3 gap-6">        
        {/* EDICION */}

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
            defaultValue={
            state.values?.edition ??
            magazine.edition ??
            ""
            }
            placeholder="Ej: Agosto 2026"
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
     
        {/* IDIOMA */}

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
                defaultValue={
                state.values?.locale ??
                magazine.locale
                }
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
                defaultValue={
                    state.values?.url ?? magazine.url
                }
                placeholder="https://..."
                className={`
                    w-full
                    rounded-2xl
                    border
                    px-5
                    py-3
                    outline-none
                    focus:ring-2
                    ${
                    state.errors?.url
                        ? "border-red-400 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }
                `}
            />
            {state.errors?.url && (

            <p className="text-sm text-red-600">
                {state.errors.url}
            </p>

            )}

        </div>        
        
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
                defaultChecked={
                state.values?.isFeatured ??
                magazine.isFeatured
                }
                className="w-4 h-4"
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
                defaultChecked={
                state.values?.isActive ??
                magazine.isActive
                }
                className="w-4 h-4"
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
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-blue-300
            text-white
            transition
            font-medium
          "
        >

          {isPending
            ? "Guardando..."
            : "Guardar cambios"
          }

        </button>

      </div>

    </form>

  )

}
