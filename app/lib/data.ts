//Next.jsのdata.ts = JSPのDAO
import postgres from "postgres";
import { eigyo } from "./definitions";
//import { formatCurrency } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function executeLogin(shain_code: string, password: string) {
  try {
    const result = await sql<eigyo[]>`
    SELECT * FROM eigyo WHERE shain_code = ${shain_code} AND password = ${password}
    `;
    return result.length > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to Login.");
  }
}
