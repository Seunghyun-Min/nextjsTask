"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/app/ui/SearchForm";
import EmployeesInfoTable from "@/app/ui/EmployeesInfoTable";
import ManipulateButtons from "@/app/ui/ManipulateButtons";
import LogoutButton from "@/app/ui/LogoutButton";
import "../ui/employeesList.css";
import { shainWithKeireki } from "@/app/lib/definitions";

export default function EmployeesClientWrapper({
  employees,
}: {
  employees: shainWithKeireki[];
}) {
  const uniqueShainMap = new Map<string, shainWithKeireki>();
  employees.forEach((emp) => {
    if (!uniqueShainMap.has(emp.shain_code)) {
      uniqueShainMap.set(emp.shain_code, emp);
    }
  });
  const uniqueEmployees = Array.from(uniqueShainMap.values());

  const [filteredEmployees, setFilteredEmployees] =
    useState<shainWithKeireki[]>(uniqueEmployees);

  const handleSearch = (criteria: any) => {
    const filtered = uniqueEmployees.filter((emp) => {
      //部分一致検索要素：社員名称、最寄駅(線)、
      // 最寄駅(駅)、機種、OS・DB/DC、資格、言語
      //社員名称
      if (
        criteria.employeename &&
        !emp.shain_shimei.includes(criteria.employeename)
      )
        return false;
      //最寄駅(線)
      if (
        criteria.closeststationline &&
        !(emp.moyorieki_sen ?? "").includes(criteria.closeststationline)
      )
        return false;
      //最寄駅(駅)
      if (
        criteria.closeststationstation &&
        !(emp.moyorieki_eki ?? "").includes(criteria.closeststationstation)
      )
        return false;
      //機種
      if (
        criteria.kishu &&
        !(
          emp.kishu1?.includes(criteria.kishu) ||
          emp.kishu2?.includes(criteria.kishu) ||
          emp.kishu3?.includes(criteria.kishu)
        )
      ) {
        return false;
      }
      //OS・DB/DC
      if (
        criteria.os &&
        !(
          emp.os_db1?.includes(criteria.os) ||
          emp.os_db2?.includes(criteria.os) ||
          emp.os_db2?.includes(criteria.os)
        )
      ) {
        return false;
      }
      //資格
      if (
        criteria.certificate &&
        !(emp.shikaku ?? "").includes(criteria.certificate)
      )
        return false;

      //言語
      if (
        criteria.language &&
        !(
          emp.gengo1?.includes(criteria.language) ||
          emp.gengo2?.includes(criteria.language) ||
          emp.gengo3?.includes(criteria.language)
        )
      ) {
        return false;
      }
      //他の条件もここに追加
      //完全一致検索要素：
      // 経験年数
      if (
        criteria.careeryear &&
        emp.keiken_nensu !== Number(criteria.careeryear)
      ) {
        return false;
      }

      //範囲検索要素：年齢
      //範囲検索要素：年齢
      if (criteria.agelowerlimit || criteria.ageupperlimit) {
        const birthDate = new Date(emp.seinen_gappi);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // 年齢下限
        if (criteria.agelowerlimit && age < parseInt(criteria.agelowerlimit)) {
          return false;
        }

        // 年齢上限
        if (criteria.ageupperlimit && age > parseInt(criteria.ageupperlimit)) {
          return false;
        }
      }

      //性別：女もしくは男
      if (criteria.gender !== undefined && emp.seibetsu !== criteria.gender) {
        return false;
      }

      return true;
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div className="body">
      <div className="header">
        <div className="header-title">社員一覧</div>
        <div className="logoutbuttoncontainer">
          <LogoutButton />
        </div>
      </div>

      <SearchForm onSearch={handleSearch} />

      {filteredEmployees.length > 0 ? (
        <>
          <h2 id="textDIV">社員一覧</h2>
          <EmployeesInfoTable employees={filteredEmployees} />
        </>
      ) : (
        <p className="no-results">社員情報が見つかりませんでした。</p>
      )}

      <ManipulateButtons />
    </div>
  );
}
