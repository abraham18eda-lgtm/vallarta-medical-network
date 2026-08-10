"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"



export async function createMagazine(data: {

  title: string
  coverImage: string
  description?: string
  url: string
  edition?: string
  isFeatured?: boolean

}) {


  await prisma.magazine.create({

    data: {

      title: data.title,

      coverImage: data.coverImage,

      description: data.description || null,

      url: data.url,

      edition: data.edition || null,

      isFeatured: data.isFeatured ?? false,

      isActive: true

    }

  })


  revalidatePath("/admin/revistas")

  revalidatePath("/revistas")

}




export async function updateMagazine(
  id: string,
  data: {

    title: string
    coverImage: string
    description?: string
    url: string
    edition?: string
    isFeatured?: boolean
    isActive?: boolean

  }
) {


  await prisma.magazine.update({

    where: {
      id
    },

    data: {

      title: data.title,

      coverImage: data.coverImage,

      description: data.description || null,

      url: data.url,

      edition: data.edition || null,

      isFeatured: data.isFeatured ?? false,

      isActive: data.isActive ?? true

    }

  })


  revalidatePath("/admin/revistas")

  revalidatePath("/revistas")

}




export async function deleteMagazine(
  id:string
) {


  await prisma.magazine.delete({

    where:{
      id
    }

  })


  revalidatePath("/admin/revistas")

  revalidatePath("/revistas")

}