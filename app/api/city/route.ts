import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { cityId } = await request.json();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("current-city-id", cityId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}