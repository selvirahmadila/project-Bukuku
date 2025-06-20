import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { loanId } = await req.json();

    // Validasi input
    if (!loanId || isNaN(loanId)) {
      return NextResponse.json({ message: "Loan ID tidak valid" }, { status: 400 });
    }

    // Cari loan-nya
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      return NextResponse.json({ message: "Data peminjaman tidak ditemukan" }, { status: 404 });
    }

    // Update returnDate sekarang
    await prisma.loan.update({
      where: { id: loanId },
      data: {
        returnDate: new Date(),
      },
    });

}
