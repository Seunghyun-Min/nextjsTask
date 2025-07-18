// app/api/employeesAdd/route.ts
import { NextResponse } from "next/server";
import { addEmployee } from "@/app/lib/data";

export async function POST(req: Request) {
  const data = await req.json();
  const success = await addEmployee(data);
  const result = await addEmployee(data);
  return NextResponse.json({ success });
}
