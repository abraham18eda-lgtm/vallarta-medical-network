import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [admin] = await db.query(
    'SELECT * FROM admins WHERE email = ?',
    [email]
  );

  if (!admin) return new Response('Unauthorized', { status: 401 });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return new Response('Unauthorized', { status: 401 });

  return Response.json({ ok: true });
}