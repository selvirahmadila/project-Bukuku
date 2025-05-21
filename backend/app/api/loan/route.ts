// app/api/loan/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const loans = await prisma.loan.findMany({
    include: {
      user: true,
      book: true,
    },
  });
  return NextResponse.json(loans);
}

export async function POST(req: Request) {
  const data = await req.json();
  const loan = await prisma.loan.create({
    data: {
      userId: parseInt(data.userId),
      bookId: parseInt(data.bookId),
      returnDate: data.returnDate ? new Date(data.returnDate) : null,
    },
  });
  return NextResponse.json(loan, { status: 201 });
}
