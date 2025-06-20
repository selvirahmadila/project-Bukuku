// /api/admin/loan/route.ts (GET all loans)
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const loans = await prisma.loan.findMany({
    include: { user: true, book: true }
  });
  
}
