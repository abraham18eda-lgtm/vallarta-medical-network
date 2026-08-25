import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const allowedTypes = [
  "PROFILE_VIEW",
  "CONTACT_CLICK",
  "PHONE_CLICK",
  "WHATSAPP_CLICK",
  "CONTACT_FORM",
  "SEARCH",
  "SEARCH_RESULT_CLICK",
] as const

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      doctorId,
      type,
      query,
    } = body

    if (!type) {
      return NextResponse.json(
        { error: "Missing type" },
        { status: 400 }
      )
    }

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid analytics type" },
        { status: 400 }
      )
    }

    /*
     * SEARCH
     *
     * Una búsqueda general no pertenece
     * todavía a ningún doctor.
     */

    if (type === "SEARCH") {

      if (!query || !String(query).trim()) {
        return NextResponse.json(
          { error: "Missing search query" },
          { status: 400 }
        )
      }

      // await prisma.analytics.create({
      //   data: {
      //     doctorId: null,
      //     type: "SEARCH",
      //     query: String(query)
      //       .trim()
      //       .slice(0, 200),
      //   },
      // })

      return NextResponse.json({
        ok: true,
      })
    }

    /*
     * Todos los demás eventos necesitan doctor
     */

    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing doctorId" },
        { status: 400 }
      )
    }

    const doctor =
      await prisma.doctor.findUnique({
        where: {
          id: doctorId,
        },
        select: {
          id: true,
          isActive: true,
        },
      })

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      )
    }

    await prisma.analytics.create({
      data: {
        doctorId,
        type,
        query:
          type === "SEARCH_RESULT_CLICK"
            ? query
              ? String(query)
                  .trim()
                  .slice(0, 200)
              : null
            : null,
      },
    })

    return NextResponse.json({
      ok: true,
    })

  } catch (error) {

    console.error(
      "ANALYTICS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error: "Analytics error",
      },
      {
        status: 500,
      }
    )
  }
}
