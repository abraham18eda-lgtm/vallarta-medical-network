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


  const category = await prisma.category.findUnique({
    where:{
      slug
    }
  });


  const doctors = await prisma.doctor.findMany({

    where:{
      categories:{
        some:{
          category:{
            slug
          }
        }
      }
    },

    include:{
      translations:true,

      categories:{
        include:{
          category:true
        }
      }
    }

  });



  return (

    <main className="min-h-screen bg-slate-50">


      <DoctorsList
        locale={locale}
        initialDoctors={doctors}
        initialCategory={slug}
        title={category?.name}
      />


    </main>

  );
}