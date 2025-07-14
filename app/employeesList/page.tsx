import { fetchAllShain } from "@/app/lib/data";
import EmployeesInfoTable from "@/app/ui/EmployeesInfoTable";
import SearchForm from "@/app/ui/SearchForm";
import "../ui/employeesList.css";
import LogoutButton from "@/app/ui/LogoutButton";
import ManipulateButtons from "@/app/ui/ManipulateButtons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {
  // ✅ セッション確認：shain_codeがcookieに存在しない場合はログインへリダイレクト
  const cookieStore = await cookies();
  const shainCode = cookieStore.get("shain_code")?.value;

  console.log(
    "ς( ˶ᵔөᵔ˶ς)*̥₊˚ログイン中の社員コード:",
    shainCode,
    "ς( ˶ᵔөᵔ˶ς)*̥₊˚"
  );

  if (!shainCode) {
    redirect("/login");
  }

  // データベースから社員情報を取得（サーバー側で実行）
  const employees = await fetchAllShain();

  return (
    <div className="body">
      <div className="header">
        <div className="header-title">社員一覧</div>
        <div className="logoutbuttoncontainer">
          <LogoutButton />
        </div>
      </div>

      {/* 検索フォーム（クライアントコンポーネント） */}
      <SearchForm />

      {/* 社員情報がある場合のみ表示 */}
      {employees.length > 0 ? (
        <>
          <h2 id="textDIV">社員一覧</h2>
          <EmployeesInfoTable employees={employees} />
        </>
      ) : (
        <p className="no-results">社員情報が見つかりませんでした。</p>
      )}

      <ManipulateButtons />
    </div>
  );
}
