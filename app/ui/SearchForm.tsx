"use client";

import React from "react";

export default function SearchForm({ onSearch }: { onSearch: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーションは本来ここに実装
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="searchform">
      <table className="employeessearch">
        <tbody>
          <tr>
            <td>社員名称：</td>
            <td>
              <input name="employeename" type="text" style={{ width: "55%" }} />
            </td>
            <td>最寄駅：</td>
            <td>
              <input name="closeststationline" type="text" />線
              <input name="closeststationstation" type="text" />駅
            </td>
          </tr>
          <tr>
            <td>経験年数：</td>
            <td>
              <input name="careeryear" type="text" />年 性別：
              <input type="radio" value="0" name="gender" />男
              <input type="radio" value="1" name="gender" />女
            </td>
            <td>機種：</td>
            <td>
              <input name="model" type="text" style={{ width: "55%" }} />
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
              <input name="os" id="os" type="text" style={{ width: "55%" }} />
            </td>
          </tr>
          <tr>
            <td>資格：</td>
            <td>
              <input
                name="certificate"
                id="certificate"
                type="text"
                style={{ width: "55%" }}
              />
            </td>
            <td>言語：</td>
            <td>
              <input
                name="language"
                id="language"
                type="text"
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
