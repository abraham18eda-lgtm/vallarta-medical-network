import { prisma } from "./prisma"

export async function getCMSBlocks(
  locale: string,
  type: string
) {
  const now = new Date()

  return prisma.block.findFirst({
    where: {
      locale,
      type,
      isActive: true,

      AND: [
        {
          OR: [
            { startAt: null },
            { startAt: { lte: now } },
          ],
        },
        {
          OR: [
            { endAt: null },
            { endAt: { gte: now } },
          ],
        },
      ],
    },

    orderBy: {
      order: "asc",
    },
  })
}