// src/components/UpdatePage.js
import { useState, useRef, useEffect } from "react";
import HeadLine from "./HeadLine";
import { Link } from "react-router-dom";

const mockURL = "https://691828ba21a96359486eed15.mockapi.io/StudentsList";

export default function UpdatePage() {
  const [studentId, setStudentId] = useState("");
  const [targetApiId, setTargetApiId] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [updateCount, setUpdateCount] = useState(0);

  
  const [students, setStudents] = useState([]);

  const studentIdRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);


  const loadStudents = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", mockURL);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const list = JSON.parse(xhr.responseText);
        setStudents(list);
      } else {
        alert("학생 목록 불러오기 실패");
      }
    };

    xhr.onerror = () => {
      alert("학생 목록 불러오기 실패(네트워크)");
    };

    xhr.send();
  };

 
  useEffect(() => {
    loadStudents();
  }, []);


  const selectTargetHandler = () => {
    if (!studentId.trim()) {
      alert("수정할 사람의 학번을 입력하세요.");
      studentIdRef.current && studentIdRef.current.focus();
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", mockURL);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const list = JSON.parse(xhr.responseText);
        const target = list.find(
          (stu) => String(stu.studentId) === String(studentId)
        );

        if (!target) {
          alert("해당 학번을 가진 학생을 찾을 수 없습니다.");
          setTargetApiId(null);
          setName("");
          setAge("");
          setGender("");
          return;
        }

        setTargetApiId(target.id);
        setName(target.name || "");
        setAge(target.age || "");
        setGender(target.gender || "");
        setUpdateCount(0);
      } else {
        alert("학생 조회 실패");
      }
    };

    xhr.onerror = () => {
      alert("학생 조회 실패(네트워크)");
    };

    xhr.send();
  };


  const doUpdate = (next) => {
    if (!targetApiId) return;

    const payload = {
      studentId,
      name: next.name !== undefined ? next.name : name,
      age: next.age !== undefined ? next.age : age,
      gender: next.gender !== undefined ? next.gender : gender,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${mockURL}/${targetApiId}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUpdateCount((prev) => prev + 1);

        
        setStudents((prev) =>
          prev.map((stu) =>
            stu.id === String(targetApiId) ? { ...stu, ...payload } : stu
          )
        );
      } else {
        alert("학생 수정 실패");
      }
    };

    xhr.onerror = () => {
      alert("학생 수정 실패(네트워크)");
    };

    xhr.send(JSON.stringify(payload));
  };

 
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    doUpdate({ name: value });
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    doUpdate({ age: value });
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    doUpdate({ gender: value });
  };

  return (
    <>
    
      <HeadLine title="Update" />
     
      
      <div className="container">
        <div className="row">
         
          <div className="col-4 mt-3 m-3">
            <label htmlFor="stdId">학번: </label>
            <input
              id="stdId"
              type="number"
              className="form-control"
              placeholder="학번을 입력하세요"
              value={studentId}
              ref={studentIdRef}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={selectTargetHandler}
            >
              선택
            </button>
            <br />
            <hr />
            <p> {studentId} 학생의 정보를 수정합니다</p>
            <br/>

            <label htmlFor="name">이름: </label>
            <input
              id="name"
              className="form-control"
              placeholder="변경할 이름을 입력해주세요"
              value={name}
              ref={nameRef}
              onChange={handleNameChange}
              disabled={!targetApiId}
            />
            <br />

            <label htmlFor="age">나이: </label>
            <input
              id="age"
              type="number"
              className="form-control"
              placeholder="변경할 나이를 입력해주세요"
              value={age}
              ref={ageRef}
              onChange={handleAgeChange}
              disabled={!targetApiId}
            />
            <br />

            <label htmlFor="gender">성별: </label>
            <select
              className="form-select"
              value={gender}
              ref={genderRef}
              onChange={handleGenderChange}
              disabled={!targetApiId}
            >
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
            <br />

            <Link className="btn btn-primary" to="/">
              뒤로가기
            </Link>

            <p className="mt-3">
              이 페이지에서 총 수정 횟수: <b>{updateCount}</b> 번
            </p>
          </div>

        
          <div className="col-7 mt-5 ms-auto">
            <div className="row fw-bold border-bottom pb-2">
              <p className="col-3">Student Id</p>
              <p className="col-3">Name</p>
              <p className="col-3">Age</p>
              <p className="col-3">Gender</p>
            </div>

            {students.map((stu) => (
              <div className="row" key={stu.id}>
                <p className="col-3">{stu.studentId}</p>
                <p className="col-3">{stu.name}</p>
                <p className="col-3">{stu.age}</p>
                <p className="col-3">{stu.gender}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
