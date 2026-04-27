import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // 📄 PAGINACIÓN
    const pageParam = searchParams.get("page")
    const page = pageParam && !isNaN(Number(pageParam))
        ? Number(pageParam)
        : 1

    const take = 12
    const skip = (page - 1) * take

    // 🧠 FILTRO POR ESPECIALIDAD (slug)
    const category = searchParams.get("category") || ""

    const where: any = {
      isActive: true
    }

    // 👉 SOLO si viene categoría
    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
            type: "DOCTOR"
          }
        }
      }
    }

    // 🧑‍⚕️ QUERY PRINCIPAL
    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        include: {
          categories: {
            include: {
              category: true
            }
          }
        },
        take,
        skip,
        orderBy: { createdAt: "desc" }
      }),
      prisma.doctor.count({ where })
    ])

    return NextResponse.json({
      doctors,
      total,
      pages: Math.ceil(total / take)
    })

  } catch (error) {
    console.error("API DOCTORS ERROR:", error)

    return NextResponse.json(
      {
        doctors: [],
        total: 0,
        pages: 0,
        error: "Error cargando doctores"
      },
      { status: 500 }
    )
  }
}