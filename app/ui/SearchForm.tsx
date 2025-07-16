//app/ui/SearchForm.tsx
"use client";

import React, { useState } from "react";
import { SearchCriteria } from "../lib/definitions";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (criteria: SearchCriteria) => void;
}) {
  //検索用input定義
  const [employeename, setEmployeename] = useState("");
  const [closeststationline, setCloseststationline] = useState("");
  const [closeststationstation, setCloseststationstation] = useState("");
  const [careeryear, setCareeryear] = useState("");
  const [model, setModel] = useState("");
  const [agelowerlimit, setAgelowerlimit] = useState("");
  const [ageupperlimit, setAgeupperlimit] = useState("");
  const [os, setOs] = useState("");
  const [certificate, setCertificate] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState<"0" | "1" | "">("");

  //「検索」ボタン押した時の処理（入力値検査ー＞問題なければ検索実行）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    //社員名称
    if (employeename.length > 20) {
      errors.push("社員名称：20文字以内で入力して下さい");
    }

    //最寄り駅（線）
    if (closeststationline.length > 20) {
      errors.push("最寄駅：線は20文字以内で入力して下さい");
    }

    //最寄り駅（駅）
    if (closeststationstation.length > 20) {
      errors.push("最寄駅：駅は20文字以内で入力して下さい");
    }

    //経歴年数
    if (careeryear.length > 2) {
      errors.push("経験年数：半角2文字以内で入力して下さい");
    }

    //機種
    if (model.length > 20) {
      errors.push("機種：20文字以内で入力して下さい");
    }

    // 年齢（下限）
    if (agelowerlimit.trim()) {
      if (
        !/^\d+$/.test(agelowerlimit.trim()) ||
        agelowerlimit.trim().length > 2
      ) {
        errors.push("年齢（下限）：半角2文字以内で入力して下さい");
      }
    }

    // 年齢（上限）
    if (ageupperlimit.trim()) {
      if (
        !/^\d+$/.test(ageupperlimit.trim()) ||
        ageupperlimit.trim().length > 2
      ) {
        errors.push("年齢（上限）：半角2文字以内で入力して下さい");
      }
    }

    // 範囲の整合性チェック（両方あれば）
    if (
      agelowerlimit.trim() &&
      ageupperlimit.trim() &&
      parseInt(agelowerlimit.trim()) > parseInt(ageupperlimit.trim())
    ) {
      errors.push("年齢の範囲が正しくありません。");
    }

    //os,db,dc
    if (os.length > 20) {
      errors.push("OS・DB/DC：20文字以内で入力して下さい");
    }

    //資格
    if (certificate.length > 50) {
      errors.push("資格：20文字以内で入力して下さい");
    }

    //言語
    if (language.length > 20) {
      errors.push("言語：20文字以内で入力して下さい");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // 検索条件オブジェクト
    const criteria: SearchCriteria = {
      employeename,
      closeststationline,
      closeststationstation,
      careeryear,
      gender: gender !== "" ? gender : undefined,
      agelowerlimit,
      ageupperlimit,
      kishu: model,
      os,
      certificate,
      language,
    };

    onSearch(criteria);
  };

  //社員一覧画面の上段検索欄
  return (
    <form onSubmit={handleSubmit} className="searchform">
      <table className="employeessearch">
        <tbody>
          <tr>
            <td>社員名称：</td>
            <td>
              <input
                name="employeename"
                type="text"
                value={employeename}
                onChange={(e) => setEmployeename(e.target.value)}
                style={{ width: "55%" }}
              />
            </td>
            <td>最寄駅：</td>
            <td>
              <input
                name="closeststationline"
                value={closeststationline}
                onChange={(e) => setCloseststationline(e.target.value)}
                type="text"
              />
              線
              <input
                name="closeststationstation"
                value={closeststationstation}
                onChange={(e) => setCloseststationstation(e.target.value)}
                type="text"
              />
              駅
            </td>
          </tr>
          <tr>
            <td>経験年数：</td>
            <td>
              <input
                name="careeryear"
                value={careeryear}
                onChange={(e) => setCareeryear(e.target.value)}
                type="text"
              />
              年 性別：
              <input
                type="radio"
                value="0"
                name="gender"
                checked={gender === "0"}
                onChange={(e) => setGender(e.target.value as "0" | "1")}
              />
              男
              <input
                type="radio"
                value="1"
                name="gender"
                checked={gender === "1"}
                onChange={(e) => setGender(e.target.value as "0" | "1")}
              />
              女
            </td>
            <td>機種：</td>
            <td>
              <input
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                type="text"
                style={{ width: "55%" }}
              />
            </td>
          </tr>
          <tr>
            <td>年齢：</td>
            <td>
              <input
                name="agelowerlimit"
                id="agelowerlimit"
                type="text"
                style={{ width: "12%" }}
                value={agelowerlimit}
                onChange={(e) => setAgelowerlimit(e.target.value)}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
              />
              歳～
              <input
                name="ageupperlimit"
                id="ageupperlimit"
                type="text"
                style={{ width: "12%" }}
                value={ageupperlimit}
                onChange={(e) => setAgeupperlimit(e.target.value)}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
              />
              歳
            </td>
            <td>OS・DB/DC：</td>
            <td>
              <input
                name="os"
                id="os"
                type="text"
                value={os}
                onChange={(e) => setOs(e.target.value)}
                style={{ width: "55%" }}
              />
            </td>
          </tr>
          <tr>
            <td>資格：</td>
            <td>
              <input
                name="certificate"
                id="certificate"
                type="text"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                style={{ width: "55%" }}
              />
            </td>
            <td>言語：</td>
            <td>
              <input
                name="language"
                id="language"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: "55%" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="searchbuttoncontainer">
        <button type="submit" className="searchbutton">
          検索
        </button>
      </div>
    </form>
  );
}
