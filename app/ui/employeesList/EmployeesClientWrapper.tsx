//app/ui/EmplyeesClientWrapper.tsx
"use client";

import { useState } from "react";
import SearchForm from "@/app/ui/employeesList/SearchForm";
import EmployeesInfoTable from "@/app/ui/employeesList/EmployeesInfoTable";
import ManipulateButtons from "@/app/ui/employeesList/ManipulateButtons";
import LogoutButton from "@/app/ui/employeesList/LogoutButton";
import "./employeesList.css";
import { shainWithKeireki } from "@/app/lib/definitions";

export default function EmployeesClientWrapper({
  employees,
}: {
  employees: shainWithKeireki[];
}) {
  // 初期表示は社員単位に絞る
  const uniqueMap = new Map<string, shainWithKeireki>();
  employees.forEach((emp) => {
    if (!uniqueMap.has(emp.shain_code)) {
      uniqueMap.set(emp.shain_code, emp);
    }
  });
  const uniqueEmployees = Array.from(uniqueMap.values());

  const [filteredEmployees, setFilteredEmployees] =
    useState<shainWithKeireki[]>(uniqueEmployees);

  const handleSearch = (criteria: any) => {
    const filtered = employees.filter((emp) => {
      //社員名称
      if (
        criteria.employeename &&
        !emp.shain_shimei.includes(criteria.employeename)
      )
        return false;
      //最寄駅（線）
      if (
        criteria.closeststationline &&
        !(emp.moyorieki_sen ?? "")
          .toLowerCase()
          .includes(criteria.closeststationline.toLowerCase())
      )
        return false;
      //最寄駅（駅）
      if (
        criteria.closeststationstation &&
        !(emp.moyorieki_eki ?? "").includes(criteria.closeststationstation)
      )
        return false;
      //機種
      if (
        criteria.kishu &&
        !(
          (emp.kishu1 ?? "")
            .toLowerCase()
            .includes(criteria.kishu.toLowerCase()) ||
          (emp.kishu2 ?? "")
            .toLowerCase()
            .includes(criteria.kishu.toLowerCase()) ||
          (emp.kishu3 ?? "")
            .toLowerCase()
            .includes(criteria.kishu.toLowerCase())
        )
      )
        return false;
      //OS・DB/DC
      if (
        criteria.os &&
        !(
          (emp.os_db1 ?? "")
            .toLowerCase()
            .includes(criteria.os.toLowerCase()) ||
          (emp.os_db2 ?? "")
            .toLowerCase()
            .includes(criteria.os.toLowerCase()) ||
          (emp.os_db3 ?? "").toLowerCase().includes(criteria.os.toLowerCase())
        )
      )
        return false;
      //資格
      if (
        criteria.certificate &&
        !(emp.shikaku ?? "")
          .toLowerCase()
          .includes(criteria.certificate.toLowerCase())
      )
        return false;
      //言語
      if (
        criteria.language &&
        !(
          (emp.gengo1 ?? "")
            .toLowerCase()
            .includes(criteria.language.toLowerCase()) ||
          (emp.gengo2 ?? "")
            .toLowerCase()
            .includes(criteria.language.toLowerCase()) ||
          (emp.gengo3 ?? "")
            .toLowerCase()
            .includes(criteria.language.toLowerCase())
        )
      )
        return false;
      //経験年数
      if (
        criteria.careeryear &&
        emp.keiken_nensu !== Number(criteria.careeryear)
      )
        return false;
      //年齢
      if (criteria.agelowerlimit || criteria.ageupperlimit) {
        const birthDate = new Date(emp.seinen_gappi);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        if (criteria.agelowerlimit && age < parseInt(criteria.agelowerlimit)) {
          return false;
        }

        if (criteria.ageupperlimit && age > parseInt(criteria.ageupperlimit)) {
          return false;
        }
      }
      //性別
      if (criteria.gender !== undefined && emp.seibetsu !== criteria.gender) {
        return false;
      }

      return true;
    });

    // ここで社員単位に絞る
    const uniqueMap = new Map<string, shainWithKeireki>();
    filtered.forEach((emp) => {
      if (!uniqueMap.has(emp.shain_code)) {
        uniqueMap.set(emp.shain_code, emp);
      }
    });

    setFilteredEmployees(Array.from(uniqueMap.values()));
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
