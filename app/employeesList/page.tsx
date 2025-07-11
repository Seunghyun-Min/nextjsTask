import { fetchAllShain } from "@/app/lib/data";
import EmployeesInfoTable from "@/app/ui/EmployeesInfoTable";
import SearchForm from "@/app/ui/SearchForm";
import "../ui/employeesList.css";

export default async function EmployeesPage() {
  const employees = await fetchAllShain();

  return (
    <div className="body">
      <div className="header">
        <div className="header-title">社員一覧</div>
      </div>

      <SearchForm />

      {employees.length > 0 && (
        <>
          <h2 id="textDIV">社員一覧</h2>
          <EmployeesInfoTable employees={employees} />
        </>
      )}
    </div>
  );
}
