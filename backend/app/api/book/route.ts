import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error get books:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
