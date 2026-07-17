export const dynamic = "force-dynamic"

import Link from "next/link";
import { getFaqs } from "./queries";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    locale?: string;
  }>;
}

export default async function AdminFaqPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";
  const locale = params.locale || "";

  const { faqs, total, totalPages } = await getFaqs({
    page: currentPage,
    search,
    locale,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Preguntas Frecuentes
          </h1>

          <p className="text-gray-500 mt-1">
            Administración de preguntas frecuentes
          </p>
        </div>

        <Link
          href="/admin/faq/new"
          className="
            bg-blue-600 hover:bg-blue-700
            text-white
            px-5 py-3
            rounded-2xl
            shadow-sm
            transition
            text-sm font-medium
          "
        >
          + Nueva Pregunta
        </Link>

      </div>

      {/* BUSCADOR */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-6">

        <form className="flex gap-4">

          <div className="relative flex-1">

            <input
              name="search"
              defaultValue={search}
              placeholder="Buscar preguntas..."
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                px-5
                py-3
                pl-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              🔍
            </span>

          </div>

          <button
            className="
              bg-gray-900
              text-white
              px-6
              rounded-2xl
            "
          >
            Buscar
          </button>

        </form>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b bg-gray-50">

          <h2 className="font-semibold">
            Listado de Preguntas
          </h2>

          <p className="text-sm text-gray-500">
            {total} preguntas encontradas
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="border-b">

              <tr className="text-left text-gray-500">

                <th className="px-6 py-4">
                  Orden
                </th>

                <th className="px-6 py-4">
                  Pregunta
                </th>

                <th className="px-6 py-4 text-center">
                  Idioma
                </th>

                <th className="px-6 py-4 text-center">
                  Estado
                </th>

                <th className="px-6 py-4 text-center">
                  Fecha
                </th>

                <th className="px-6 py-4 text-right">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {faqs.map((faq) => (

                <tr
                  key={faq.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {faq.order}
                  </td>

                  <td className="px-6 py-4">

                    <p className="font-semibold">
                      {faq.question}
                    </p>

                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                      {faq.answer}
                    </p>

                  </td>

                  <td className="text-center">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {faq.locale}
                    </span>
                  </td>

                  <td className="text-center">

                    {faq.isActive ? (

                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                        Activa
                      </span>

                    ) : (

                      <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">
                        Inactiva
                      </span>

                    )}

                  </td>

                  <td className="text-center text-gray-500">

                    {new Date(
                      faq.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-6">

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/faq/${faq.id}/edit`}
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          justify-center
                        "
                      >
                        ✏️
                      </Link>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (

        <div className="flex justify-center gap-2 mt-8">

          {Array.from({
            length: totalPages,
          }).map((_, index) => {

            const page = index + 1;

            return (

              <Link
                key={page}
                href={`/admin/faq?page=${page}&search=${search}`}
                className={`
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }
                `}
              >
                {page}
              </Link>

            );

          })}

        </div>

      )}

    </div>
  );
}