import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"


export async function GET() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }


  try {

    const doctors = await prisma.doctor.findMany({
      include: {
        translations: true,
        categories: {
          include:{
            category:true
          }
        },
        homeFeatured:true
      },
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(doctors)

  } catch(error){
    console.error(error)
    return NextResponse.json(
      {
        error:"Error cargando doctores"
      },
      {
        status:500
      }
    )
  }
}




export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token)
    : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const EMAIL_REGEX =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    const PHONE_REGEX =
      /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}(?:\s ext\. \d{1,6})?$/

    const body = await req.json()

    const email =
      body.email?.trim()

    const name =
      body.translation?.name?.trim()

    const phone =
      body.phone?.trim()

    const locale =
      body.translation?.locale

    if (!name) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio" },
        { status: 400 }
      )
    }

    if (!locale) {
      return NextResponse.json(
        { error: "El idioma es obligatorio" },
        { status: 400 }
      )
    }

    if (name.length < 3) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 3 caracteres" },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "El email no tiene un formato válido" },
        { status: 400 }
      )
    }

    if (!body.slug) {
      return NextResponse.json(
        { error: "El slug es obligatorio" },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        {
          error: "El teléfono es obligatorio"
        },
        { status: 400 }
      )
    }

    if (!PHONE_REGEX.test(phone)) {

      return NextResponse.json(
        {
          error: "El teléfono no tiene un formato válido"
        },
        { status: 400 }
      )
    }

    if (!locale) {
      return NextResponse.json(
        {
          error: "El idioma es obligatorio"
        },
        { status: 400 }
      )
    }

    const existingDoctor =
      await prisma.doctor.findUnique({
        where: {
          slug: body.slug
        }
      })

    if (existingDoctor) {
      return NextResponse.json(
        {
          error:
            "Ya existe un doctor con ese nombre"
        },
        {
          status: 400
        }
      )
    }


    if (!body.categories?.length) {
      return NextResponse.json(
        { error: "Debes seleccionar una especialidad" },
        { status: 400 }
      )
    }




    const existingUser = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(existingUser){
      return NextResponse.json(
        {
          error:"Ese email ya existe"
        },
        {
          status:400
        }
      )
    }



    const tempPassword =
      Math.random()
      .toString(36)
      .slice(-8)


    const hashedPassword =
      await bcrypt.hash(
        tempPassword,
        10
      )



    // CREAR USUARIO

    const user =
      await prisma.user.create({

        data:{
          email,
          password:hashedPassword,
          role:"DOCTOR"
        }

      })


    // CREAR DOCTOR

    const doctor =
      await prisma.doctor.create({

        data: {
          name: body.translation.name,
          slug: body.slug,

          userId: user.id,

          email: body.email,
          phone: body.phone?.trim() || null,
          image: body.image || null,

          description:
            body.translation?.description?.trim() || null,

          city:
            body.translation?.city?.trim() || null,

          state:
            body.translation?.state?.trim() || null,

          isActive:
            body.isActive ?? true,

          translations:{

            create: {
              locale:
                body.translation.locale,

              name:
                body.translation.name,

              description:
                body.translation?.description?.trim() || null,

              city:
                body.translation?.city?.trim() || null,

              state:
                body.translation?.state?.trim() || null
            }

          }

        }

      })




    // CATEGORÍAS
    if (body.categories?.length) {
      await prisma.doctorCategory.createMany({
        data: body.categories.map((categoryId: string) => ({
          doctorId: doctor.id,
          categoryId
        }))
      })
    }


    // HOME FEATURED
    if(body.featuredHome){

      const last =
        await prisma.homeFeatured.findFirst({
          orderBy:{
            order:"desc"
          }
        })


      await prisma.homeFeatured.create({
        data:{
          type:"doctor",

          doctorId:
          doctor.id,

          order:
          (last?.order ?? 0)+1

        }
      })

    }




    return NextResponse.json({
      doctor,
      tempPassword

    })


  } catch(error){
    console.error(
      "ERROR:",
      error
    )


    return NextResponse.json(
      {
        error:"Error creando doctor"
      },
      {
        status:500
      }
    )

  }

}


// import { prisma } from "@/lib/prisma"
// import { NextResponse } from "next/server"

// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   // const { id } = params

// //   const doctor = await prisma.doctor.findUnique({
// //     where: {
// //       id: params.id
// //     },
// //     select: {
// //       id: true,
// //       name: true,
// //       email: true,
// //       phone: true,
// //       city: true,
// //       state: true,
// //       description: true,
// //       image: true
// //     }
// //   })

// //   if (!doctor) {
// //     return NextResponse.json({ error: "Doctor no encontrado" }, { status: 404 })
// //   }

// //   return NextResponse.json(doctor)
// // }
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {

//   try {

//     const doctor =
//       await prisma.doctor.findUnique({

//         where: {
//           id: params.id
//         },

//         select: {
//           id: true,
//           name: true,
//           email: true,
//           phone: true,
//           city: true,
//           state: true,
//           description: true,
//           image: true
//         }
//       })

//     if (!doctor) {

//       return NextResponse.json(
//         {
//           error:
//             "Doctor no encontrado"
//         },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       doctor
//     )

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       {
//         error:
//           "Error obteniendo doctor"
//       },
//       { status: 500 }
//     )
//   }
// }


// export async function PUT(
//   req: Request,
//    { params }: { params: { id: string } }
// ) {
//   try {
//     // const { id } = await context.params
//     const body = await req.json()

//     // console.log("UPDATE DOCTOR:", id, body)

//     // actualizar doctor
//     const updatedDoctor = await prisma.doctor.update({
//       where: {
//         id: params.id
//       },
//       data: {
//         name: body.name,
//         email: body.email,
//         phone: body.phone,
//         city: body.city,
//         state: body.state,
//         description: body.description,
//         image: body.image
//       }
//     })

//     // eliminar relaciones anteriores
//     await prisma.doctorCategory.deleteMany({
//       where: {
//         doctorId: params.id
//       }
//     })

//     // crear nuevas relaciones
//     if (body.categories?.length) {
//       await prisma.doctorCategory.createMany({
//         data: body.categories.map((catId: string) => ({
//           doctorId:  params.id,
//           categoryId: catId
//         }))
//       })
//     }

//     return NextResponse.json(updatedDoctor)

//   } catch (error) {
//     console.error("ERROR UPDATE:", error)

//     return NextResponse.json(
//       { error: "Error actualizando doctor" },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params

//     console.log("DELETE DOCTOR:", id)

//     // 1️⃣ eliminar relaciones
//     await prisma.doctorCategory.deleteMany({
//       where: { doctorId: id }
//     })

//     // 2️⃣ eliminar doctor
//     await prisma.doctor.delete({
//       where: { id }
//     })

//     return NextResponse.json({ success: true })

//   } catch (error) {
//     console.error("DELETE ERROR:", error)

//     return NextResponse.json(
//       { error: "Error eliminando doctor" },
//       { status: 500 }
//     )
//   }
// }
// //12
// import { prisma } from "@/lib/prisma"
// import { NextResponse } from "next/server"

// export async function GET(
//   req: Request,
//   { params }: {
//     params: Promise<{ id: string }>
//   }
// ) {

//   try {

//     const { id } = await params

//     const doctor =
//       await prisma.doctor.findUnique({

//         where: { id },

//         select: {
//           id: true,
//           name: true,
//           email: true,
//           phone: true,
//           city: true,
//           state: true,
//           image: true,
//           description: true,

//           categories: {
//             include: {
//               category: true
//             }
//           }
//         }
//       })

//     if (!doctor) {

//       return NextResponse.json(
//         { error: "Doctor no encontrado" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(doctor)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Error cargando doctor" },
//       { status: 500 }
//     )
//   }
// }

// export async function PUT(
//   req: Request,
//   { params }: {
//     params: Promise<{ id: string }>
//   }
// ) {

//   try {

//     const { id } = await params

//     const body = await req.json()

//     const updatedDoctor =
//       await prisma.doctor.update({

//         where: { id },

//         data: {

//           name: body.name,
//           email: body.email,
//           phone: body.phone,
//           city: body.city,
//           state: body.state,
//           image: body.image,
//           description: body.description
//         }
//       })

//     return NextResponse.json(
//       updatedDoctor
//     )

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Error actualizando doctor" },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: {
//     params: Promise<{ id: string }>
//   }
// ) {

//   try {

//     const { id } = await params

//     await prisma.doctor.delete({
//       where: { id }
//     })

//     return NextResponse.json({
//       success: true
//     })

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Error eliminando doctor" },
//       { status: 500 }
//     )
//   }
// }