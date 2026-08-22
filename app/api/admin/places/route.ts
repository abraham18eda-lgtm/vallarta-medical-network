import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { placeSchema } from "@/lib/validations/place"

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET() {

  try {

    const places =
      await prisma.place.findMany({

        include: {

          doctors: {
            include: {
              doctor: true
            }
          },

          categories: {
            include: {
              category: true
            }
          },

          treatments: {
            include: {
              treatment: true
            }
          }

        },

        orderBy: {
          createdAt: "desc"
        }

      })

    return NextResponse.json(places)

  } catch (error) {

    console.error(
      "GET /api/admin/places:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Error cargando los places"
      },
      {
        status: 500
      }
    )

  }

}

// export async function POST(req: Request) {

//   try {

//     const body = await req.json()

//   // VALIDACIÓN ZOD
    
//     const result =
//       placeSchema.safeParse(body)

//     if (!result.success) {

//       return NextResponse.json(
//         {
//           error: "Datos inválidos",

//           fields:
//             result.error.flatten()
//               .fieldErrors
//         },
//         {
//           status: 400
//         }
//       )
//     }

//     const data = result.data


//   // SLUG
    
//     const slug =
//       slugify(data.name)


//   // SLUG DUPLICADO
    
//     const existingPlace =
//       await prisma.place.findUnique({
//         where: {
//           slug
//         }
//       })

//     if (existingPlace) {

//       return NextResponse.json(
//         {
//           error:
//             "Ya existe un place con ese nombre"
//         },
//         {
//           status: 409
//         }
//       )
//     }


//   // VALIDAR DOCTORES
    
//     if (data.doctorIds.length > 0) {

//       const doctors =
//         await prisma.doctor.findMany({

//           where: {
//             id: {
//               in: data.doctorIds
//             }
//           },

//           select: {
//             id: true
//           }

//         })

//       if (
//         doctors.length !==
//         data.doctorIds.length
//       ) {

//         return NextResponse.json(
//           {
//             error:
//               "Uno o más doctores seleccionados no existen"
//           },
//           {
//             status: 400
//           }
//         )
//       }
//     }


//   // VALIDAR CATEGORÍAS
    
//     if (data.categoryIds.length > 0) {

//       const categories =
//         await prisma.category.findMany({

//           where: {

//             id: {
//               in: data.categoryIds
//             },

//             type: "PLACE"

//           },

//           select: {
//             id: true
//           }

//         })

//       if (
//         categories.length !==
//         data.categoryIds.length
//       ) {

//         return NextResponse.json(
//           {
//             error:
//               "Una o más categorías seleccionadas no son válidas"
//           },
//           {
//             status: 400
//           }
//         )
//       }
//     }


//   // VALIDAR TRATAMIENTOS
    
//     if (data.treatmentIds.length > 0) {

//       const treatments =
//         await prisma.treatment.findMany({

//           where: {
//             id: {
//               in: data.treatmentIds
//             }
//           },

//           select: {
//             id: true
//           }

//         })

//       if (
//         treatments.length !==
//         data.treatmentIds.length
//       ) {

//         return NextResponse.json(
//           {
//             error:
//               "Uno o más tratamientos seleccionados no son válidos"
//           },
//           {
//             status: 400
//           }
//         )
//       }
//     }


//   // TRANSACTION
    
//     const place =
//       await prisma.$transaction(
//         async (tx) => {

//           // ===================================
//           // CREAR PLACE
//           // ===================================

//           const createdPlace =
//             await tx.place.create({

//               data: {

//                 name:
//                   data.name,

//                 slug,

//                 type:
//                   data.type,

//                 description:
//                   data.description || null,

//                 city:
//                   data.city || null,

//                 state:
//                   data.state || null,

//                 address:
//                   data.address || null,

//                 postalCode:
//                   data.postalCode || null,

//                 phone:
//                   data.phone || null,

//                 phone2:
//                   data.phone2 || null,

//                 mobile:
//                   data.mobile || null,

//                 email:
//                   data.email || null,

//                 website:
//                   data.website || null,

//                 facebook:
//                   data.facebook || null,

//                 instagram:
//                   data.instagram || null,

//                 youtube:
//                   data.youtube || null,

//                 twitter:
//                   data.twitter || null,

//                 image:
//                   data.image || null,

//                 locale:
//                   data.locale,

//                 isActive:
//                   data.isActive,

//                 showInNavbar:
//                   data.showInNavbar,

//                 navbarOrder:
//                   data.navbarOrder ?? null

//               }

//             })


//           // ===================================
//           // DOCTORES
//           // ===================================

//           if (
//             data.doctorIds.length > 0
//           ) {

//             await tx.doctorPlace.createMany({

//               data:
//                 data.doctorIds.map(
//                   doctorId => ({
//                     doctorId,
//                     placeId:
//                       createdPlace.id
//                   })
//                 )

//             })
//           }


//           // ===================================
//           // CATEGORÍAS
//           // ===================================

//           if (
//             data.categoryIds.length > 0
//           ) {

//             await tx.placeCategory.createMany({

//               data:
//                 data.categoryIds.map(
//                   categoryId => ({
//                     categoryId,
//                     placeId:
//                       createdPlace.id
//                   })
//                 )

//             })
//           }


//           // ===================================
//           // TRATAMIENTOS
//           // ===================================

//           if (
//             data.treatmentIds.length > 0
//           ) {

//             await tx.placeTreatment.createMany({

//               data:
//                 data.treatmentIds.map(
//                   treatmentId => ({
//                     treatmentId,
//                     placeId:
//                       createdPlace.id
//                   })
//                 )

//             })
//           }


//           return createdPlace
//         }
//       )


//   // RESPONSE
    
//     return NextResponse.json(
//       {
//         message:
//           "Place creado correctamente",

//         place
//       },
//       {
//         status: 201
//       }
//     )

//   } catch (error) {

//     console.error(
//       "POST /api/admin/places:",
//       error
//     )

//     return NextResponse.json(
//       {
//         error:
//           "Error interno al crear el place"
//       },
//       {
//         status: 500
//       }
//     )
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json()

  // VALIDAR DATOS
    
    const result = placeSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          fields: result.error.flatten().fieldErrors
        },
        {
          status: 400
        }
      )
    }
    
    const data = result.data

    console.log("CATEGORY IDS:", data.categoryIds)
console.log("TREATMENT IDS:", data.treatmentIds)
console.log("DOCTOR IDS:", data.doctorIds)
console.log("CATEGORY IDS:", data.categoryIds)
  // GENERAR SLUG
    
    const slug = slugify(data.name)

  // VALIDAR SLUG DUPLICADO
    
    const existingPlace = await prisma.place.findUnique({
      where: {
        slug
      }
    })

    if (existingPlace) {
      return NextResponse.json(
        {
          error: "Ya existe un establecimiento con ese nombre"
        },
        {
          status: 409
        }
      )
    }

  // VALIDAR DOCTORES
    
    if (data.doctorIds.length > 0) {
      const uniqueDoctorIds = [
        ...new Set(data.doctorIds)
      ]

      const doctors = await prisma.doctor.findMany({
        where: {
          id: {
            in: uniqueDoctorIds
          }
        },
        select: {
          id: true
        }
      })

      if (doctors.length !== uniqueDoctorIds.length) {
        return NextResponse.json(
          {
            error:
              "Uno o más doctores seleccionados no existen"
          },
          {
            status: 400
          }
        )
      }
    }

  // VALIDAR CATEGORÍAS
    
    if (data.categoryIds.length > 0) {
      const uniqueCategoryIds = [
        ...new Set(data.categoryIds)
      ]

      const categories = await prisma.category.findMany({
        where: {
          id: {
            in: uniqueCategoryIds
          },
          type: "PLACE"
        },
        select: {
          id: true
        }
      })

      if (categories.length !== uniqueCategoryIds.length) {
        return NextResponse.json(
          {
            error:
              "Una o más categorías seleccionadas no son válidas"
          },
          {
            status: 400
          }
        )
      }
    }

  // VALIDAR TRATAMIENTOS
    
    if (data.treatmentIds.length > 0) {
      const uniqueTreatmentIds = [
        ...new Set(data.treatmentIds)
      ]

      const treatments = await prisma.treatment.findMany({
        where: {
          id: {
            in: uniqueTreatmentIds
          }
        },
        select: {
          id: true
        }
      })

      if (treatments.length !== uniqueTreatmentIds.length) {
        return NextResponse.json(
          {
            error:
              "Uno o más tratamientos seleccionados no son válidos"
          },
          {
            status: 400
          }
        )
      }
    }

  // CREAR TODO EN UNA TRANSACCIÓN
    
    const place = await prisma.$transaction(
      async (tx) => {
        
        // PLACE
        

        const createdPlace = await tx.place.create({
          data: {
            name: data.name,
            slug,
            type: data.type,

            description: data.description || null,

            city: data.city || null,
            state: data.state || null,
            address: data.address || null,
            postalCode: data.postalCode || null,

            phone: data.phone || null,
            phone2: data.phone2 || null,
            mobile: data.mobile || null,

            email: data.email || null,

            website: data.website || null,
            facebook: data.facebook || null,
            instagram: data.instagram || null,
            youtube: data.youtube || null,
            twitter: data.twitter || null,

            image: data.image || null,

            locale: data.locale,
            isActive: data.isActive,
            showInNavbar: data.showInNavbar,
            navbarOrder: data.navbarOrder ?? null
          }
        })

        
        // DOCTORES
        

        if (data.doctorIds.length > 0) {
          await tx.doctorPlace.createMany({
            data: data.doctorIds.map((doctorId) => ({
              doctorId,
              placeId: createdPlace.id
            })),
            skipDuplicates: true
          })
        }

        
        // CATEGORÍAS
        

        if (data.categoryIds.length > 0) {
          await tx.placeCategory.createMany({
            data: data.categoryIds.map((categoryId) => ({
              categoryId,
              placeId: createdPlace.id
            })),
            skipDuplicates: true
          })
        }

        
        // TRATAMIENTOS
        

        if (data.treatmentIds.length > 0) {
          await tx.placeTreatment.createMany({
            data: data.treatmentIds.map((treatmentId) => ({
              treatmentId,
              placeId: createdPlace.id
            })),
            skipDuplicates: true
          })
        }

        return createdPlace
      }
    )

  // RESPUESTA
    
    return NextResponse.json(
      {
        message: "Place creado correctamente",
        place
      },
      {
        status: 201
      }
    )

  } catch (error) {
    console.error(
      "POST /api/admin/places:",
      error
    )

    return NextResponse.json(
      {
        error: "Error interno al crear el place"
      },
      {
        status: 500
      }
    )
  }
}

