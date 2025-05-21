// app/api/book/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const data = await req.json();
  const book = await prisma.book.create({ data });
  return NextResponse.json(book, { status: 201 });
}
