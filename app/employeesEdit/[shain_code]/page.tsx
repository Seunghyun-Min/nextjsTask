// app/employeesEdit/[shain_code]/page.tsx

import { getShainByCode } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function EmployeeEditPage({
  params,
}: {
  params: { shain_code: string };
}) {
  const shainList = await getShainByCode(params.shain_code);

  if (!shainList || shainList.length === 0) {
    return notFound();
  }

  const base = shainList[0]; // shain情報はすべて共通のため

  return (
    <div>
      <h1>{base.shain_shimei} の編集ページ</h1>
      <div>
        <p>社員コード: {base.shain_code}</p>
        <p>氏名: {base.shain_shimei}</p>
        <p>住所: {base.jyusho}</p>
        <p>最寄り路線: {base.moyorieki_sen}</p>
        <p>最寄り駅: {base.moyorieki_eki}</p>
        <p>経験年数: {base.keiken_nensu}</p>
        <p>性別: {base.seibetsu === "0" ? "男" : "女"}</p>
        <p>資格: {base.shikaku}</p>
        <p>
          生年月日:{" "}
          {base.seinen_gappi
            ? new Date(base.seinen_gappi).toLocaleDateString("ja-JP")
            : ""}
        </p>
        <p>学歴1年月: {base.gakureki_nen1}</p>
        <p>学歴1: {base.gakureki1}</p>
        <p>学歴2年月: {base.gakureki_nen2}</p>
        <p>学歴2: {base.gakureki2}</p>
      </div>

      <h2>職歴一覧</h2>
      {shainList.map((keireki, index) => (
        <div key={keireki.keireki_id} style={{ marginBottom: "1em" }}>
          <p>【職歴{index + 1}】</p>
          <p>
            期間: {keireki.kikan_kaishi} ～ {keireki.kikanshuryo ?? "現在"}
          </p>
          <p>職種: {keireki.shokushu}</p>
          <p>業務内容: {keireki.gyoumu_naiyo}</p>
          <p>機種1: {keireki.kishu1}</p>
          <p>機種2: {keireki.kishu2}</p>
          <p>機種3: {keireki.kishu3}</p>
          <p>OS/DB1: {keireki.os_db1}</p>
          <p>OS/DB2: {keireki.os_db2}</p>
          <p>OS/DB3: {keireki.os_db3}</p>
          <p>言語1: {keireki.gengo1}</p>
          <p>言語2: {keireki.gengo2}</p>
          <p>言語3: {keireki.gengo3}</p>
        </div>
      ))}
    </div>
  );
}
