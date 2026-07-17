import { prisma } from "@/lib/prisma";

interface GetFaqsParams {
  page?: number;
  limit?: number;
  search?: string;
  locale?: string;
}

export async function getFaqs({
  page = 1,
  limit = 10,
  search = "",
  locale = "",
}: GetFaqsParams) {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        {
          question: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          answer: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(locale && { locale }),
  };

  const faqs = await prisma.faq.findMany({
    where,
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    skip,
    take: limit,
  });

  const total = await prisma.faq.count({
    where,
  });

  return {
    faqs,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getFaq(id: string) {
  return prisma.faq.findUnique({
    where: {
      id,
    },
  });
}