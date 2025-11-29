// src/components/AddPage.js
import { useState, useRef, useEffect } from "react";
import HeadLine from "./HeadLine";
import {Link} from 'react-router-dom';
import ListPage from "./ListPage";

const mockURL = "https://691828ba21a96359486eed15.mockapi.io/StudentsList";

export default function AddPage() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("남");
  const [isShow, setIsShow] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const studentIdRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);

  const addStudentHandler = () => {
  if (!studentId.trim()) {
    alert("학번을 입력하세요.");
    studentIdRef.current.focus();
    return;
  }
  if (!name.trim()) {
    alert("이름을 입력하세요.");
    nameRef.current.focus();
    return;
  }
  if (!age.trim() || isNaN(Number(age))) {
    alert("나이를 숫자로 입력하세요.");
    ageRef.current.focus();
    return;
  }


  const xhrGet = new XMLHttpRequest();
  xhrGet.open("GET", mockURL);

  xhrGet.onload = () => {
    if (xhrGet.status === 200) {
      const list = JSON.parse(xhrGet.responseText);

      const exists = list.some(
        (stu) => String(stu.studentId) === String(studentId)
      );

      if (exists) {
        alert("이미 존재하는 studentId 입니다. 다른 ID를 사용하세요.");
        studentIdRef.current && studentIdRef.current.focus();
        return;
      }

    
      const newStudent = {studentId,name,age,gender,};

      const xhr = new XMLHttpRequest();
      xhr.open("POST", mockURL);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status === 201 || xhr.status === 200) {
          alert("학생이 추가되었습니다.");
          
          setStudentId("");
          setName("");
          setAge("");
          setGender("남");

          setIsShow(true);
          setReloadFlag((prev) => prev + 1);
        } else {
          console.error("Error:", xhr.status);
          alert("학생 추가 실패");
        }
      };

      xhr.onerror = () => {
        console.error("Request error");
        alert("학생 추가 실패");
      };

      xhr.send(JSON.stringify(newStudent));
    } else {
      alert("학생 목록 조회 실패");
    }
  };

  xhrGet.onerror = () => {
    alert("학생 목록 조회 실패(네트워크)");
  };

  xhrGet.send();
};

 return (
  <>
    <HeadLine title="Add" />

    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="row mb-2 align-items-center">
            <label className="col-4 col-form-label text-end">Student Id</label>
            <div className="col-6">
              <input type="text" className="form-control" ref={studentIdRef} value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
            </div>
          </div>

     
          <div className="row mb-2 align-items-center">
            <label className="col-4 col-form-label text-end">Name</label>
            <div className="col-6">
              <input  type="text"  className="form-control"  ref={nameRef}  value={name}  onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>

          
          <div className="row mb-2 align-items-center">
            <label className="col-4 col-form-label text-end">Age</label>
            <div className="col-6">
              <input type="number" className="form-control" ref={ageRef} value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>
          </div>

         
          <div className="row mb-3 align-items-center">
            <label className="col-4 col-form-label text-end">Gender</label>
            <div className="col-6">
              <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </div>
          </div>

   
          <div className="row mt-3">
            <div className="col-12 d-flex gap-3">
              <button  className="btn btn-primary flex-fill"  onClick={addStudentHandler}>
                Add Student
              </button>
              <Link  to="/"  className="btn btn-primary flex-fill"  onClick={() => setIsShow(false)}>
                Back
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>

    {isShow && <ListPage reloadFlag={reloadFlag} />}
  </>
);

}
