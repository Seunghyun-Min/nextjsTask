// app/ui/employeesEdit/EmployeesCareerTable.tsx

export default function EmployeesCareerTable({
  keirekiList = [],
}: {
  keirekiList?: any[];
}) {
  return (
    <div
      className="experiencelistcontainer"
      style={{ maxHeight: "550px", overflowY: "auto" }}
    >
      <table
        className="experiencelist"
        style={{
          border: "1px solid black",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <colgroup>
          <col style={{ width: "7.5%" }} />
          <col style={{ width: "7.5%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>期間</th>
            <th rowSpan={2}>職種</th>
            <th rowSpan={2}>業務内容</th>
            <th rowSpan={2}>機種</th>
            <th rowSpan={2}>OS/DB</th>
            <th rowSpan={2}>言語</th>
          </tr>
          <tr>
            <th>開始</th>
            <th>終了</th>
          </tr>
        </thead>
        <tbody>
          {/* データがあれば map、今は空でもOK */}
          {/* 実装後はここに map を追加 */}
        </tbody>
      </table>
    </div>
  );
}
