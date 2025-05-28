import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID diperlukan" }, { status: 400 });
  }

  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
  });

  if (!book) {
    return NextResponse.json({ message: "Buku tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(book);
}
