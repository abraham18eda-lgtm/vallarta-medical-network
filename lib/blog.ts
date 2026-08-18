import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

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

export async function getPost(
  slug: string,
  locale: "es" | "en"
) {
  if (!slug) return null

  return prisma.blog.findFirst({
    where: {
      slug,
      locale,
      published: true,
      isActive: true,
    },
    include: {
      category: true,
    },
  })
}

export async function getTranslatedPost(
  translationGroup: string | null,
  locale: "es" | "en"
) {
  if (!translationGroup) return null
  
  return prisma.blog.findFirst({
    where: {
      translationGroup,
      locale,
      published: true,
      isActive: true,
    },
    include: {
      category: true,
    },
  })
}

export async function getPostTranslation(
  translationGroup: string | null,
  currentLocale: "es" | "en"
) {
  if (!translationGroup) return null

  const targetLocale =
    currentLocale === "es" ? "en" : "es"

  return prisma.blog.findFirst({
    where: {
      translationGroup,
      locale: targetLocale,
      published: true,
      isActive: true,
    },
    select: {
      id: true,
      slug: true,
      locale: true,
      translationGroup: true,
    },
  })
}

// export async function getPost(slug: string) {

//   if (!slug) return null

//   return prisma.blog.findUnique({
//     where:{
//       slug
//     },
//     include:{
//       category:true
//     }
//   })
// }

export async function getFeaturedPosts(locale: "es" | "en") {
  return prisma.blog.findMany({
    where: {
      published: true,
      isActive: true,
      featured: true,
      locale,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    take: 8,
  })
}

export async function getRelatedPosts(
  categoryId: string | null,
  locale: "es" | "en",
  currentId: number
) {
  if (!categoryId) return []

  return prisma.blog.findMany({
    where: {
      locale,
      published: true,
      isActive: true,
      categoryId,
      id: {
        not: currentId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    take: 3,
  })
}


export async function getAdjacentPosts(
  locale: "es" | "en",
  currentDate: Date,
  currentId: number
) {
  const previous = await prisma.blog.findFirst({
    where: {
      locale,
      published: true,
      isActive: true,
      id: {
        not: currentId,
      },
      createdAt: {
        lt: currentDate,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const next = await prisma.blog.findFirst({
    where: {
      locale,
      published: true,
      isActive: true,
      id: {
        not: currentId,
      },
      createdAt: {
        gt: currentDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return {
    previous,
    next,
  }
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