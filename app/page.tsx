"use client";
import "./ui/top.css";
import { useState } from "react";

export default function LoginPage() {
  const [shaincode, setShaincode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shaincode.trim()) {
      alert("社員コードを入力してください。");
      return;
    }

    if (!password.trim()) {
      alert("パスワードを入力してください。");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shaincode, password }),
    });

    if (res.ok) {
      // ログイン成功時の遷移（例：dashboard）
      window.location.href = "/dashboard";
    } else {
      setError("社員コード、またはパスワードが正しくありません。");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header-title">ログイン</div>
      </div>

      <div className="body">
        <form onSubmit={handleSubmit} className="loginForm">
          <table className="codeAndPassword">
            <tbody>
              <tr>
                <td>社員コード：</td>
                <td>
                  <input
                    type="text"
                    maxLength={6}
                    value={shaincode}
                    onChange={(e) =>
                      setShaincode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>パスワード：</td>
                <td>
                  <input
                    type="password"
                    maxLength={10}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="loginbuttoncontainer">
            <button type="submit" className="loginbutton">
              ログイン
            </button>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
