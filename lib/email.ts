import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendDoctorInvitationEmail({
  email,
  doctorName,
  token,
}: {
  email: string
  doctorName: string
  token: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL no está configurada"
    )
  }

  const activationUrl =
    `${baseUrl}/doctor/activar?token=${encodeURIComponent(token)}`


  const { data, error } = await resend.emails.send({
    from:
      process.env.EMAIL_FROM ||
      "Magic Webs Pro <onboarding@resend.dev>",

    to: email,

    subject: "Activa tu cuenta de doctor",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        
        <h1>Bienvenido, ${doctorName}</h1>

        <p>
          Se ha creado tu perfil profesional.
        </p>

        <p>
          Para acceder a tu cuenta de doctor necesitas crear tu contraseña.
        </p>

        <div style="margin: 30px 0;">
          <a
            href="${activationUrl}"
            style="
              background:#2563eb;
              color:white;
              padding:14px 24px;
              border-radius:8px;
              text-decoration:none;
              display:inline-block;
            "
          >
            Crear mi contraseña
          </a>
        </div>

        <p>
          Este enlace es temporal y solamente puede utilizarse una vez.
        </p>
         <p>
        Si el botón no funciona, copia y pega este enlace:
      </p>
         <p>
          ${activationUrl}
        </p>


        <p>
          Si no esperabas este correo, puedes ignorarlo.
        </p>

      </div>
    `,
  })

  if (error) {
    console.error("RESEND ERROR:", error)
    throw new Error(error.message)
  }

  console.log("EMAIL ENVIADO:", data)

  return data
}
