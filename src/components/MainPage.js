import {useState, useRef} from 'react';
import{Link} from 'react-router-dom';
import React from "react";
import ListPage from './ListPage';
import HeadLine from './HeadLine';

export default function MainPage(){
    const [isShow, setIsShow] = useState(false);

    const showPageHandler = () =>{
        setIsShow(true);
    }


    return(<>
        <HeadLine title=""/>
        <div className ="container">
                <div className="row mt-4">
                    <div className="col-3">
                        <button type="button" className="btn btn-primary" id="showBtn" onClick={showPageHandler} >Show Student</button>
                    </div>
                    <div className="col-3">
                        <Link to="/add" className="btn btn-primary" id="addBtn">Add Student</Link>
                    </div>
                    <div className="col-3">
                       <Link to="/update" className="btn btn-primary" id="updateBtn">Update Student</Link>
                    </div>
                    <div className="col-3">
                        <Link to="/delete" className="btn btn-primary" id="deleteBtn">delete Student</Link>
                    </div>
                </div>
                {isShow && <ListPage />}
        </div>
    </>);
}