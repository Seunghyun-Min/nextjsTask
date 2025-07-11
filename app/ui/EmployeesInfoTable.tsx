import React from "react";
//import { Employee } from "../employees/page";

export default function EmployeesInfoTable({}: //  employees,
{
  // employees: Employee[];
}) {
  return (
    <table className="employeeslist" border={1}>
      <thead>
        <tr>
          <th></th>
          <th>社員名称</th>
          <th>生年月日</th>
          <th>年齢</th>
          <th>経験年数</th>
          <th>性別</th>
          <th>住所</th>
          <th>最寄駅：線</th>
          <th>最寄駅：駅</th>
          <th>資格</th>
        </tr>
      </thead>
      <tbody>
        {/* {employees.map((emp) => (
          <tr key={emp.code}>
            <td>
              <input type="radio" name="employee" value={emp.code} />
            </td>
            <td>{emp.name}</td>
            <td>{emp.birth}</td>
            <td>{emp.age}</td>
            <td>{emp.experience}</td>
            <td>{emp.gender}</td>
            <td>{emp.address}</td>
            <td>{emp.line}</td>
            <td>{emp.station}</td>
            <td>{emp.certificate}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}
