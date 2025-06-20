// /api/book/[id]/route.ts (GET)
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params { params: { id: string } }

export async function GET(_: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return NextResponse.json({ message: "Buku tidak ditemukan" }, { status: 404 });
  return NextResponse.json(book);
}