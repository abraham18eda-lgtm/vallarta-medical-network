import { prisma } from "@/lib/prisma"


export async function getMagazines(
  locale: "es" | "en"
) {

  return await prisma.magazine.findMany({

    where: {

      locale,

      isActive: true

    },

    orderBy: {

      createdAt: "desc"

    }

  })

}





export async function getAllMagazines() {

  return await prisma.magazine.findMany({

    orderBy: {

      createdAt: "desc"

    }

  })

}





export async function getMagazineById(
  id: string
) {

  return await prisma.magazine.findUnique({

    where: {

      id

    }

  })

}