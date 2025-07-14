//Next.jsのroute.ts = JSPのServlet
import { executeLogin } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";
//import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { shain_code, password } = await req.json();

  if (!shain_code || !password) {
    return NextResponse.json(
      { error: "社員コードとパスワードは必須です" },
      { status: 400 }
    );
  }

  const success = await executeLogin(shain_code, password);

  if (success) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("shain_code", shain_code, {
      httpOnly: true,
      maxAge: 60 * 60 * 0.5,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  //returnされるJsonレスポンスは、呼び出し元（= クライアント側の fetch()）に戻る。
  //->page.tsxのconst res = await fetch(...)の部分
}
