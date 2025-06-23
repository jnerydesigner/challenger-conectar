import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = body?.access_token;
  const role = body?.role;

  if (!token) {
    return NextResponse.json({ message: "Token ausente" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (role) {
    response.cookies.set("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}
