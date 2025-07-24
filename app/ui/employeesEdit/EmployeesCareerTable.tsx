// app/ui/employeesEdit/EmployeesCareerTable.tsx
function formatDate(date: string | null | undefined): string {
  if (!date) return "";
  return date.replace(/-/g, "/");
}

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
            <th style={{ backgroundColor: "#ffff99" }}>開始</th>
            <th style={{ backgroundColor: "#ffff99" }}>終了</th>
          </tr>
        </thead>
        <tbody>
          {keirekiList.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                経歴情報がありません。
              </td>
            </tr>
          ) : (
            keirekiList.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.start_date)}</td>
                <td>{formatDate(item.end_date)}</td>
                <td>{item.shokushu}</td>
                <td>{item.gyomu_naiyo}</td>
                <td>{item.kisyu}</td>
                <td>{item.os_db}</td>
                <td>{item.gengo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
