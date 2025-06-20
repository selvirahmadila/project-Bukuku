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
  const file = formData.get("coverimage") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filePath, buffer);

  const newBook = await prisma.book.create({
    data: { judul, penulis, kategori, status, coverimage: `/uploads/${filename}` }
  });

  return NextResponse.json(newBook);
}
