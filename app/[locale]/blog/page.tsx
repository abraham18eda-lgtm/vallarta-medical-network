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



  const query = await searchParams
  const page = Number(query.page) || 1
  const search = query.search || ""

  const { posts, totalPages } = await getPaginatedPosts(
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