// app/ui/EmployeesInfoTable.tsx
import { shain } from "@/app/lib/definitions";

export default function EmployeesInfoTable({
  employees,
}: {
  employees: shain[];
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
        {employees.map((emp) => (
          <tr key={emp.shain_code}>
            <td>
              <input type="radio" name="employee" value={emp.shain_code} />
            </td>
            <td>{emp.shain_shimei}</td>
            <td>{formatDate(emp.seinen_gappi)}</td>
            <td>{calculateAge(emp.seinen_gappi)}</td>
            <td>{emp.keiken_nensu}</td>
            <td>{emp.seibetsu === "0" ? "男" : "女"}</td>
            <td>{emp.jyusho}</td>
            <td>{emp.moyorieki_sen ?? ""}</td>
            <td>{emp.moyorieki_eki ?? ""}</td>
            <td>{emp.shikaku ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// function formatDate(dateString: string) {
//   const d = new Date(dateString);
//   return d.toLocaleDateString(); // YYYY/MM/DD形式などに整形
// }

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateAge(dateString: string) {
  const birth = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
