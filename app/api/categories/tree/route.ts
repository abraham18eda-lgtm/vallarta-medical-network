import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany({
//       where: {
//         parentId: null,
//         type: "DOCTOR" // 🔥 SOLO categorías de doctores
//       },
//       orderBy: {
//         name: "asc"
//       },
//       include: {
//         children: {
//           where: {
//             type: "DOCTOR" // 🔥 SOLO subcategorías de doctores
//           },
//           orderBy: {
//             name: "asc"
//           }
//         }
//       }
//     })

//     return NextResponse.json(categories)
//   } catch (error) {
//     console.error("Error loading categories:", error)

//     return NextResponse.json(
//       { error: "Error al cargar categorías" },
//       { status: 500 }
//     )
//   }
// }

export async function GET() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
      type: "DOCTOR" // 🔥 SOLO DOCTORES
    },
    include: {
      children: true
    }
  })

  return NextResponse.json(categories)
}