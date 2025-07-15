"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/app/ui/SearchForm";
import EmployeesInfoTable from "@/app/ui/EmployeesInfoTable";
import ManipulateButtons from "@/app/ui/ManipulateButtons";
import LogoutButton from "@/app/ui/LogoutButton";
import "../ui/employeesList.css";
import { shain } from "@/app/lib/definitions";

export default function EmployeesClientWrapper({
  employees,
}: {
  employees: shain[];
}) {
  const uniqueShainMap = new Map<string, shain>();
  employees.forEach((emp) => {
    if (!uniqueShainMap.has(emp.shain_code)) {
      uniqueShainMap.set(emp.shain_code, emp);
    }
  });
  const uniqueEmployees = Array.from(uniqueShainMap.values());

  const [filteredEmployees, setFilteredEmployees] =
    useState<shain[]>(uniqueEmployees);

  const handleSearch = (criteria: any) => {
    const filtered = uniqueEmployees.filter((emp) => {
      if (
        criteria.employeename &&
        !emp.shain_shimei.includes(criteria.employeename)
      )
        return false;
      if (
        criteria.language &&
        !emp.programming_gengo?.includes(criteria.language)
      )
        return false;
      // 他の条件もここに追加
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
