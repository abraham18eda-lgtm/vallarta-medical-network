import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)

    const locale = searchParams.get("locale") || "es"

    const pageParam = searchParams.get("page")
    const page = pageParam && !isNaN(Number(pageParam))
      ? Number(pageParam)
      : 1

    const take = 15
    const skip = (page - 1) * take


    const category = searchParams.get("category") || ""
    const search = searchParams.get("search") || ""


    const where: any = {
      isActive: true
    }


    // FILTRO POR ESPECIALIDAD
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


    // BUSCADOR
    if (search) {
      where.translations = {
        some: {
          locale,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      }
    }



    /*
      1. TRAEMOS TODOS LOS DOCTORES
      Filtrados por categoría
    */

    const allDoctors = await prisma.doctor.findMany({

      where,

      include: {

        translations: {
          where: {
            locale: {
              in: [locale, "es"]
            }
          },
        },


        categories: {
          include: {
            category: true,
          },
        },


        homeFeatured: {
          orderBy: {
            order: "asc"
          }
        }

      },


      orderBy: {
        createdAt: "desc",
      },

    })



    /*
      2. TOP RECOMENDADOS
      máximo 6 por especialidad
    */

    const recommended = allDoctors
      .filter(
        doctor => doctor.homeFeatured.length > 0
      )
      .sort(
        (a,b) =>
          a.homeFeatured[0].order -
          b.homeFeatured[0].order
      )
      .slice(0,6)



    const recommendedIds = recommended.map(
      doctor => doctor.id
    )



    /*
      3. RESTO DE DOCTORES
      quitamos los recomendados
    */

    const others = allDoctors.filter(
      doctor =>
        !recommendedIds.includes(doctor.id)
    )



    /*
      4. PAGINACIÓN SOLO PARA OTHERS
    */

    const paginatedOthers = others.slice(
      skip,
      skip + take
    )


    return NextResponse.json({

      recommended,

      doctors: paginatedOthers,

      total: others.length,

      pages: Math.ceil(
        others.length / take
      )

    })


  } catch (error) {

    console.error(
      "API DOCTORS ERROR:",
      error
    )


    return NextResponse.json(
      {
        recommended: [],
        doctors: [],
        total: 0,
        pages: 0,
        error: "Error cargando doctores"
      },
      {
        status: 500
      }
    )
  }
}