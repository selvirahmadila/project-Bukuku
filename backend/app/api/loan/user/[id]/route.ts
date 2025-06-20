// /api/loan/user/[id]/route.ts (GET - riwayat user)
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params { params: { id: string } }

export async function GET(_: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const history = await prisma.loan.findMany({
    where: { userId: id },
    include: { book: true }
  });

}
