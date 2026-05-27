export const runtime = "nodejs"

import { NextResponse } from "next/server"
// import { v2 as cloudinary } from "cloudinary"
import cloudinary from "@/lib/cloudinary" 

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "doctors" // Organiza la carpeta de imagenes
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })
    console.log(cloudinary.config())
    return NextResponse.json({
      url: upload.secure_url
    })

    } catch (error: any) {
    console.log("ERROR COMPLETO:")
    console.log(error)

    return NextResponse.json(
      {
        error: error.message,
        fullError: error
      },
      { status: 500 }
    )
  }
}