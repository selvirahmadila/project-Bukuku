// /api/admin/book/[id]/route.ts (PUT, DELETE)
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params { params: { id: string } }

export async function PUT(req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const data = await req.json();

  const update = await prisma.book.update({ where: { id }, data });
  return NextResponse.json(update);
}

