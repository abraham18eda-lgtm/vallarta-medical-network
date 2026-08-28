import { prisma } from "@/lib/prisma";

export async function getFeaturedCategories(
  locale: string,
  limit = 8
) {
  return prisma.category.findMany({
    where: {
      type: "DOCTOR",
      doctors: {
        some: {
          doctor: {
            isActive: true,
            translations: {
              some: {
                locale,
              },
            },
          },
        },
      },
      translations: {
        some: {
          locale,
        },
      },
    },
    select: {
      id: true,
      translations: {
        where: {
          locale,
        },
        select: {
          name: true,
          slug: true,
        },
      },
      _count: {
       select: {
          doctors: {
            where: {
              doctor: {
                isActive: true,
                translations: {
                  some: {
                    locale,
                  },
                },
              },
            },
          },
        },
      },
    },
    take: limit,
  });
}
