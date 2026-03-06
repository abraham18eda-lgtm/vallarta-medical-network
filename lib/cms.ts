import { prisma } from './prisma';

export async function getCMSBlocks( locale: string,
  type: string) {
  
  const now = new Date();
  // console.log('getCMSBlocks:', typeof getCMSBlocks);
  return prisma.block.findFirst({
    where: {
      locale,
      type,
      OR: [
        { startAt: null, endAt: null },
        {
          startAt: { lte: now },
          endAt: { gte: now },
        },
      ],
    },
    orderBy: {
      order: 'asc',
    },
  });
}