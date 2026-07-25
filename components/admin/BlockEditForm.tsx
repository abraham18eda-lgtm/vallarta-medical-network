"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import { CalendarDays } from "lucide-react"
import { Switch } from "@headlessui/react"
import ImageUpload from "./ImageUploadPreview"


interface Props {
  block: any
  data: any
  updateBlock: (formData: FormData) => Promise<void>
}


export default function BlockEditForm({
  block,
  data,
  updateBlock,
}: Props) {


  // =========================
  // DATES
  // =========================

  const [startDate, setStartDate] = useState<Date | null>(
    block?.startAt
      ? new Date(block.startAt)
      : null
  )


  const [endDate, setEndDate] = useState<Date | null>(
    block?.endAt
      ? new Date(block.endAt)
      : null
  )


  // =========================
  // ACTIVE SWITCH
  // =========================

  const [enabled, setEnabled] = useState(
    block?.isActive ?? true
  )



  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-10 px-4">

      <form
        action={updateBlock}
        className="
          w-full
          max-w-3xl
          bg-white
          p-6
          md:p-8
          rounded-2xl
          shadow-xl
          space-y-6
        "
      >


        <h1 className="text-2xl font-bold text-slate-800">
          Editar Block Ad
        </h1>



        {/* =========================
            TYPE
        ========================= */}

        <div
          className="
            bg-sky-50
            border
            border-sky-100
            text-sky-700
            p-4
            rounded-2xl
          "
        >
          Tipo:

          <strong className="ml-2">
            {block.type}
          </strong>

        </div>



        {/* =========================
            TITLE
        ========================= */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-gray-700">
            Título
          </label>


          <input
            name="title"
            defaultValue={data?.title ?? ""}
            placeholder="Título"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              focus:border-sky-400
              focus:ring-4
              focus:ring-sky-100
            "
          />

        </div>




        {/* =========================
            DESCRIPTION
        ========================= */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-gray-700">
            Descripción
          </label>


          <textarea
            name="description"
            defaultValue={data?.description ?? ""}
            placeholder="Descripción"
            className="
              w-full
              h-32
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              resize-none
              outline-none
              focus:border-sky-400
              focus:ring-4
              focus:ring-sky-100
            "
          />

        </div>




        {/* =========================
            IMAGE
        ========================= */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-gray-700">
            Imagen
          </label>


          <ImageUpload
            defaultImage={data?.image ?? ""}
            name="image"
          />

        </div>




        {/* =========================
            ALT
        ========================= */}

        <input
          name="alt"
          defaultValue={data?.alt ?? ""}
          placeholder="Texto alternativo"
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-sky-400
            focus:ring-4
            focus:ring-sky-100
          "
        />


         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">   
            
            <input
            name="locale"
            defaultValue={block.locale}
            placeholder="Locale"
            className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
            "
            />

            <input
            name="link"
            defaultValue={data?.link ?? ""}
            placeholder="Link"
            className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
            "
            />

            <input
            type="number"
            name="order"
            min="0"
            max="20"
            step="1"
            defaultValue={block.order ?? 0}
            onChange={(e) => {
                const value = Number(e.target.value)

                if (value > 20) {
                e.target.value = "20"
                }

                if (value < 0) {
                e.target.value = "0"
                }
            }}
            className="w-full border p-3 rounded-xl"
            />
        </div>



        {/* =========================
            DATES
        ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div className="space-y-2">

            <label className="block text-sm font-medium text-gray-700">
                Fecha de inicio
            </label>

            <CalendarDays
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sky-500
                pointer-events-none
                "
                size={20}
            />

            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Selecciona fecha de inicio"
              className="w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-700
                shadow-sm
                transition
                placeholder:text-slate-400
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
                outline-none"
            />

          </div>



          <div className="space-y-2">

            <label className="block text-sm font-medium text-gray-700">
                Fecha de finalización
            </label>

            <CalendarDays
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sky-500
                pointer-events-none
                "
                size={20}
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
               showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecciona fecha de fin"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>


        </div>




        {/* =========================
            ACTIVE
        ========================= */}

        <div className="flex items-center gap-3">


          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`
              ${
                enabled
                  ? "bg-green-600"
                  : "bg-gray-300"
              }
              relative
              inline-flex
              h-6
              w-11
              items-center
              rounded-full
              transition
            `}
          >

            <span
              className={`
                ${
                  enabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }
                inline-block
                h-4
                w-4
                rounded-full
                bg-white
                transition
              `}
            />

          </Switch>


          <span className="text-sm font-medium text-gray-700">
            Activo
          </span>


        </div>



        {/* Valores para Server Action */}

        <input
          type="hidden"
          name="isActive"
          value={enabled ? "true" : "false"}
        />


        <input
          type="hidden"
          name="startAt"
          value={
            startDate
              ? startDate.toISOString()
              : ""
          }
        />


        <input
          type="hidden"
          name="endAt"
          value={
            endDate
              ? endDate.toISOString()
              : ""
          }
        />




        {/* =========================
            BUTTON
        ========================= */}

        <button
          type="submit"
          className="
            btn-form w-full py-3 rounded-xl
          "
        >
          Guardar cambios
        </button>


      </form>

    </div>
  )
}