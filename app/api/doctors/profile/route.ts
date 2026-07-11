// import { NextResponse, NextRequest } from "next/server"
// import { prisma } from "@/lib/prisma"
// import { verifyToken } from "@/lib/auth"

// function generateSlug(text: string) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
// }

// export async function PUT(req: NextRequest) {
//   try {

//     // auth
//     const token = req.cookies.get("token")?.value
//     const user = token ? await verifyToken(token) : null

//     if (!user || user.role !== "DOCTOR") {
//       return NextResponse.json(
//         { error: "No autorizado" },
//         { status: 401 }
//       )
//     }

//     const body = await req.json()

//     const slug = body.name ? generateSlug(body.name) : undefined

//     const existingDoctor = await prisma.doctor.findUnique({
//       where: { userId: user.id }
//     })
    
//     let doctor
//       if (!existingDoctor) {
//       // crear
//       doctor = await prisma.doctor.create({
//         data: {
//           name: body.name,
//           phone: body.phone,
//           description: body.description,
//           city: body.city,
//           state: body.state,
//           image: body.image,
//           isActive: body.isActive ?? false,
//             ...(slug && { slug }),
//           userId: user.id
//         }
//       })
//     } else {
//       // actualizar
//       doctor = await prisma.doctor.update({
//         where: { userId: user.id },
//         data: {
//           name: body.name,
//           phone: body.phone,
//           description: body.description,
//           city: body.city,
//           state: body.state,
//           image: body.image,

//           isActive: body.isActive ?? existingDoctor.isActive,

//           ...(slug && { slug })
//         }
//       })
//     }
//     console.log("USER:", user)
//     console.log("BODY:", body)
//     console.log("EXISTING:", existingDoctor)

//     return NextResponse.json(doctor)

//   } catch (error) {
//     console.error("ERROR PROFILE:", error)

//     return NextResponse.json(
//       { error: "Error al actualizar perfil" },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken, signToken } from "@/lib/auth"

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export async function PUT(req: NextRequest) {
  try {
    
    // =========================
    // AUTH
    // =========================

    const token = req.cookies.get("token")?.value

    const user = token ? await verifyToken(token) : null

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // =========================
    // BODY
    // =========================

    const body = await req.json()

    // console.log("USER:", user)
    // console.log("BODY:", body)

    // const slug = body.name
    //   ? generateSlug(body.name)
    //   : undefined

    const slug = generateSlug(String(body.name))

    // =========================
    // EXISTING DOCTOR
    // =========================

    const existingDoctor = await prisma.doctor.findUnique({
      where: {
        userId: Number(user.id)
      }
    })
    
    let doctor

    // =========================
    // CREATE
    // =========================

    if (!existingDoctor) {

      doctor = await prisma.doctor.create({
        data: {
          name: body.name,
          phone: body.phone,
          description: body.description,
          city: body.city,
          state: body.state,
          image: body.image,
          slug,
          isActive: true,
          userId: Number(user.id),

          // categorias
          categories: body.categories?.length
            ? {
                create: body.categories.map(
                  (categoryId: string) => ({
                    categoryId
                  })
                )
              }
            : undefined
        },

        include: {
          categories: true
        }
      })

      // =========================
      // UPDATE USER ROLE
      // =========================

      await prisma.user.update({
        where: {
          id: Number(user.id)
        },
        data: {
          role: "DOCTOR"
        }
      })
    }

    // =========================
    // UPDATE
    // =========================

    else {

      // borrar categorias anteriores
      await prisma.doctorCategory.deleteMany({
        where: {
          doctorId: existingDoctor.id
        }
      })

      doctor = await prisma.doctor.update({
        where: {
          userId: Number(user.id)
        },

        data: {
          name: body.name,
          phone: body.phone,
          description: body.description,
          city: body.city,
          state: body.state,
          image: body.image,

          slug,

          isActive: true,

          categories: body.categories?.length
            ? {
                create: body.categories.map(
                  (categoryId: string) => ({
                    categoryId
                  })
                )
              }
            : undefined
        },

        include: {
          categories: true
        }
      })
    }

    // =========================
    // NEW TOKEN
    // =========================

    const newToken = await signToken({
      id: user.id,
      email: user.email,
      role: "DOCTOR"
    })

    // =========================
    // RESPONSE
    // =========================

    const response = NextResponse.json({
      success: true,
      doctor
    })

    response.cookies.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    return response

  } catch (error) {

    console.error("ERROR PROFILE:", error)

    return NextResponse.json(
      {
        error: "Error al actualizar perfil"
      },
      {
        status: 500
      }
    )
  }
}