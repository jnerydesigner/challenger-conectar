"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { request } = await req.json();
  console.log("Token", request);
  const cookieStore = await cookies();

  console.log("Token", request.access_token);

  const response = NextResponse.json({ ok: true });

  if (request.access_token) {
    console.log("entrou aqui");
    cookieStore.set("access_token", request.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    cookieStore.set("user_data", JSON.stringify(request), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    cookieStore.set("role", request.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
  }

  return response;
}
