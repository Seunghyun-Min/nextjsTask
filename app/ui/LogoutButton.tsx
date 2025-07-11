// app/ui/LogoutButton.tsx
"use client";
import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    if (confirm("ログアウトしますか？")) {
      // ここに実際のログアウト処理（API呼び出しなど）
      alert("ログアウトしました");
    }
  };

  return (
    <button className="logoutbutton" onClick={handleLogout}>
      ログアウト
    </button>
  );
}
