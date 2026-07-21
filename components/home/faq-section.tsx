
import { getActiveFaqs } from "@/lib/queries/faqs";
import { Plus } from "lucide-react"


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


    <section
      className="
        relative
        px-4
        py-20
        sm:px-6
      "
    >

      <div className="mx-auto max-w-5xl">


        {/* Header */}

        <div className="mb-10 text-center">

          {/* <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-sky-600
            "
          >
            Soporte
          </span> */}


          <h2
            className="
              mt-3
              font-serif
              font-heading text-cyan-600 text-4xl
              font-semibold
              tracking-tight              
              sm:text-4xl
            "
          >
            Preguntas frecuentes
          </h2>


          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-slate-600
            "
          >
            Encuentra respuestas rápidas sobre nuestros especialistas,
            servicios y proceso de atención.
          </p>

        </div>



        {/* FAQ */}

        <div className="space-y-4">


          {faqs.map((faq) => (

            <details
              key={faq.id}
              className="
                group

                rounded-2xl

                border
                border-white/70

                bg-white

                p-5

                shadow-sm

                backdrop-blur-xl

                transition-all
                duration-300
                hover:border-sky-200/70
                hover:shadow-[0_12px_28px_-24px_rgba(2,132,199,0.25)]
              "
            >


              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  gap-4

                  text-base
                  font-semibold
                  text-slate-500

                  [&::-webkit-details-marker]:hidden
                "
              >

                {faq.question}


              <span
                className="
                  flex
                  size-8
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-sky-50
                  text-sky-600

                  transition-all

                  group-open:bg-gradient-to-r
                  group-open:from-cyan-500
                  group-open:to-sky-600
                  group-open:text-white
                "
              >
                <Plus
                  className="
                    size-4
                    transition-transform
                    duration-300
                    group-open:rotate-45
                  "
                />
              </span>
              </summary>

              <p
                className="
                    mt-4
                    border-t
                    border-slate-100
                    pt-4
                    text-base
                    leading-relaxed
                    text-slate-900
                "
              >
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