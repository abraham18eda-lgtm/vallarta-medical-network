import { prisma } from "@/lib/prisma"

export async function getPopularPosts(locale: "es" | "en") {
  return prisma.blog.findMany({
    where: { published: true, locale },
    orderBy: { views: "desc" },
    include: { category: true },
    take: 8,
  })
}

export async function getNewestPosts(locale: "es" | "en") {
  // console.log("Locale recibido:", locale)
  return prisma.blog.findMany({
    where: { published: true, locale },
    orderBy: { createdAt: "desc" },
    take: 3,
     include: { category: true },
  })
}

export async function getAllPosts(locale: "es" | "en") {
  return prisma.blog.findMany({
    where: { published: true, locale },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPostAndIncrementViews(slug: string) {
  if (!slug) return null;
  return prisma.blog.update({
    where: { slug },
    data: {
      views: { increment: 1 },
    },
        include: {
      category: true, //
    },
  })
}

// export async function getPaginatedPosts(page: number,  locale: "es" | "en") {
//   const pageSize = 9

//   const [posts, total] = await Promise.all([
//     prisma.blog.findMany({
//       where: { published: true, locale },
//       orderBy: { createdAt: "desc" },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//       include: { category: true },
//     }),
//     prisma.blog.count({
//       where: { published: true, locale, },
//     }),
//   ])

//   return {
//     posts,
//     totalPages: Math.ceil(total / pageSize),
//   }
// }

export async function getPaginatedPosts(
  page: number,
  locale: "es" | "en",
  search: string = ""
) {

  const pageSize = 12


  const where = {

    published: true,

    locale,


    ...(search && {

      OR: [

        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },

        {
          excerpt: {
            contains: search,
            mode: "insensitive" as const,
          },
        },

      ],

    }),

  }


  const [posts, total] =
    await Promise.all([

      prisma.blog.findMany({

        where,

        orderBy: {
          createdAt: "desc",
        },

        skip:
          (page - 1) * pageSize,

        take: pageSize,

        include: {
          category: true,
        },

      }),


      prisma.blog.count({
        where,
      }),

    ])



  return {

    posts,

    totalPages:
      Math.ceil(total / pageSize),

  }

}