"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteMagazine(
  id: string
) {

  await prisma.magazine.delete({
    where: {
      id
    }
  })

  revalidatePath("/admin/magazines")
}
