// import { getPaginatedPosts } from "@/lib/blog"
// import { BlogPage } from "@/components/blog/BlogPage"
// import Link from "next/link"

// interface Props {
//   params: {
//     locale: "es" | "en"  
//   }
//   searchParams: {
//     page?: string,
//     search?: string
//   }
// }

// export default async function BlogPageList({ params, searchParams  }: Props) {
//   const { locale } = params
//   // console.log("Locale:", locale)
//   const page = Number(searchParams?.page) || 1

//   const search = searchParams.search || ""

//   const { posts, totalPages } =
//     await getPaginatedPosts(page, locale, search)

//   return (
//     <div className="py-20 max-w-6xl mx-auto px-4">
//       {/* <h1 className="text-4xl font-bold mb-10 text-center">
//         Todos los artículos
//       </h1> */}

//       <BlogPage
//         posts={posts}
//         locale={locale}
//         totalPages={totalPages}
//         currentPage={page}
//         search={search}
//        />

//       {/* Paginación */}
//       <div className="flex justify-center gap-4 mt-10">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <Link
//             key={i}
//             href={`?page=${i + 1}`}
//             className={`px-4 py-2 border rounded ${
//               page === i + 1 ? "bg-black text-white" : ""
//             }`}
//           >
//             {i + 1}
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
import { getPaginatedPosts } from "@/lib/blog"
import { BlogPage } from "@/components/blog/BlogPage"


interface Props {

  params: Promise<{
    locale: "es" | "en"
  }>

  searchParams: Promise<{
    page?: string
    search?: string
  }>

}



export default async function BlogPageList({
  params,
  searchParams
}: Props) {


  const {
    locale
  } = await params



  const query =
    await searchParams



  const page =
    Number(query.page) || 1



  const search =
    query.search || ""



  const {
    posts,
    totalPages

  } = await getPaginatedPosts(
    page,
    locale,
    search
  )



  return (

    <BlogPage

      posts={posts}

      locale={locale}

      totalPages={totalPages}

      currentPage={page}

      search={search}

    />

  )

}