import { prisma } from "@/lib/prisma"


export async function getDoctorByUserId(
  userId: number
) {

  const doctor = await prisma.doctor.findUnique({

    where: {
      userId
    },

    select: {
      id: true,
      name: true,
      image: true,
      city: true,
      description: true,
      email: true,
      phone: true
    }

  })


  return doctor

}