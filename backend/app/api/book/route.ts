import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const books = await prisma.book.findMany({
    where: q
      ? {
          OR: [
            { judul: { contains: q } },
            { penulis: { contains: q } },
            { kategori: { contains: q } },
            { isbn: { contains: q } },
          ],
        }
      : undefined,
  });

  return NextResponse.json(books);
}