// app/ui/ManipulateButtons.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ManipulateButtons() {
  const router = useRouter();

  const handleEmployeesAddClick = () => {
    router.push("/employeesAdd");
  };

  return (
    <div className="employeesmanipulatebuttoncontainer">
      <button onClick={handleEmployeesAddClick}>社員追加</button>
      <button onClick={() => alert("社員変更確認")}>社員変更</button>
      <button onClick={() => confirm("削除しますか？") && alert("削除実行")}>
        社員削除
      </button>
    </div>
  );
}
