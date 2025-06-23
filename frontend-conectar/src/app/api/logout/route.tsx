import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete("access_token");
  response.cookies.delete("role");
  return response;
}
