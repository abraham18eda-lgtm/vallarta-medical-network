import { Resend } from "resend"

const resend = new Resend(
  process.env.RESEND_API_KEY
)
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


export async function sendDoctorContactEmail({
  doctorEmail,
  doctorName,
  patientName,
  patientEmail,
  patientPhone,
  message,
}: {
  doctorEmail: string
  doctorName: string
  patientName: string
  patientEmail: string
  patientPhone?: string | null
  message: string
}) {

  const safeDoctorName =
  escapeHtml(doctorName)

  const safePatientName =
    escapeHtml(patientName)

  const safePatientEmail =
    escapeHtml(patientEmail)

  const safePatientPhone =
    patientPhone
      ? escapeHtml(patientPhone)
      : ""

  const safeMessage =
    escapeHtml(message)


  const { data, error } =
    await resend.emails.send({

      from:
        process.env.EMAIL_FROM ||
        "Magic Webs Pro <onboarding@resend.dev>",

      to: doctorEmail,

      replyTo: patientEmail,

      subject:
        `Nuevo mensaje para Dr. ${safeDoctorName}`,

      html: `

        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          color: #334155;
        ">

          <h1 style="
            color: #0284c7;
          ">
            Nuevo mensaje de contacto
          </h1>

          <p>
            Hola Dr. ${safePatientName},
          </p>

          <p>
            Has recibido un nuevo mensaje desde tu
            perfil profesional.
          </p>

          <div style="
            margin: 25px 0;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
          ">

            <p>
              <strong>Nombre:</strong>
              ${safePatientName}
            </p>

            <p>
              <strong>Email:</strong>
              ${safePatientEmail}
            </p>

            ${
              safePatientPhone
                ? `
                  <p>
                    <strong>Teléfono:</strong>
                    ${safePatientPhone}
                  </p>
                `
                : ""
            }

            <p>
              <strong>Mensaje:</strong>
            </p>

            <p style="
              white-space: pre-line;
              line-height: 1.6;
            ">
              ${safeMessage}
            </p>

          </div>

          <p>
            Puedes responder directamente a este correo
            para contactar con la persona.
          </p>

          <hr />

          <p style="
            color: #94a3b8;
            font-size: 12px;
          ">
            Este mensaje fue enviado desde tu perfil
            profesional.
          </p>

        </div>

      `,
    })

  if (error) {

    console.error(
      "RESEND CONTACT ERROR:",
      error
    )

    throw new Error(
      error.message
    )
  }

  console.log(
    "CONTACT EMAIL SENT:",
    data
  )

  return data
}
