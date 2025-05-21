// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { npm, password } = await req.json();

    if (!npm || !password) {
      return NextResponse.json({ message: 'NPM dan password wajib diisi' }, { status: 400 });
    }

    if (password !== npm) {
      return NextResponse.json({ message: 'NPM atau password salah' }, { status: 401 });
    }

    // login berhasil, return user info (misal npm dan nama sama dengan npm)
    return NextResponse.json({
      user: {
        npm,
        nama: npm, // contoh nama sama dengan npm
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
