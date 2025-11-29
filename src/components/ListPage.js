import {useState, useRef, useEffect} from 'react';
import React from 'react';

function ListPage({reloadFlag}){
    const mockURL = "https://691828ba21a96359486eed15.mockapi.io/StudentsList";
    const [students, setStudents] = useState([]);  
   
  
    const getStudents = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", mockURL);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                setStudents(data);               
            } else {
                console.error("Error fetching data");
                alert("데이터 불러오기 실패");
            }
        };
        xhr.onerror = () => {
          console.error("Request error");
          alert("학생 추가 실패");
        };  
        xhr.send();
    }

       useEffect(() => {
        getStudents();
      }, [reloadFlag]); 

    const showPageHandler = (e) => {
        getStudents();
    };
    return(<>
       <div className="row mt-4" id="listArea">
            <hr/>
            <div className="row mt-4 ms-3" id="tableArea">
                <p className="col-3">Student Id</p>
                <p className="col-3">Name</p>
                <p className="col-3">Age</p>
                <p className="col-3">Gender</p>
            </div>
            
            {/**여기다가 그 뭐냐 서버에 있던 내용 나오게 할 거임. */}
            {students.map((stu) => (
               <React.Fragment key={stu.id} >
                 <p className="col-3 ms-4">{stu.studentId}</p>
                 <p className="col-3 ">{stu.name}</p>
                 <p className="col-3 ">{stu.age}</p>
                 <p className="col-2 ">{stu.gender}</p>
               </React.Fragment>
             ))}
          
        </div>
    </>);
}
export default ListPage;