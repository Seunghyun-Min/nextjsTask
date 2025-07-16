// app/ui/employeesAdd/BottomSection.tsx
"use client";

export default function BottomSection() {
  return (
    <div className="bottom-section">
      <h3>業務経歴一覧</h3>
      <table className="keireki-table">
        <thead>
          <tr>
            <th>開始</th>
            <th>終了</th>
            <th>職種</th>
            <th>業務内容</th>
            <th>機種</th>
            <th>OS/DB</th>
            <th>言語</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td>
                <input type="text" name={`kikan_kaishi_${i}`} />
              </td>
              <td>
                <input type="text" name={`kikanshuryo_${i}`} />
              </td>
              <td>
                <input type="text" name={`shokushu_${i}`} />
              </td>
              <td>
                <input type="text" name={`gyoumu_naiyo_${i}`} />
              </td>
              <td>
                <input type="text" name={`kishu_${i}`} />
              </td>
              <td>
                <input type="text" name={`osdb_${i}`} />
              </td>
              <td>
                <input type="text" name={`gengo_${i}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-buttons">
        <button type="submit">登録</button>
        <button type="button" onClick={() => history.back()}>
          戻る
        </button>
      </div>
    </div>
  );
}
