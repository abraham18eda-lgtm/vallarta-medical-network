import DoctorsList from "@/components/home/DoctorsList";
import { prisma } from "@/lib/prisma";


type Props = {
  params: Promise<{
    locale: "es" | "en";
    slug: string;
  }>;
};


export default async function EspecialidadPage({ params }: Props) {

  const { locale, slug } = await params;

  const categoryTranslation = await prisma.categoryTranslation.findUnique({
    where: {
      slug_locale: {
        slug,
        locale,
      },
    },
    include: {
      category: true,
    },
  });

  if (!categoryTranslation) {
    return null;
  }

  const categoryId = categoryTranslation.categoryId;

   const doctors = await prisma.doctor.findMany({
    where: {
      isActive: true,

      categories: {
        some: {
          categoryId,
        },
      },

      translations: {
        some: {
          locale,
        },
      },
    },

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
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });



  return (

    <main className="min-h-screen bg-slate-50">
      <DoctorsList
        locale={locale}
        initialDoctors={doctors}
        initialCategory={slug}
        title={categoryTranslation?.name}
      />
    </main>

  );
}