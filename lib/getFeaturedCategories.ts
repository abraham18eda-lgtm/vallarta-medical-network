import { prisma } from "@/lib/prisma";

export async function getFeaturedCategories(limit = 8) {
  return prisma.category.findMany({
    where: {
      type: "DOCTOR",
      doctors: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          doctors: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    take: limit,
  });
}