import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/ui/employeesList/LogoutButton";
import EmployeesAddForm from "@/app/ui/employeesAdd/EmployeesAddForm";

export default async function EmployeesAddPage() {
  const cookieStore = await cookies();
  const shainCode = cookieStore.get("shain_code")?.value;

  if (!shainCode) {
    redirect("/");
  }

  return (
    <div className="body">
      <div className="header">
        <div className="header-title">社員情報編集</div>
        <div className="logoutbuttoncontainer">
          <LogoutButton />
        </div>
      </div>
      {/* 上段入力エリア */}
      <EmployeesAddForm />
    </div>
  );
}
