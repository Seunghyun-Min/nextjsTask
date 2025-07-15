//Next.jsのdata.ts = JSPのDAO
import postgres from "postgres";
import { eigyo, shain } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

//top画面のログイン機能
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

//employeesList画面のログイン機能
// export async function fetchAllShain(): Promise<shain[]> {
//   try {
//     const result = await sql<shain[]>`
//       SELECT * FROM shain ORDER BY shain_code
//     `;
//     //console.log("取得した社員データ：", result);
//     return result;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch shain list.");
//   }
// }

export async function fetchAllShain(): Promise<shain[]> {
  try {
    const result = await sql<shain[]>`
      SELECT *
      FROM shain
      JOIN keireki
      ON shain.shain_code = keireki.shain_code
      ORDER BY shain.shain_code
    `;
    //console.log("取得した社員データ：", result);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch shain list.");
  }
}
