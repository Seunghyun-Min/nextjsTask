//app/employeesEdit/[shain_code]/page.tsx
import { getShainByCode } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/ui/employeesList/LogoutButton";
import EmployeesEditForm from "@/app/ui/employeesEdit/EmployeesEditForm";
import EmployeesCareerTable from "@/app/ui/employeesEdit/EmployeesCareerTable";

export default async function EmployeesEditPage({
  params,
}: {
  params: { shain_code: string };
}) {
  const cookieStore = await cookies();
  const shainCode = cookieStore.get("shain_code")?.value;
  const base = await getShainByCode(params.shain_code);
  if (!base) return notFound();

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
      <EmployeesEditForm initialData={base} />
      <EmployeesCareerTable keirekiList={base.keireki} />
    </div>
  );
}
