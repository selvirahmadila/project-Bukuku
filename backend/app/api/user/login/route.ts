import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { nama, npm } = await req.json();

    if (!nama || !npm) {
      return NextResponse.json(
        { message: 'Nama dan NPM harus diisi' },
        { status: 400 }
      );
    }

    // Cari berdasarkan nama dan npm
    let user = await prisma.user.findFirst({
      where: { nama, npm },
    });

    // Jika belum ada, buat user baru
    if (!user) {
      user = await prisma.user.create({
        data: { nama, npm },
      });
    }

    return NextResponse.json({ message: 'Login berhasil', user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server', error },
      { status: 500 }
    );
  }
}
