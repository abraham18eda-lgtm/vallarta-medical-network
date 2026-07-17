import { prisma } from "@/lib/prisma";


export async function getActiveFaqs(
  locale = "es"
) {

  return await prisma.faq.findMany({

    where: {

      locale,

      isActive: true,

      AND: [
        {
          OR:[
            {
              startAt:null
            },
            {
              startAt:{
                lte:new Date()
              }
            }
          ]
        },
        {
          OR:[
            {
              endAt:null
            },
            {
              endAt:{
                gte:new Date()
              }
            }
          ]
        }
      ]

    },

    orderBy:{
      order:"asc"
    }

  });

}