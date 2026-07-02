import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.homeFeatured.findMany({
    orderBy: { order: "asc" },
    include: {
      doctor: true,
      place: true,
    },
  });

  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  // body = [{ order, type, id }]

  // borramos configuración anterior
  await prisma.homeFeatured.deleteMany();

  await prisma.homeFeatured.createMany({
    data: body.map((item: any) => ({
      order: item.order,
      type: item.type,
      doctorId: item.type === "doctor" ? item.id : null,
      placeId: item.type === "place" ? item.id : null,
    })),
  });

  return Response.json({ ok: true });
}