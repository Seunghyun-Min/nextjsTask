//app/ui/employeesEdit/EmployeesEditForm.tsx
"use client";

import { useRouter } from "next/navigation";
import "./employeesEdit.css";
import { useState } from "react";
import { shainWithKeireki } from "@/app/lib/definitions";
import { useEditFormStore } from "@/app/store/editFormStore";
import type { EmployeeFormData } from "@/app/lib/definitions";

type Props = {
  initialData: Omit<shainWithKeireki, "keireki"> & {
    keireki: any[];
  };
};

export default function EmployeesEditForm({ initialData }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    shain_code: initialData.shain_code,
    employeename: initialData.shain_shimei,
    address: initialData.jyusho,
    birthdate: formatDate(initialData.seinen_gappi),
    careeryear: initialData.keiken_nensu,
    gender: initialData.seibetsu,
    certificate: initialData.shikaku ?? "",
    closeststationline: initialData.moyorieki_sen ?? "",
    closeststationstation: initialData.moyorieki_eki ?? "",
    educationalbackground_graduationperiod1: formatYearMonth(
      initialData.gakureki_nen1 ?? ""
    ),
    educationalbackground1: initialData.gakureki1 ?? "",
    educationalbackground_graduationperiod2: formatYearMonth(
      initialData.gakureki_nen2 ?? ""
    ),
    educationalbackground2: initialData.gakureki2 ?? "",
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

    try {
      const response = await fetch("/api/employeesEdit", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("更新中にエラーが発生しました");
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
                  type="text"
                  size={23}
                  value={formData.shain_code}
                  readOnly
                />
              </td>
              <td>資格：</td>
              <td>
                <input
                  name="certificate"
                  type="text"
                  size={55}
                  value={formData.certificate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>社員名称：</td>
              <td>
                <input
                  name="employeename"
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
                  type="text"
                  size={15}
                  value={formData.educationalbackground_graduationperiod1}
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
                  type="text"
                  size={16}
                  value={formData.closeststationline}
                  onChange={handleChange}
                />
                線
                <input
                  name="closeststationstation"
                  type="text"
                  size={16}
                  value={formData.closeststationstation}
                  onChange={handleChange}
                />
                駅
              </td>
              <td></td>
              <td>
                <input
                  name="educationalbackground1"
                  type="text"
                  size={55}
                  value={formData.educationalbackground1}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>経験年数：</td>
              <td>
                <input
                  name="careeryear"
                  type="text"
                  value={formData.careeryear}
                  size={5}
                  onChange={handleChange}
                />
                年
                <input type="text" size={5} style={{ visibility: "hidden" }} />
                性別：
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={formData.gender === "0"}
                    onChange={handleChange}
                  />
                  男
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="1"
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
                  type="text"
                  size={15}
                  value={formData.educationalbackground_graduationperiod2}
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
                  type="text"
                  size={55}
                  value={formData.educationalbackground2}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="experiencemanipulatebuttoncontainer">
        <button type="submit" className="experienceregistratebutton">
          更新
        </button>
        <button
          type="button"
          className="experiencegobackbutton"
          onClick={handleBack}
        >
          戻る
        </button>
      </div>
    </form>
  );
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  if (typeof date === "string") {
    return date.replace(/-/g, "/"); // ← 修正ポイント
  }
  if (date instanceof Date) {
    return date.toISOString().split("T")[0].replace(/-/g, "/"); // ← 修正ポイント
  }
  return "";
}

function formatYearMonth(value: string | undefined): string {
  if (!value || value.length !== 6) return value ?? "";
  return `${value.substring(0, 4)}/${value.substring(4, 6)}`;
}

const handleFormChange = (data: EmployeeFormData) => {
  useEditFormStore.getState().setEditedShainData(data);
};
