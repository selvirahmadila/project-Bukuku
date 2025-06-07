import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

// GET: Ambil semua data buku
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/book error:", error);
    return NextResponse.json({ message: "Gagal mengambil data", error }, { status: 500 });
  }
}

// POST: Tambah buku baru + simpan cover
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const judul = formData.get("judul")?.toString();
    const penulis = formData.get("penulis")?.toString();
    const kategori = formData.get("kategori")?.toString() || null;
    const cover = formData.get("cover") as File;

    // Validasi input wajib
    if (!judul || !penulis || !cover) {
      return NextResponse.json({ message: "Data tidak lengkap (judul, penulis, cover wajib diisi)" }, { status: 400 });
    }

    // Simpan file cover
    const buffer = Buffer.from(await cover.arrayBuffer());
    const filename = `${uuidv4()}_${cover.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    // Simpan ke database
    const book = await prisma.book.create({
      data: {
        judul,
        penulis,
        kategori,
        coverimage: `/uploads/${filename}`,
      },
    });

    return NextResponse.json({ message: "Buku berhasil ditambahkan", book }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/book error:", error);
    return NextResponse.json({ message: "Gagal menyimpan buku", error }, { status: 500 });
  }
}
