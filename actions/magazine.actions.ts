"use server"

import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from "cloudinary"
import { redirect } from "next/navigation"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export type MagazineActionState = {
  errors?: {
    title?: string
    url?: string
    coverFile?: string
    description?: string
    edition?: string
    locale?: string
    general?: string
  }

  values?: {
    title: string
    url: string
    description: string
    edition: string
    locale: string
    isFeatured: boolean
    isActive: boolean
  }

  success?: boolean
}


export async function createMagazine(
  prevState: MagazineActionState,
  formData: FormData
): Promise<MagazineActionState> {

  try {

    const title =
      String(
        formData.get("title") || ""
      ).trim()

    const description =
      String(
        formData.get("description") || ""
      ).trim()

    const url =
      String(
        formData.get("url") || ""
      ).trim()

    const edition =
      String(
        formData.get("edition") || ""
      ).trim()

    const locale =
      String(
        formData.get("locale") || "es"
      ).trim()

    const isFeatured =
      formData.get("isFeatured") === "on"

    const isActive =
      formData.get("isActive") === "on"

    const values = {
      title,
      url,
      description,
      edition,
      locale,
      isFeatured,
      isActive
    }
  
   // VALIDAR TÍTULO
    
    if (!title) {
      return {
        errors: {
          title:
            "El título de la revista es obligatorio."
        },
          values
      }
    }

    if (title.length < 3) {
      return {
        errors: {
          title:
            "El título debe tener al menos 3 caracteres."
        },
          values        
      }
    }

   // VALIDAR URL
    
    if (!url) {
      return {
        errors: {
          url:
            "La URL de la revista es obligatoria."
        },
          values
      }
    }


    try {

      new URL(url)

    } catch {

      return {
        errors: {
          url:
            "La URL de la revista no es válida."
        },
          values
      }

    }

   // VALIDAR PORTADA
    
    const file =
      formData.get("coverFile") as File


    if (
      !file ||
      !(file instanceof File) ||
      file.size === 0
    ) {

      return {
        errors: {
          coverFile:
            "La portada de la revista es obligatoria."
        },
          values
      }

    }


    if (
      !file.type.startsWith("image/")
    ) {

      return {
        errors: {
          coverFile:
            "La portada debe ser una imagen."
        },
          values
      }

    }


    const maxSize =
      5 * 1024 * 1024


    if (file.size > maxSize) {

      return {
        errors: {
          coverFile:
            "La imagen no puede superar los 5 MB."
        },
          values
      }

    }

   // CLOUDINARY
    
    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    const base64 =
      `data:${file.type};base64,${buffer.toString("base64")}`

    const upload =
      await cloudinary.uploader.upload(
        base64,
        {
          folder: "magazines"
        }
      )


    const coverImage =
      upload.secure_url

   // PRISMA
    
    await prisma.magazine.create({

      data: {

        title,

        coverImage,

        description:
          description || null,

        url,

        edition:
          edition || null,

        locale,

        isFeatured,

        isActive

      }

    })


    // return {
    //   success: true
    // }


  } catch (error) {

    console.error(
      "Error creando revista:",
      error
    )

    return {
      errors: {
        general:
          "Ocurrió un error al crear la revista."
      }
    }

  }
   redirect("/admin/magazines")
}

export async function updateMagazine(
  id: string,
  prevState: MagazineActionState,
  formData: FormData
): Promise<MagazineActionState> {

  try {

   // DATOS
    
    const title =
      String(
        formData.get("title") || ""
      ).trim()

    const description =
      String(
        formData.get("description") || ""
      ).trim()

    const url =
      String(
        formData.get("url") || ""
      ).trim()

    const edition =
      String(
        formData.get("edition") || ""
      ).trim()

    const locale =
      String(
        formData.get("locale") || "es"
      ).trim()

    const isFeatured =
      formData.get("isFeatured") === "on"

    const isActive =
      formData.get("isActive") === "on"


    const values = {
      title,
      url,
      description,
      edition,
      locale,
      isFeatured,
      isActive
    }


   // VALIDAR ID
    
    if (!id) {

      return {
        errors: {
          general:
            "No se encontró la revista."
        },
        values
      }

    }


   // VALIDAR TÍTULO
    
    if (!title) {

      return {
        errors: {
          title:
            "El título de la revista es obligatorio."
        },
        values
      }

    }


    if (title.length < 3) {

      return {
        errors: {
          title:
            "El título debe tener al menos 3 caracteres."
        },
        values
      }

    }


   // VALIDAR URL
    
    if (!url) {

      return {
        errors: {
          url:
            "La URL de la revista es obligatoria."
        },
        values
      }

    }


    try {

      new URL(url)

    } catch {

      return {
        errors: {
          url:
            "La URL de la revista no es válida."
        },
        values
      }

    }


   // BUSCAR REVISTA
    
    const magazine =
      await prisma.magazine.findUnique({
        where: {
          id
        }
      })


    if (!magazine) {

      return {
        errors: {
          general:
            "La revista no existe."
        },
        values
      }

    }


   // IMAGEN
    
    const file =
      formData.get("coverFile") as File


    let coverImage =
      magazine.coverImage


    // Solo subimos una nueva imagen
    // si el usuario seleccionó una.

    if (
      file &&
      file instanceof File &&
      file.size > 0
    ) {

      // ------------------------------------------
      // VALIDAR TIPO
      // ------------------------------------------

      if (
        !file.type.startsWith("image/")
      ) {

        return {
          errors: {
            coverFile:
              "La portada debe ser una imagen."
          },
          values
        }

      }


      // ------------------------------------------
      // VALIDAR TAMAÑO
      // ------------------------------------------

      const maxSize =
        5 * 1024 * 1024


      if (file.size > maxSize) {

        return {
          errors: {
            coverFile:
              "La imagen no puede superar los 5 MB."
          },
          values
        }

      }


      // ------------------------------------------
      // SUBIR CLOUDINARY
      // ------------------------------------------

      const bytes =
        await file.arrayBuffer()

      const buffer =
        Buffer.from(bytes)

      const base64 =
        `data:${file.type};base64,${buffer.toString("base64")}`


      const upload =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "magazines"
          }
        )


      coverImage =
        upload.secure_url

    }


   // ACTUALIZAR
    
    await prisma.magazine.update({

      where: {
        id
      },

      data: {

        title,
        coverImage,
        description:
          description || null,

        url,
        edition:
          edition || null,

        locale,
        isFeatured,
        isActive

      }

    })

  } catch (error) {

    console.error(
      "Error actualizando revista:",
      error
    )

    return {
      errors: {
        general:
          "Ocurrió un error al actualizar la revista."
      }
    }

  }
  redirect("/admin/magazines")
}

export async function deleteMagazine(
  id: string
) {

  await prisma.magazine.delete({
    where: {
      id
    }
  })

  redirect("/admin/magazines")
}

