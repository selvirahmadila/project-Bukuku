import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json({ message: "Buku tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("GET /api/book/detail/[id] error:", error);
    return NextResponse.json({ message: "Gagal mengambil data buku", error }, { status: 500 });
  }
}
