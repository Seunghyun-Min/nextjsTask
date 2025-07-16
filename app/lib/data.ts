//Next.jsのdata.ts = JSPのDAO
import postgres from "postgres";
import { eigyo, shain } from "./definitions";
import type { shainWithKeireki } from "./definitions";

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

// export async function fetchAllShain(): Promise<shainWithKeireki[]> {
//   try {
//     const result = await sql<shainWithKeireki[]>`
//       SELECT *
//       FROM shain
//       JOIN keireki
//       ON shain.shain_code = keireki.shain_code
//       ORDER BY shain.shain_code
//     `;
//     //console.log("取得した社員データ：", result);
//     return result;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch shain list.");
//   }
// }

export async function fetchAllShain(): Promise<shainWithKeireki[]> {
  try {
    const result = await sql<shainWithKeireki[]>`
      SELECT 
        s.shain_code,
        s.shain_shimei,
        s.seinen_gappi,
        s.keiken_nensu,
        s.seibetsu,
        s.jyusho,
        s.moyorieki_sen,
        s.moyorieki_eki,
        s.shikaku,
        k.kishu1,
        k.kishu2,
        k.kishu3,
        k.os_db1,
        k.os_db2,
        k.os_db3,
        k.gengo1,
        k.gengo2,
        k.gengo3
      FROM shain s
      JOIN keireki k
        ON s.shain_code = k.shain_code
      ORDER BY s.shain_code;
    `;
    //console.log("取得した社員データ：", result);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch shain list.");
  }
}

// export async function fetchAllShain(): Promise<shainWithKeireki[]> {
//   try {
//     const result = await sql<shainWithKeireki[]>`
//       SELECT DISTINCT ON (s.shain_code)
//         s.shain_code,
//         s.shain_shimei,
//         s.seinen_gappi,
//         s.keiken_nensu,
//         s.seibetsu,
//         s.jyusho,
//         s.moyorieki_sen,
//         s.moyorieki_eki,
//         s.shikaku
//       FROM shain s
//       JOIN keireki k
//         ON s.shain_code = k.shain_code
//       ORDER BY s.shain_code;
//     `;
//     //console.log("取得した社員データ：", result);
//     return result;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch shain list.");
//   }
// }
