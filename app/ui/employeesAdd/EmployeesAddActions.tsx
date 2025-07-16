"use client";

import { useRouter } from "next/navigation";
import "./employeesAdd.css";

export default function EmployeesAddActions() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("登録処理を実行します（今後DB連携予定）");
    // ここでAPI連携 or POST処理を実装予定
  };

  const handleBack = () => {
    router.push("/employeesList"); // ← 一覧画面のルートに変更してください
  };

  return (
    <div className="experiencemanipulatebuttoncontainer">
      <button
        type="submit"
        className="experienceregistratebutton"
        id="registratebutton"
        onClick={handleSubmit}
      >
        登録
      </button>
      <button
        type="button"
        className="experiencegobackbutton"
        id="gobackbutton"
        onClick={handleBack}
      >
        戻る
      </button>
    </div>
  );
}
