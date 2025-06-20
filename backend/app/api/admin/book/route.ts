import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const judul = formData.get("judul") as string;
  const penulis = formData.get("penulis") as string;
  const kategori = formData.get("kategori") as string;
  const status = formData.get("status") as string;
  
  const newBook = await prisma.book.create({
    data: { judul, penulis, kategori, status}
  });

  return NextResponse.json(newBook);
}
