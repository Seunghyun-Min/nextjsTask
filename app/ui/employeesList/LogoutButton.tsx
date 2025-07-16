// app/ui/LogoutButton.tsx
"use client";
import React from "react";

export default function LogoutButton() {
  const handleLogout = async () => {
    if (confirm("ログアウトしますが、よろしいですか？")) {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    }
  };

  return (
    <button className="logoutbutton" onClick={handleLogout}>
      ログアウト
    </button>
  );
}
