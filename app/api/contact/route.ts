import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

import { sendDoctorContactEmail } from "@/lib/email/sendDoctorContactEmail"

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre es demasiado corto")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(150),

  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(5, "El mensaje es demasiado corto")
    .max(3000),

  doctorId: z
    .string()
    .min(1),
})

export async function POST(req: Request) {

  try {

    const contentType =
      req.headers.get("content-type") || ""

    let rawData: Record<string, string>

    /*
     * JSON
     */
    if (contentType.includes("application/json")) {

      rawData = await req.json()

    /*
     * FORM HTML
     */
    } else {

      const formData = await req.formData()

      rawData = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        message: String(formData.get("message") || ""),
        doctorId: String(formData.get("doctorId") || ""),
      }
    }

    /*
     * VALIDACIÓN
     */

    const result =
      contactSchema.safeParse(rawData)

    if (!result.success) {

      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: result.error.flatten(),
        },
        {
          status: 400,
        }
      )
    }

    const {
      name,
      email,
      phone,
      message,
      doctorId,
    } = result.data

    /*
     * BUSCAR DOCTOR
     */

    const doctor =
      await prisma.doctor.findUnique({
        where: {
          id: doctorId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          isActive: true,
        },
      })

    if (!doctor) {

      return NextResponse.json(
        {
          error: "Doctor no encontrado",
        },
        {
          status: 404,
        }
      )
    }

    if (!doctor.isActive) {

      return NextResponse.json(
        {
          error: "El perfil del doctor no está activo",
        },
        {
          status: 400,
        }
      )
    }

    /*
     * GUARDAR CONTACTO
     */

    const contact =
      await prisma.contactRequest.create({
        data: {
          name,
          email,
          phone: phone || null,
          message,
          doctorId,
        },
      })

    /*
     * REGISTRAR ANALYTICS
     */

    await prisma.analytics.create({
      data: {
        doctorId,
        type: "CONTACT_FORM",
      },
    })

    /*
     * ENVIAR EMAIL
     */

    if (doctor.email) {

      try {

        await sendDoctorContactEmail({
          doctorEmail: doctor.email,
          doctorName: doctor.name,
          patientName: name,
          patientEmail: email,
          patientPhone: phone || null,
          message,
        })

      } catch (emailError) {

        /*
         * IMPORTANTE:
         *
         * El contacto ya quedó guardado.
         * No vamos a perderlo solamente porque
         * Resend haya fallado.
         */

        console.error(
          "ERROR ENVIANDO EMAIL AL DOCTOR:",
          emailError
        )
      }
    }

    return NextResponse.json({
      ok: true,
      contactId: contact.id,
    })

  } catch (error) {

    console.error(
      "CONTACT API ERROR:",
      error
    )

    return NextResponse.json(
      {
        error: "No se pudo procesar el contacto",
      },
      {
        status: 500,
      }
    )
  }
}
