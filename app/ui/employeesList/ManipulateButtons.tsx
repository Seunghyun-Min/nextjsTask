// app/ui/ManipulateButtons.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useShainStore } from "@/app/store/shainStore";

export default function ManipulateButtons() {
  const router = useRouter();

  const handleEmployeesAddClick = () => {
    router.push("/employeesAdd");
  };

  const selectedShainCode = useShainStore((state) => state.selectedShainCode);

  const handleEditClick = () => {
    if (!selectedShainCode) {
      alert("社員を選択してください");
      return;
    }
    router.push(`/employeesEdit/${selectedShainCode}`);
  };

  return (
    <div className="employeesmanipulatebuttoncontainer">
      <button onClick={handleEmployeesAddClick}>社員追加</button>
      <button onClick={handleEditClick}>社員変更</button>
      <button onClick={() => confirm("削除しますか？") && alert("削除実行")}>
        社員削除
      </button>
    </div>
  );
}
