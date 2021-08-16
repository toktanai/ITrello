import React, { useState, useEffect,useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './bootstrap-4.6.0-dist/css/bootstrap.min.css'
import './materialize/css/materialize.min.css'
import './materialize/css/materialize.css';
import Alert from 'react-bootstrap/Alert'
import UserContext from './UserContext';

function EditTask(params) {
    let {task} = useParams();

    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');

    const [id, setId] = useState(0);
    const [cardTaskId, setCardTaskId] = useState({});
    const [taskText, setTaskText] = useState("");
    const [addedTaskDate, setAddedTaskDate] = useState(new Date());
    const [done,setDone] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=>{
        getCard(task);
        user.profile();
    },[]);

    const handleTaskTextChange = event =>{
        setTaskText(event.target.value);
    }

    const handleDoneChange = event =>{
        setDone(event.target.value);
    }
    const soldCheckbox = ({ target: { checked } }) => {
        console.log(done, checked);
        setDone(checked);
      };
    const handleCardId = event =>{
        setCardTaskId(event.target.value);
    }
    const handleTaskSubmit = event =>{
        const addedDate = new Date();
        
        // const card = {id,name,addedDate};
        var card = cardTaskId;
         const inputData = {id,card,taskText,addedDate,done};
         console.log(inputData);
        saveItem(inputData);
        event.preventDefault();

    }
    async function setData(data) {
        setId(data.id);
        setCardTaskId(data.card);
        setTaskText(data.taskText);
        setAddedTaskDate(data.addedDate);
        setDone(data.done);
    }
    async function getCard(Id) {
        console.log(Id);
        var id = Id;
        console.log(id);
        let response = await fetch("http://localhost:8090/api/getTask/"+Id, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            console.log(data);
            setData(data);
           
        }else{
            console.log("empty");
            setMessage("404 ITEM NOT FOUND");
        }
    }
    async function saveItem(data){
        const response = await fetch("http://localhost:8090/api/saveTask", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Saved" : "Error");
    }
    async function toDeleteItem() {
        var card = cardTaskId;
        var addedDate = addedTaskDate;
        const inputData = {id,card,taskText,addedDate,done};
    
        deleteCardTask(inputData);
    }
    async function deleteCardTask(data){
        const response = await fetch("http://localhost:8090/api/deleteCardTask", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Deleted" : "Error");
        console.log(message);
    }
    return<div className="row">
    <div className="col-8 offset-2 mt-5">
    <Alert variant="success" hidden = {message == ''}><Alert.Heading>{message}</Alert.Heading></Alert>
      
        <div class="card mb-3">
        <form onSubmit = {handleTaskSubmit}>
                <div class="card-content">
                <input style = {{fontSize:'28px'}} type = "text" class="card-title" value = {taskText} onChange = {handleTaskTextChange}/>
         
                <br/>
                <small style = {{fontSize:'15px',color:'grey'}}><strong>{new Date(addedTaskDate).toLocaleDateString() + " " + new Date(addedTaskDate).toLocaleTimeString()}</strong></small>
                </div>
                <div class="card-action">
                    <div class="switch">
                        <label>
                        Done
                        <input  type="checkbox" checked={done} onChange = {soldCheckbox}/>
                        <span class="lever"></span>
                        </label>
                    </div>
                </div>
                <div class="card-action">
                <button className="btn btn-success mr-2" type = "submit">EDIT</button>
                <a href ={`http://localhost:3000/editCard/` + cardTaskId.id} className="btn btn-danger" type = "button" onClick = {toDeleteItem}>DELETE</a>
                </div>
            </form>
        </div>
    </div>
</div>
}

export default EditTask;