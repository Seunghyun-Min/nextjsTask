//Next.jsのroute.ts = JSPのServlet
import { executeLogin } from "@/app/lib/data";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  //returnされるJsonレスポンスは、呼び出し元（= クライアント側の fetch()）に戻る。
  //->page.tsxのconst res = await fetch(...)の部分
}
