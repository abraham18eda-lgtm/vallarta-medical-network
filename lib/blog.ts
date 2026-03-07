import { prisma } from "@/lib/prisma"

export async function getPopularPosts() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 6,
  })
}

export async function getNewestPosts() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
     include: { category: true },
  })
}

export async function getAllPosts() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPostAndIncrementViews(slug: string) {
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

export async function getPaginatedPosts(page: number) {
  const pageSize = 9

  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { category: true },
    }),
    prisma.blog.count({
      where: { published: true },
    }),
  ])

  return {
    posts,
    totalPages: Math.ceil(total / pageSize),
  }
}