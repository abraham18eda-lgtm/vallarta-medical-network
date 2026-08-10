import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"




export async function PUT(

  request: Request,

  {
    params
  }:{
    params:{
      id:string
    }
  }

) {


  const body =
    await request.json()



  const magazine =
    await prisma.magazine.update({

      where:{
        id:params.id
      },


      data:{


        locale:
          body.locale,


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







export async function DELETE(

  request:Request,

  {
    params
  }:{
    params:{
      id:string
    }
  }

){



  await prisma.magazine.delete({

    where:{
      id:params.id
    }

  })
  return NextResponse.json({

    ok:true

  })


}