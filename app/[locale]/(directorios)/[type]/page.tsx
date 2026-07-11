import { prisma } from "@/lib/prisma";
import PlacesList from "@/components/places/PlacesList";
import DoctorsList from "@/components/home/DoctorsList";

import {
  normalizeDirectoryType,
  type DirectoryType,
} from "@/lib/directoryRoutes";

import { PlaceType } from "@prisma/client";


export default async function DirectoryPage({
  params,
}: {
  params: Promise<{ locale: string; type: string  }>;
}) {

  const { locale, type } = await params;


  const directoryType = normalizeDirectoryType(type);


  if (!directoryType) {
    return (
      <div className="p-10">
        Tipo inválido: {type}
      </div>
    );
  }



  /*
    ============================
    DIRECTORIO DE DOCTORES
    ============================
  */

  if (directoryType === "doctor") {


    const doctors = await prisma.doctor.findMany({

      where: {
        isActive: true,
      },


      include: {
        categories: {
          include: {
            category: true,
          },
        },

        places: {
          include: {
            place: true,
          },
        },
      },


      orderBy: {
        createdAt: "desc",
      },

    });



    return (
      <DoctorsList
        locale={locale as "es" | "en"}
        initialDoctors={doctors}
        title="Doctores"
      />
    );
  }





  /*
    ============================
    DIRECTORIO DE LUGARES
    ============================
  */


  const placeMap: Record<
    Exclude<DirectoryType, "doctor">,
    PlaceType
  > = {

    clinic: PlaceType.CLINIC,

    dental: PlaceType.DENTAL,

    hospital: PlaceType.HOSPITAL,

    laboratory: PlaceType.LAB,

  };



  const prismaType = placeMap[directoryType];



  const titleMap: Record<
    Exclude<DirectoryType, "doctor">,
    string
  > = {

    clinic: "Clínicas",

    dental: "Clínicas dentales",

    hospital: "Hospitales",

    laboratory: "Laboratorios",

  };



  const places = await prisma.place.findMany({

    where: {
      type: prismaType,
      isActive: true,
    },


    include: {

      doctors: {
        include: {
          doctor: true,
        },
      },


      categories: {
        include: {
          category: true,
        },
      },

    },


    orderBy: {
      createdAt: "desc",
    },

  });



  const categories = await prisma.category.findMany({

    where: {

      OR: [
        {
          type: "DOCTOR",
        },
        {
          type: "PLACE",
        },
      ],

    },


    orderBy: {
      name: "asc",
    },


    take: 8,

  });



  return (

    <PlacesList
      initialPlaces={places}
      categories={categories}
      title={titleMap[directoryType]}
    />

  );
}