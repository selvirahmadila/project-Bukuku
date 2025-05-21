import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        book: true,
        user: true,
      },
    });

    return NextResponse.json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { bookId, loanDate, returnDate } = await req.json();

    if (!bookId || !loanDate || !returnDate) {
      return NextResponse.json({ message: 'Semua field harus diisi' }, { status: 400 });
    }

    // Sementara userId hardcode dulu, nanti ganti sesuai login/session
    const userId = 1;

    const newLoan = await prisma.loan.create({
      data: {
        bookId: Number(bookId),
        userId,
        loanDate: new Date(loanDate),
        returnDate: new Date(returnDate),
      },
    });

    return NextResponse.json(newLoan);
  } catch (error) {
    console.error('Error create loan:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
