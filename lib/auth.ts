import { SignJWT, jwtVerify } from "jose"

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
let SECRET: Uint8Array | null = null

function getSecret() {
  if (!SECRET) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET no definido")
    SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
  }
  return SECRET
}
export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret())
}

export type AuthUser = {
  id: number
  email: string
  role: "USER" | "DOCTOR" | "ADMIN"
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    
    return {
      id: Number(payload.id),
      email: payload.email as string,
      role: payload.role as "USER" | "DOCTOR" | "ADMIN"
    }

  } catch (e) {
    console.log("JWT ERROR:", e)
    return null
  }
}