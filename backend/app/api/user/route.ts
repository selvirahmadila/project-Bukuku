import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { npm } = await req.json();

  let user = await prisma.user.findUnique({ where: { npm } });
  if (!user) {
    user = await prisma.user.create({ data: { npm } });
  }

  return NextResponse.json(user);
}
