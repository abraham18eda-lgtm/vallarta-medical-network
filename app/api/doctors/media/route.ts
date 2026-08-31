import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const user = token
    ? await verifyToken(token)
    : null

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

export async function POST(req: Request) {

  const user = await requireAdmin()

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }
    
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

  const user = await requireAdmin()

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }
    
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

  const user = await requireAdmin()

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }
    
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
