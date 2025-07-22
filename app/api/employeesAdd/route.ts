// app/api/employeesAdd/route.ts
import { NextResponse } from "next/server";
import { addEmployee } from "@/app/lib/data";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await addEmployee(data); // ✅ 1回だけ実行

  if (!result.success) {
    // 重複などのエラー時にはエラー情報を含めたレスポンス
    return NextResponse.json({ error: "duplicate" }, { status: 409 });
  }

  // 成功時
  return NextResponse.json({ success: true }, { status: 200 });
}
