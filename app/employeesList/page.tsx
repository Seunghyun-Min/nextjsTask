"use client";

import React, { useState } from "react";
import SearchForm from "@/app/ui/SearchForm";
import "../ui/employeesList.css";
import { shain } from "../lib/definitions";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<shain[]>([]);

  // ダミーデータ（仮にサーバから取得したデータとする）
  // const dummyData: shain[] = [
  //   {
  //     shain_code: "001",
  //     shain_shimei: "田中 太郎",
  //     jyusho: "東京都港区",
  //     seinen_gappi: "1990-01-01",
  //     keiken_nensu: 10,
  //     seibetsu: "0",
  //     certificate: "基本情報技術者",
  //   },
  //   // 他の社員も追加可
  // ];

  // const handleSearch = () => {
  //   // 本来はAPIでサーバと通信する
  //   setEmployees(dummyData);
  // };

  return (
    <div className="body">
      <div className="header">
        <div className="header-title">社員一覧</div>
        <div className="logoutbuttoncontainer">
          <button
            className="logoutbutton"
            onClick={() => alert("ログアウト確認")}
          >
            ログアウト
          </button>
        </div>
      </div>

      <SearchForm />

      {employees.length > 0 ? (
        <>
          <h2 id="textDIV">社員一覧</h2>
          {/* <EmployeeTable employees={employees} /> */}
        </>
      ) : null}

      <div className="employeesmanipulatebuttoncontainer">
        <button onClick={() => alert("社員追加画面へ遷移")}>社員追加</button>
        <button onClick={() => alert("社員変更確認")}>社員変更</button>
        <button onClick={() => confirm("削除しますか？") && alert("削除実行")}>
          社員削除
        </button>
      </div>
    </div>
  );
}
