import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function GET() {

  const magazines = await prisma.magazine.findMany({

    orderBy: {
      createdAt: "desc"
    }

  })


  return NextResponse.json(
    magazines
  )

}






export async function POST(
  request: Request
) {


  const body = await request.json()



  const magazine =
    await prisma.magazine.create({

      data:{


        locale:
          body.locale ?? "es",


        title:
          body.title,


        coverImage:
          body.coverImage,


        description:
          body.description || null,


        url:
          body.url,


        edition:
          body.edition || null,


        isFeatured:
          body.isFeatured ?? false,


        isActive:
          body.isActive ?? true


      }

    })

  return NextResponse.json(
    magazine
  )

}