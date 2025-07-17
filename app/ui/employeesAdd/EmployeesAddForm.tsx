// app/ui/employeesAdd/EmployeesAddForm.tsx
"use client";

import { useRouter } from "next/navigation";
import "./employeesAdd.css";
import React, { useState } from "react";
import { EmployeeFormData } from "@/app/lib/definitions";

export default function EmployeesAddForm({
  addEmployee,
}: {
  addEmployee: (data: EmployeeFormData) => void;
}) {
  const router = useRouter();

  //社員登録用input定義
  const [shain_code, setShain_code] = useState("");
  const [employeename, setEmployeename] = useState("");
  const [address, setAddress] = useState("");
  const [closeststationline, setCloseststationline] = useState("");
  const [closeststationstation, setCloseststationstation] = useState("");
  // const [careeryear, setCareeryear] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    const isHalfWidth = (text: string) => /^[\x20-\x7E]*$/.test(text);
    const isHalfNumber = (text: string) => /^[0-9]*$/.test(text);
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const yearMonthRegex = /^\d{4}\/\d{2}$/;

    // 社員コード
    if (shain_code === "") errors.push("社員コードを入力してください");
    if (shain_code.length > 6) errors.push("半角6文字以内で入力して下さい");
    if (shain_code.length > 0 && !isHalfNumber(shain_code)) {
      errors.push("半角数字のみで入力して下さい");
    }
    // + 既に社員コードがあって重複になる場合の処理も必要！

    //社員名称
    if (employeename === "") errors.push("社員名称を入力してください");
    if (employeename.length > 20)
      errors.push("社員名称：　20文字以内で入力して下さい");

    //住所
    if (address === "") errors.push("住所を入力してください。");
    if (address.length > 50) errors.push("住所：　50文字以内で入力して下さい");

    // 最寄駅
    if (closeststationline.length > 20)
      errors.push("最寄駅－線：　20文字以内で入力して下さい");
    if (closeststationstation.length > 20)
      errors.push("最寄駅：　20文字以内で入力して下さい");

    // 性別
    if (gender === "") errors.push("性別を入力してください");

    // 資格
    if (certificate.length > 50)
      errors.push("資格：　50文字以内で入力して下さい");

    // 生年月日
    if (birthdate === "") errors.push("生年月日を入力してください");
    if (birthdate.length > 10)
      errors.push("生年月日：　半角10文字以内で入力して下さい");
    if (birthdate && !dateRegex.test(birthdate)) {
      errors.push("生年月日：　YYYY/MM/DDのフォーマットで入力して下さい");
    } else if (birthdate) {
      const [year, month, day] = birthdate.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        errors.push(
          "生年月日が日付として正しくありません。正しい日付を入力してください"
        );
      }
    }

    // 学歴1
    if (educationalbackground_graduationperiod1.length > 7)
      errors.push("学歴１：　半角7文字以内で入力して下さい");

    if (educationalbackground_graduationperiod1) {
      if (!yearMonthRegex.test(educationalbackground_graduationperiod1)) {
        errors.push("学歴１：　YYYY/MMのフォーマットで入力して下さい");
      } else {
        const [y1, m1] = educationalbackground_graduationperiod1
          .split("/")
          .map(Number);
        const d1 = new Date(y1, m1 - 1);
        if (d1.getFullYear() !== y1 || d1.getMonth() !== m1 - 1) {
          errors.push(
            "学歴１年月が日付として正しくありません。正しい日付を入力してください"
          );
        }
      }
    }

    if (educationalbackground1.length > 20)
      errors.push("学歴１：　20文字以内で入力して下さい");

    // 学歴2
    if (educationalbackground_graduationperiod2.length > 7)
      errors.push("学歴２：　半角7文字以内で入力して下さい");

    if (educationalbackground_graduationperiod2) {
      if (!yearMonthRegex.test(educationalbackground_graduationperiod2)) {
        errors.push("学歴２：　YYYY/MMのフォーマットで入力して下さい");
      } else {
        const [y2, m2] = educationalbackground_graduationperiod2
          .split("/")
          .map(Number);
        const d2 = new Date(y2, m2 - 1);
        if (d2.getFullYear() !== y2 || d2.getMonth() !== m2 - 1) {
          errors.push(
            "学歴２年月が日付として正しくありません。正しい日付を入力してください。"
          );
        }
      }
    }

    if (educationalbackground2.length > 20)
      errors.push("学歴2：　20文字以内で入力して下さい");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const data: EmployeeFormData = {
      shain_code,
      employeename,
      address,
      gender: gender !== "" ? gender : undefined,
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

    addEmployee(data);
  };

  const handleBack = () => {
    router.push("/employeesList");
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
