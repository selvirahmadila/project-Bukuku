import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        user: {
          select: {
            id: true,
            nama: true,
            npm: true,
          }
        },
        book: {
          select: {
            id: true,
            judul: true,
            penulis: true,
            kategori: true,
            coverimage: true,
            status: true,
          }
        }
      },
      orderBy: {
        loanDate: "desc",
      },
    });

    return NextResponse.json(loans, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/loan error:", error);
    return NextResponse.json({ message: "Gagal mengambil data peminjaman", error }, { status: 500 });
  }
}
