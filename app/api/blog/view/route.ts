import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function POST(
  request: Request
) {

  const {
    slug
  } = await request.json()


  if(!slug){
    return NextResponse.json(
      {
        error:"Slug requerido"
      },
      {
        status:400
      }
    )
  }


  const cookieName =
    `blog_view_${slug}`


  const cookie =
    request.headers
      .get("cookie")
      ?.includes(cookieName)


  if(!cookie){

    await prisma.blog.update({
      where:{
        slug
      },
      data:{
        views:{
          increment:1
        }
      }
    })


    const response =
      NextResponse.json({
        success:true
      })


    response.cookies.set(
      cookieName,
      "true",
      {
        maxAge:
          60 * 60 * 24,
        httpOnly:true,
        sameSite:"lax"
      }
    )


    return response
  }


  return NextResponse.json({
    success:true,
    counted:false
  })

}