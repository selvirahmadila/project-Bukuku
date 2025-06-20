// /api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "admin1234") {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: "Login gagal" }, { status: 401 });
  }
}