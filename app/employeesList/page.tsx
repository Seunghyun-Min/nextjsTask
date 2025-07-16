import { fetchAllShain } from "@/app/lib/data";
import EmployeesInfoTable from "@/app/ui/employeesList/EmployeesInfoTable";
import SearchForm from "@/app/ui/employeesList/SearchForm";
import "../ui/employeesList/employeesList.css";
import LogoutButton from "@/app/ui/employeesList/LogoutButton";
import ManipulateButtons from "@/app/ui/employeesList/ManipulateButtons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EmployeesClientWrapper from "@/app/ui/employeesList/EmployeesClientWrapper";

export default async function EmployeesListPage() {
  // ✅ セッション確認：shain_codeがcookieに存在しない場合はログインへリダイレクト
  const cookieStore = await cookies();
  const shainCode = cookieStore.get("shain_code")?.value;

  if (!shainCode) {
    redirect("/");
  }

  // データベースから社員情報を取得（サーバー側で実行）
  const employees = await fetchAllShain();

  return <EmployeesClientWrapper employees={employees} />;
}
