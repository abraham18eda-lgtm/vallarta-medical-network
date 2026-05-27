import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

export async function GET() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

   try {
    const doctors = await prisma.doctor.findMany({
      include: {
        categories: {
          include: { category: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })
    
  // return NextResponse.json(doctors)
  return NextResponse.json(doctors)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error cargando doctores" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("BODY:", body) // 🔥 DEBUG

    // 🧠 VALIDACIÓN
    if (!body.name) {
      return NextResponse.json(
        { error: "Nombre requerido" },
        { status: 400 }
      )
    }

    // CREAR DOCTOR
    const doctor = await prisma.doctor.create({
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/\s+/g, "-"),

        city: body.city || "",
        state: body.state || "",

        email: body.email || "",
        phone: body.phone || "",

        image: body.image || "",
        description: body.description || "",
        
        userId: body.userId,
        isActive: true
      }
    })

    // 🔥 CREAR RELACIÓN CON CATEGORÍA
    if (body.categories?.length) {
      await prisma.doctorCategory.createMany({
        data: body.categories.map((catId: string) => ({
          doctorId: doctor.id,
          categoryId: catId
        }))
      })
    }

    return NextResponse.json(doctor)

  } catch (error) {
    console.error("ERROR:", error)

    return NextResponse.json(
      { error: "Error creando doctor" },
      { status: 500 }
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