
import { getActiveFaqs } from "@/lib/queries/faqs";


interface Props {
  locale: string;
}

export default async function FaqSection({
  locale
}: Props) {

  const faqs = await getActiveFaqs(locale);


  if (!faqs.length) {
    return null;
  }

   const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqs.map((faq) => ({

      "@type": "Question",

      name: faq.question,

      acceptedAnswer: {

        "@type": "Answer",

        text: faq.answer,

      },

    })),

  };

  return (

    <>

      {/* SEO Schema */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />


      <section className="py-16">

        <div className="max-w-5xl mx-auto px-6">


          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">
            Preguntas frecuentes
          </h2>


          <div className="space-y-4">

            {faqs.map((faq)=>(

              <details
                key={faq.id}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                "
              >

                <summary className="cursor-pointer font-semibold">

                  {faq.question}

                </summary>


                <p className="mt-4 text-gray-600">

                  {faq.answer}

                </p>


              </details>

            ))}

          </div>


        </div>

      </section>

    </>

  );
}