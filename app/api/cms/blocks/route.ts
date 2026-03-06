import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const block = await prisma.block.create({
    data: {
      type: body.type,
      data: body.data,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(block);
}