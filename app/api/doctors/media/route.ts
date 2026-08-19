import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      doctorId,
      url,
      type,
      title
    } = body


    if (!doctorId || !url || !type) {

      return NextResponse.json(
        {
          error: "Datos incompletos"
        },
        {
          status:400
        }
      )

    }


    const media = await prisma.doctorMedia.create({

      data:{
        doctorId,
        url,
        type,
        title
      }

    })


    return NextResponse.json(media)


  } catch(error){

    console.error(error)

    return NextResponse.json(
      {
        error:"Error creando media"
      },
      {
        status:500
      }
    )

  }

}

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)

    const doctorId = searchParams.get("doctorId")

    if (!doctorId) {
      return NextResponse.json(
        {
          error: "doctorId es requerido"
        },
        {
          status: 400
        }
      )
    }

    const media = await prisma.doctorMedia.findMany({
      where: {
        doctorId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(media)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Error cargando media"
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID requerido" },
        { status: 400 }
      )
    }

    await prisma.doctorMedia.delete({
      where: {
        id
      }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Error eliminando media"
      },
      {
        status: 500
      }
    )
  }
}
