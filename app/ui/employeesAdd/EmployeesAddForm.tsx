// ✅ 修正済：EmployeesAddForm に fetch 移動 / props 削除
"use client";

import { useRouter } from "next/navigation";
import "./employeesAdd.css";
import React, { useState } from "react";
import { EmployeeFormData } from "@/app/lib/definitions";

export default function EmployeesAddForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // const [shain_code, setShain_code] = useState("");
  // const [employeename, setEmployeename] = useState("");
  // const [address, setAddress] = useState("");
  // const [closeststationline, setCloseststationline] = useState("");
  // const [closeststationstation, setCloseststationstation] = useState("");
  // const careeryear = "1";
  // const [gender, setGender] = useState<"0" | "1" | "">("");
  // const [certificate, setCertificate] = useState("");
  // const [birthdate, setBirthdate] = useState("");
  // const [
  //   educationalbackground_graduationperiod1,
  //   setEducationalbackground_graduationperiod1,
  // ] = useState("");
  // const [educationalbackground1, setEducationalbackground1] = useState("");
  // const [
  //   educationalbackground_graduationperiod2,
  //   setEducationalbackground_graduationperiod2,
  // ] = useState("");
  // const [educationalbackground2, setEducationalbackground2] = useState("");
  const [formData, setFormData] = useState<EmployeeFormData>({
    shain_code: "",
    employeename: "",
    address: "",
    birthdate: "",
    careeryear: "1", // 固定値
    gender: "",
    certificate: null,
    closeststationline: null,
    closeststationstation: null,
    educationalbackground_graduationperiod1: null,
    educationalbackground1: null,
    educationalbackground_graduationperiod2: null,
    educationalbackground2: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => router.back();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    const isHalfNumber = (text: string) => /^[0-9]*$/.test(text);
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const yearMonthRegex = /^\d{4}\/\d{2}$/;

    const {
      shain_code,
      employeename,
      address,
      gender,
      birthdate,
      educationalbackground_graduationperiod1,
      educationalbackground_graduationperiod2,
    } = formData;

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

    // const data: EmployeeFormData = {
    //   shain_code,
    //   employeename,
    //   address,
    //   gender: gender as "0" | "1",
    //   birthdate,
    //   closeststationline,
    //   closeststationstation,
    //   careeryear,
    //   certificate,
    //   educationalbackground_graduationperiod1,
    //   educationalbackground1,
    //   educationalbackground_graduationperiod2,
    //   educationalbackground2,
    // };

    //   try {
    //     const res = await fetch("/api/employeesAdd", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData),
    //     });

    //     const result = await res.json();

    //     if (result.success) {
    //       router.push("/employeesList");
    //     } else {
    //       if (result.error === "入力された社員コードはすでに登録済みです") {
    //         setErrorMessage(result.error);
    //       } else {
    //         alert("登録に失敗しました。");
    //       }
    //     }
    //   } catch (error) {
    //     alert("ネットワークエラーが発生しました。");
    //     console.error(error);
    //   }
    // };

    try {
      const response = await fetch("/api/employeesAdd", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        if (result.error === "duplicate") {
          alert("社員コードがすでに存在しています");
        } else {
          alert("登録中にエラーが発生しました");
        }
      } else {
        router.push("/employeesList");
      }
    } catch (error) {
      alert("ネットワークエラーが発生しました");
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
                  value={formData.shain_code}
                  onChange={handleChange}
                />
              </td>
              <td>資格：</td>
              <td>
                <input
                  name="certificate"
                  id="certificate"
                  type="text"
                  size={55}
                  value={formData.certificate ?? ""}
                  onChange={handleChange}
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
                  value={formData.employeename}
                  onChange={handleChange}
                />
              </td>
              <td>生年月日：</td>
              <td>
                <input
                  name="birthdate"
                  id="birthdate"
                  type="text"
                  size={15}
                  value={formData.birthdate}
                  onChange={handleChange}
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
                  value={formData.address}
                  onChange={handleChange}
                />
              </td>
              <td>学歴１：</td>
              <td>
                <input
                  name="educationalbackground_graduationperiod1"
                  id="educationalbackground_graduationperiod1"
                  type="text"
                  size={15}
                  value={formData.educationalbackground_graduationperiod1 ?? ""}
                  onChange={handleChange}
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
                  value={formData.closeststationline ?? ""}
                  onChange={handleChange}
                />{" "}
                線
                <input
                  name="closeststationstation"
                  id="closeststationstation"
                  type="text"
                  size={16}
                  value={formData.closeststationstation ?? ""}
                  onChange={handleChange}
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
                  value={formData.educationalbackground1 ?? ""}
                  onChange={handleChange}
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
                    checked={formData.gender === "0"}
                    onChange={handleChange}
                  />
                  男
                </label>
                <label>
                  <input
                    type="radio"
                    value="1"
                    name="gender"
                    checked={formData.gender === "1"}
                    onChange={handleChange}
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
                  value={formData.educationalbackground_graduationperiod2 ?? ""}
                  onChange={handleChange}
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
                  value={formData.educationalbackground2 ?? ""}
                  onChange={handleChange}
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
