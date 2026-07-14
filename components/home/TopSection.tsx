import { prisma } from "@/lib/prisma";
import TopSelector from "@/components/ui/TopSelector"


interface Props {
  locale: string;
  dict: any;
}

export default async function TopSection({
  locale,
  dict,
}: Props) {
  const doctors = await prisma.homeFeatured.findMany({
    where: {
      type: "doctor",
    },
    take: 3,
    orderBy: {
      order: "asc",
    },
    include: {
      doctor: true,
    },
  });

  const clinics = await prisma.place.findMany({
    where: {
      type: "CLINIC",
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  const dentals = await prisma.place.findMany({
    where: {
      type: "DENTAL",
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  const Oftalmologies = await prisma.place.findMany({
    where: {
      type: "OFTALMOLOGY",
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="py-2">
      <TopSelector
        doctors={doctors}
        clinics={clinics}
        dentals={dentals}
        Oftalmologies={Oftalmologies}
        locale={locale}
        dict={dict}
      />
    </section>
  );
}