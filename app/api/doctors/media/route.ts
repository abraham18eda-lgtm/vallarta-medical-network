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
