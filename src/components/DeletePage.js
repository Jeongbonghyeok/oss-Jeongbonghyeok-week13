
import { useState } from "react";
import HeadLine from "./HeadLine";
import {Link} from 'react-router-dom';
import ListPage from "./ListPage";


const mockURL = "https://691828ba21a96359486eed15.mockapi.io/StudentsList";

export default function DeletePage() {
  const [studentId, setStudentId] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(0);
 

  const deleteStudent = () => {
    if (!studentId.trim()) {
      alert("studentId를 입력하세요.");
      return;
    }

   
    const xhrGet = new XMLHttpRequest();
    xhrGet.open("GET", mockURL);

    xhrGet.onload = () => {
      if (xhrGet.status === 200) {
        const list = JSON.parse(xhrGet.responseText);

       
        const target = list.find(
          (stu) => String(stu.studentId) === String(studentId)
        );

        if (!target) {
          alert("해당 studentId를 가진 학생을 찾을 수 없습니다.");
          return;
        }

        const key = target.id;

        if (!window.confirm(`${studentId} 학생을 정말 삭제할까요?`)) return;

      
        const xhrDel = new XMLHttpRequest();
        xhrDel.open("DELETE", `${mockURL}/${key}`);

        xhrDel.onload = () => {
          if (xhrDel.status === 200 || xhrDel.status === 204) {
            alert("학생 삭제 완료");
            setStudentId("");
            setReloadFlag((prev) => prev + 1);
          } else {
            console.error("Delete error", xhrDel.status);
            alert("학생 삭제 실패");
          }
        };

        xhrDel.onerror = () => {
          console.error("DELETE error");
          alert("학생 삭제 실패(네트워크)");
        };

        xhrDel.send();
      } else {
        console.error("GET error", xhrGet.status);
        alert("학생 조회 실패");
      }
    };

    xhrGet.onerror = () => {
      console.error("GET error");
      alert("학생 조회 실패(네트워크)");
    };

    xhrGet.send();
  };

  return (
    <>
      <HeadLine title="Delete" />
     
      <div className="container mt-3">
        <div className="row mb-3">
          <label className="col-2 text-end">Student Id</label>
          <div className="col-4">
            <input className="form-control"type="number" placeholder="student id that want to delete" value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
          </div>
          <button className="btn btn-primary col-2" onClick={deleteStudent} to="/">
          Delete Student
          </button>
          <Link className="btn btn-primary col-2  ms-3" to="/">뒤로가기</Link>
        </div>
      </div>
      {isShow && <ListPage reloadFlag={reloadFlag} />}
    </>
  );
}
