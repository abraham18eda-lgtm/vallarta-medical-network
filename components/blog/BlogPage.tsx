import Link from "next/link"
import { BlogCard } from "./BlogCard"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl";

interface Props {
  posts: any[]
  locale: "es" | "en"
  totalPages: number
  currentPage: number
  search?: string
}


export function BlogPage({
  posts,
  locale,
  totalPages,
  currentPage,
  search = ""
}: Props) {

  // const locale = await getLocale();
  const t = useTranslations("blog");
  const tSearch = useTranslations("search")

  return (

    <section className="max-w-7xl mx-auto px-4 py-20">


      {/* HEADER */}

      <div className="text-center mb-12">

        <h1 className="text-4xl font-bold">
          {t("title")}
        </h1>


        <p className="text-muted-foreground mt-3">

          {t("description")}

        </p>

      </div>




      {/* SEARCH */}

      <form

        action={`/${locale}/blog`}

        method="GET"

        className="
          max-w-xl
          mx-auto
          mb-12
        "

      >

        <div
          className="
            relative
          "
        >

          <Search

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              w-5
              h-5
              text-gray-400
            "

          />


          <input

            name="search"

            defaultValue={search}

            placeholder={tSearch("title")}

            className="
              w-full
              rounded-full
              border
              bg-white
              px-12
              py-4
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "

          />


        </div>


      </form>





      {/* GRID */}

      <div

        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "

      >

        {
          posts.map((post) => (

            <BlogCard

              key={post.slug}

              post={post}

              locale={locale}

            />

          ))
        }


      </div>





      {/* PAGINATION */}

      {
        totalPages > 1 && (

          <div

            className="
              flex
              justify-center
              gap-3
              mt-14
              flex-wrap
            "

          >


            {
              Array.from({
                length: totalPages

              }).map((_, i) => {


                const page = i + 1


                return (

                  <Link


                    key={page}


                    href={
                      `/${locale}/blog?page=${page}${
                        search
                          ? `&search=${encodeURIComponent(search)}`
                          : ""
                      }`
                    }


                    className={`

                      w-11
                      h-11
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-medium
                      transition-all

                      ${
                        currentPage === page

                          ? "bg-primary text-white shadow-lg"

                          : "bg-white border hover:bg-gray-100"
                      }

                    `}


                  >

                    {page}


                  </Link>

                )


              })

            }


          </div>

        )

      }



    </section>

  )

}