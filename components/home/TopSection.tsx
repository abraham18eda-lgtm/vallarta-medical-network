import { prisma } from "@/lib/prisma";
import TopSelector from "@/components/ui/TopSelector"


interface Props {
  locale: "es" | "en";
  dict: any;
}

export default async function TopSection({
  locale,
  dict,
}: Props) {
  
  const doctors = await prisma.homeFeatured.findMany({
    where: {
      type: "doctor",
      doctor: {
        isActive: true,
        translations: {
          some: {
            locale,
          },
        },
      },
    },
    take: 3,
    orderBy: {
      order: "asc",
    },
    include: {
      doctor: {
        include: {
          translations: {
            where: {
              locale,
            },
          },

          categories: {
            include: {
              category: {
                include: {
                 translations: {
                    where: {
                      locale,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  
  const clinics = await prisma.place.findMany({
    where: {
      type: "CLINIC",
      isActive: true,
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  const dentals = await prisma.place.findMany({
    where: {
      type: "DENTAL",
       isActive: true,
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  const Oftalmologies = await prisma.place.findMany({
    where: {
      type: "OFTALMOLOGY",
      isActive: true,
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
        oftalmologies={Oftalmologies}
        locale={locale}
        dict={dict}
      />
    </section>
  );
}