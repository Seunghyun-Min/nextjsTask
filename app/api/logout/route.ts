import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // ✅ cookie を削除（shain_code）
  response.cookies.set("shain_code", "", {
    maxAge: 0,
    path: "/", // 必ず同じpathで消す
  });

  return response;
}
