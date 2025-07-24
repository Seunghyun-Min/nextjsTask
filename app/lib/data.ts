//lib/data.ts
import postgres from "postgres";
import type {
  eigyo,
  shain,
  keireki,
  shainWithKeireki,
  EmployeeFormData,
  keirekiDisplay,
} from "./definitions";
import { cookies } from "next/headers";

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
      LEFT JOIN keireki k
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

export async function addEmployee(
  data: EmployeeFormData
): Promise<{ success: boolean; error?: string }> {
  console.log("▼ addEmployee() 開始");
  console.log("shain_code value:", data.shain_code);
  console.log("type:", typeof data.shain_code);
  console.log("length:", String(data.shain_code).length);
  console.log("全データ:", data);

  try {
    const today = new Date().toISOString().split("T")[0];
    const cookieStore = await cookies();
    const updateShainCode = cookieStore.get("shain_code")?.value ?? "unknown";
    console.log("updateShainCode:", updateShainCode);

    const duplicateCheck = await sql`
      SELECT 1 FROM shain WHERE shain_code = ${data.shain_code}
    `;
    console.log("duplicateCheck result:", duplicateCheck);

    if (duplicateCheck.length > 0) {
      console.warn("重複エラー: この社員コードは既に存在します");
      return {
        success: false,
        error: "入力された社員コードはすでに登録済みです",
      };
    }

    console.log("社員コードは重複していません。INSERT を実行します。");

    const removeSlash = (value?: string | null): string | null => {
      if (!value) return null;
      return value.replaceAll("/", "");
    };

    await sql`
      INSERT INTO shain (
        shain_code,
        shain_shimei,
        jyusho,
        seinen_gappi,
        keiken_nensu,
        seibetsu,
        shikaku,
        moyorieki_sen,
        moyorieki_eki,
        gakureki_nen1,
        gakureki1,
        gakureki_nen2,
        gakureki2,
        update_date,
        update_shain_code
      )
      VALUES (
        ${data.shain_code},
        ${data.employeename},
        ${data.address},
        ${data.birthdate},
        ${data.careeryear ?? null},
        ${data.gender},
        ${data.certificate ?? null},
        ${data.closeststationline ?? null},
        ${data.closeststationstation ?? null},
        ${removeSlash(data.educationalbackground_graduationperiod1)},
        ${data.educationalbackground1 ?? null},
        ${removeSlash(data.educationalbackground_graduationperiod2)},
        ${data.educationalbackground2 ?? null},
        ${today},
        ${updateShainCode}
      );
    `;

    console.log("INSERT 成功");

    return { success: true };
  } catch (error) {
    console.error("社員登録エラー:", error);
    return { success: false, error: "登録に失敗しました。" };
  }
}

export async function getShainByCode(
  shain_code: string
): Promise<
  (Omit<shainWithKeireki, "keireki"> & { keireki: keirekiDisplay[] }) | null
> {
  const result = await sql<any[]>`
    SELECT 
      s.shain_code,
      s.shain_shimei,
      s.jyusho,
      s.seinen_gappi,
      s.keiken_nensu,
      s.seibetsu,
      s.shikaku,
      s.moyorieki_sen,
      s.moyorieki_eki,
      s.gakureki_nen1,
      s.gakureki1,
      s.gakureki_nen2,
      s.gakureki2,
      s.update_date,
      s.update_shain_code,

      k.keireki_id,
      k.kikan_kaishi,
      k.kikanshuryo,
      k.shokushu,
      k.gyoumu_naiyo,
      k.kishu1,
      k.kishu2,
      k.kishu3,
      k.os_db1,
      k.os_db2,
      k.os_db3,
      k.gengo1,
      k.gengo2,
      k.gengo3,
      k.update_date as keireki_update_date,
      k.update_shain_code as keireki_update_shain_code
    FROM shain s
    LEFT JOIN keireki k ON s.shain_code = k.shain_code
    WHERE s.shain_code = ${shain_code}
    ORDER BY k.kikan_kaishi DESC
  `;

  if (!result || result.length === 0) return null;

  const base = result[0];

  const keireki = result
    .filter((row) => row.keireki_id !== null)
    .map((row) => ({
      keireki_id: row.keireki_id,
      start_date: row.kikan_kaishi,
      end_date: row.kikanshuryo,
      shokushu: row.shokushu,
      gyomu_naiyo: row.gyoumu_naiyo,
      kisyu: [row.kishu1, row.kishu2, row.kishu3].filter(Boolean).join(", "),
      os_db: [row.os_db1, row.os_db2, row.os_db3].filter(Boolean).join(", "),
      gengo: [row.gengo1, row.gengo2, row.gengo3].filter(Boolean).join(", "),
      update_date: row.keireki_update_date ?? "", // 👈 追加
      update_shain_code: row.keireki_update_shain_code ?? "", // 👈 追加
    }));

  return {
    shain_code: base.shain_code,
    shain_shimei: base.shain_shimei,
    jyusho: base.jyusho,
    seinen_gappi: base.seinen_gappi,
    keiken_nensu: base.keiken_nensu,
    seibetsu: base.seibetsu,
    shikaku: base.shikaku,
    moyorieki_sen: base.moyorieki_sen,
    moyorieki_eki: base.moyorieki_eki,
    gakureki_nen1: base.gakureki_nen1,
    gakureki1: base.gakureki1,
    gakureki_nen2: base.gakureki_nen2,
    gakureki2: base.gakureki2,
    update_date: base.update_date,
    update_shain_code: base.update_shain_code,
    keireki,
  };
}
