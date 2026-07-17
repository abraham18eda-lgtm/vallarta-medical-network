import Link from "next/link";
import { notFound } from "next/navigation";

import FaqForm from "../../components/faq-form";
import { getFaq } from "../../queries";
import { updateFaq } from "../../actions";


interface Props {

  params: Promise<{
    id:string
  }>

}


export default async function EditFaqPage({
  params
}: Props) {


  const { id } = await params;


  const faq =
    await getFaq(id);


  if (!faq) {
    notFound();
  }


  const updateAction =
    async (formData:FormData)=>{

      "use server";

      await updateFaq(
        id,
        formData
      );

    };


  return (

    <div className="min-h-screen bg-gray-50 p-6">


      <div className="max-w-4xl mx-auto">


        <div className="mb-8">


          <Link
            href="/admin/faq"
            className="
              text-sm
              text-gray-500
              hover:text-gray-800
            "
          >
            ← Volver
          </Link>


          <h1 className="
            text-3xl
            font-bold
            text-gray-800
            mt-4
          ">
            Editar Pregunta
          </h1>


        </div>



        <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
        ">


          <FaqForm

            action={updateAction}

            initialData={{

              question: faq.question,

              answer: faq.answer,

              locale: faq.locale,

              order: faq.order,

              isActive: faq.isActive

            }}

          />


        </div>


      </div>


    </div>

  );

}