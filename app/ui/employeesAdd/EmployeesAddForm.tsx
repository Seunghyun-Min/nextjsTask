// ✅ 修正済：EmployeesAddForm に fetch 移動 / props 削除
"use client";

import { useRouter } from "next/navigation";
import "./employeesAdd.css";
import React, { useState } from "react";
import { EmployeeFormData } from "@/app/lib/definitions";

export default function EmployeesAddForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [shain_code, setShain_code] = useState("");
  const [employeename, setEmployeename] = useState("");
  const [address, setAddress] = useState("");
  const [closeststationline, setCloseststationline] = useState("");
  const [closeststationstation, setCloseststationstation] = useState("");
  const careeryear = "1";
  const [gender, setGender] = useState<"0" | "1" | "">("");
  const [certificate, setCertificate] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [
    educationalbackground_graduationperiod1,
    setEducationalbackground_graduationperiod1,
  ] = useState("");
  const [educationalbackground1, setEducationalbackground1] = useState("");
  const [
    educationalbackground_graduationperiod2,
    setEducationalbackground_graduationperiod2,
  ] = useState("");
  const [educationalbackground2, setEducationalbackground2] = useState("");

  const handleBack = () => router.back();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    const isHalfNumber = (text: string) => /^[0-9]*$/.test(text);
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const yearMonthRegex = /^\d{4}\/\d{2}$/;

    if (!shain_code) errors.push("社員コードを入力してください");
    if (shain_code.length > 6 || !isHalfNumber(shain_code))
      errors.push("社員コードは半角数字6文字以内で入力してください");

    if (!employeename) errors.push("社員名称を入力してください");
    if (employeename.length > 20)
      errors.push("社員名称は20文字以内で入力してください");

    if (!address) errors.push("住所を入力してください");
    if (address.length > 50) errors.push("住所は50文字以内で入力してください");

    if (!gender) errors.push("性別を選択してください");

    if (!birthdate || !dateRegex.test(birthdate)) {
      errors.push("生年月日は YYYY/MM/DD 形式で入力してください");
    }

    if (
      educationalbackground_graduationperiod1 &&
      !yearMonthRegex.test(educationalbackground_graduationperiod1)
    ) {
      errors.push("学歴1 卒業年月は YYYY/MM 形式で入力してください");
    }

    if (
      educationalbackground_graduationperiod2 &&
      !yearMonthRegex.test(educationalbackground_graduationperiod2)
    ) {
      errors.push("学歴2 卒業年月は YYYY/MM 形式で入力してください");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const data: EmployeeFormData = {
      shain_code,
      employeename,
      address,
      gender: gender as "0" | "1",
      birthdate,
      closeststationline,
      closeststationstation,
      careeryear,
      certificate,
      educationalbackground_graduationperiod1,
      educationalbackground1,
      educationalbackground_graduationperiod2,
      educationalbackground2,
    };

    try {
      const res = await fetch("/api/employeesAdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        router.push("/employeesList");
      } else {
        if (result.error === "入力された社員コードはすでに登録済みです") {
          setErrorMessage(result.error);
          return; // 処理終了、遷移しない
        } else {
          alert("登録に失敗しました。");
        }
      }
    } catch (error) {
      alert("ネットワークエラーが発生しました。");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table className="employeesinfo">
          <tbody>
            <tr>
              <td>社員コード：</td>
              <td>
                <input
                  name="shain_code"
                  id="shain_code"
                  type="text"
                  size={23}
                  value={shain_code}
                  onChange={(e) => setShain_code(e.target.value)}
                />
              </td>
              <td>資格：</td>
              <td>
                <input
                  name="certificate"
                  id="certificate"
                  type="text"
                  size={55}
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>社員名称：</td>
              <td>
                <input
                  name="employeename"
                  id="employeename"
                  type="text"
                  size={55}
                  value={employeename}
                  onChange={(e) => setEmployeename(e.target.value)}
                />
              </td>
              <td>生年月日：</td>
              <td>
                <input
                  name="birthdate"
                  id="birthdate"
                  type="text"
                  size={15}
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
                (YYYY/MM/DD)
              </td>
            </tr>
            <tr>
              <td>住所：</td>
              <td>
                <input
                  name="address"
                  id="address"
                  type="text"
                  size={55}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
              <td>学歴１：</td>
              <td>
                <input
                  name="educationalbackground_graduationperiod1"
                  id="educationalbackground_graduationperiod1"
                  type="text"
                  size={15}
                  value={educationalbackground_graduationperiod1}
                  onChange={(e) =>
                    setEducationalbackground_graduationperiod1(e.target.value)
                  }
                />
                (YYYY/MM)卒業
              </td>
            </tr>
            <tr>
              <td>最寄駅：</td>
              <td>
                <input
                  name="closeststationline"
                  id="closeststationline"
                  type="text"
                  size={16}
                  value={closeststationline}
                  onChange={(e) => setCloseststationline(e.target.value)}
                />{" "}
                線
                <input
                  name="closeststationstation"
                  id="closeststationstation"
                  type="text"
                  size={16}
                  value={closeststationstation}
                  onChange={(e) => setCloseststationstation(e.target.value)}
                />{" "}
                駅
              </td>
              <td></td>
              <td>
                <input
                  name="educationalbackground1"
                  id="educationalbackground1"
                  type="text"
                  size={55}
                  value={educationalbackground1}
                  onChange={(e) => setEducationalbackground1(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              {/* 社員追加の場合は経験年数は１年 */}
              <td>経験年数：</td>
              <td>
                <input
                  name="careeryear"
                  id="careeryear"
                  type="text"
                  value="1"
                  readOnly
                  size={5}
                />
                年
                <input type="text" size={5} style={{ visibility: "hidden" }} />
                性別：
                <label>
                  <input
                    type="radio"
                    value="0"
                    name="gender"
                    checked={gender === "0"}
                    onChange={(e) => setGender(e.target.value as "0" | "1")}
                  />
                  男
                </label>
                <label>
                  <input
                    type="radio"
                    value="1"
                    name="gender"
                    checked={gender === "1"}
                    onChange={(e) => setGender(e.target.value as "0" | "1")}
                  />
                  女
                </label>
              </td>
              <td>学歴２：</td>
              <td>
                <input
                  name="educationalbackground_graduationperiod2"
                  id="educationalbackground_graduationperiod2 "
                  type="text"
                  size={15}
                  value={educationalbackground_graduationperiod2}
                  onChange={(e) =>
                    setEducationalbackground_graduationperiod2(e.target.value)
                  }
                />
                (YYYY/MM)卒業
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <input
                  name="educationalbackground2"
                  id="educationalbackground2"
                  type="text"
                  size={55}
                  value={educationalbackground2}
                  onChange={(e) => setEducationalbackground2(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {errorMessage && <p className="text-red-600 font-bold">{errorMessage}</p>}

      <div className="experiencemanipulatebuttoncontainer">
        <button
          type="submit"
          className="experienceregistratebutton"
          id="registratebutton"
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
    </form>
  );
}
