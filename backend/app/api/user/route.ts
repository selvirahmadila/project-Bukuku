// app/api/user/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(user);
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.user.create({ data });
  return NextResponse.json(user, { status: 201 });
}
