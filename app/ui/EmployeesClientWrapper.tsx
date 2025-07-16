"use client";

import { useState } from "react";
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
      if (
        criteria.employeename &&
        !emp.shain_shimei.includes(criteria.employeename)
      )
        return false;

      if (
        criteria.closeststationline &&
        !(emp.moyorieki_sen ?? "").includes(criteria.closeststationline)
      )
        return false;

      if (
        criteria.closeststationstation &&
        !(emp.moyorieki_eki ?? "").includes(criteria.closeststationstation)
      )
        return false;

      if (
        criteria.kishu &&
        !(
          emp.kishu1?.includes(criteria.kishu) ||
          emp.kishu2?.includes(criteria.kishu) ||
          emp.kishu3?.includes(criteria.kishu)
        )
      )
        return false;

      if (
        criteria.os &&
        !(
          emp.os_db1?.includes(criteria.os) ||
          emp.os_db2?.includes(criteria.os) ||
          emp.os_db3?.includes(criteria.os)
        )
      )
        return false;

      if (
        criteria.certificate &&
        !(emp.shikaku ?? "").includes(criteria.certificate)
      )
        return false;

      if (
        criteria.language &&
        !(
          emp.gengo1?.includes(criteria.language) ||
          emp.gengo2?.includes(criteria.language) ||
          emp.gengo3?.includes(criteria.language)
        )
      )
        return false;

      if (
        criteria.careeryear &&
        emp.keiken_nensu !== Number(criteria.careeryear)
      )
        return false;

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
