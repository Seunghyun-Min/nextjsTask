// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

//ログイン機能関連eigyoデーターのtype定義
export type eigyo = {
  shain_code: string; // 社員コード（主キー）
  password: string; // パスワード
};

export type shain = {
  shain_code: string; // 社員コード（主キー）
  shain_shimei: string; // 社員氏名
  jyusho: string; // 住所
  seinen_gappi: string; // 生年月日
  keiken_nensu: number; // 経験年数
  seibetsu: "0" | "1"; // 性別、'0'=男, '1'=女

  shikaku?: string | null; // 資格
  moyorieki_sen?: string | null; // 最寄駅（線）
  moyorieki_eki?: string | null; // 最寄駅（駅）

  gakureki_nen1?: string | null; // 学歴1の年
  gakureki1?: string | null; // 学歴1
  gakureki_nen2?: string | null; // 学歴2の年
  gakureki2?: string | null; // 学歴2

  update_date: string; // 更新日
  update_shain_code: string; // 更新した社員のコード
};

export type keireki = {
  keireki_id: string; // varchar(3)
  shain_code: string; // varchar(6)
  kikan_kaishi: string; // varchar(6)
  kikanshuryo: string | null; // varchar(6) / null
  shokushu: string; // varchar(40)
  gyoumu_naiyo: string; // varchar(200)
  kishu1: string; // varchar(40)
  kishu2: string | null; // varchar(40) / null
  kishu3: string | null; // varchar(40) / null
  os_db1: string; // varchar(40)
  os_db2: string | null; // varchar(40) / null
  os_db3: string | null; // varchar(40) / null
  gengo1: string; // varchar(40)
  gengo2: string | null; // varchar(40) / null
  gengo3: string | null; // varchar(40) / null
  update_date: string; // SQL上は date だが、JavaScriptでは string で扱う（format: YYYY-MM-DD）
  update_shain_code: string; // varchar(6)
};
