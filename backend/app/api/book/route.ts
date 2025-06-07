import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil data buku", error }, { status: 500 });
  }
}
