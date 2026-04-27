import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"


export async function GET() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token ? await verifyToken(token) : null

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // const doctors = await prisma.doctor.findMany({
  //   include: {
  //     categories: {
  //       include: { category: true }
  //     }
  //   },
  //   orderBy: { createdAt: "desc" }
  // })

  // return NextResponse.json(doctors)
  return NextResponse.json([])
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

    // 👨‍⚕️ CREAR DOCTOR
    const doctor = await prisma.doctor.create({
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/\s+/g, "-"),
        city: body.city || "",
        image: body.image || "",
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