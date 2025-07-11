import { NextResponse } from "next/server";
import { fetchAllShain } from "@/app/lib/data";

export async function GET() {
  try {
    const employees = await fetchAllShain();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}
