import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    for (const item of body.items) {

      await prisma.navigationItem.update({
        where: {
          id: item.id
        },
        data: {
          order: item.order
        }
      })
    }

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error reordenando" },
      { status: 500 }
    )
  }
}