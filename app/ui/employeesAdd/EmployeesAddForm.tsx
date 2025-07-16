// app/ui/employeesAdd/EmployeesAddForm.tsx
"use client";

import "./employeesAdd.css";

export default function EmployeesAddForm() {
  return (
    <div className="table-container">
      <table className="employeesinfo">
        <tbody>
          <tr>
            <td>社員コード：</td>
            <td>
              <input name="shain_code" id="shain_code" type="text" size={23} />
            </td>
            <td>資格：</td>
            <td>
              <input
                name="certificate"
                id="certificate"
                type="text"
                size={55}
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
              />
            </td>
            <td>生年月日：</td>
            <td>
              <input name="birthdate" id="birthdate" type="text" size={15} />
              (YYYY/MM/DD)
            </td>
          </tr>
          <tr>
            <td>住所：</td>
            <td>
              <input name="address" id="address" type="text" size={55} />
            </td>
            <td>学歴１：</td>
            <td>
              <input
                name="educationalbackground1_graduationperiod"
                id="educationalbackground1_graduationperiod"
                type="text"
                size={15}
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
              />{" "}
              線
              <input
                name="closeststationstation"
                id="closeststationstation"
                type="text"
                size={16}
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
              />
            </td>
          </tr>
          <tr>
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
                <input type="radio" value="男" name="gender" />男
              </label>
              <label>
                <input type="radio" value="女" name="gender" />女
              </label>
            </td>
            <td>学歴２：</td>
            <td>
              <input
                name="educationalbackground2_graduationperiod"
                id="educationalbackground2_graduationperiod"
                type="text"
                size={15}
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
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
