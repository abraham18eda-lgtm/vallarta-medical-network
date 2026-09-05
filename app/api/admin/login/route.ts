import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  const admin = await db.user.findUnique({
    where: { email }
  })

  if (!admin) return new Response('Unauthorized', { status: 401 });

  if (!admin.password) { return new Response("Unauthorized",{status: 401}) }
  const valid = await bcrypt.compare(password, admin.password) ;
  if (!valid) return new Response('Unauthorized', { status: 401 });

  if (admin.role !== "ADMIN") {
return NextResponse.json(
{ error: "Unauthorized" },
{ status: 401 }
);
}

const token = await signToken({id: admin.id, email: admin.email, role: admin.role});

const res = NextResponse.json({ok: true, role: admin.role });

res.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

return res;
}