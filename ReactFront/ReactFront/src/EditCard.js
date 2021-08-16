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
import Moment from 'react-moment';
import UserContext from './UserContext';

function ListCardTasks({cardTaskId,taskId}) {
    const [data, setData] = useState([]);
    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');

    async function loadData() {
        let response = await fetch("http://localhost:8090/api/allCardTask", {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        let tableData = await response.json();
        console.log(tableData);
        setData(tableData);
    }
    useEffect(() => {
        loadData();
        user.profile();
      }, [taskId]);
    return <div >
           {data?.map(row=>(
               row.card != null ? ( 
                <div class="card mb-3" hidden = {row.card.id != cardTaskId} key = {row.id}>
                  
                    <div class="card-content">
                    <p>{row.taskText}</p>
                    <br/>
                    <small style = {{fontSize:'15px',color:'grey'}}><strong>{new Date(row.addedDate).toLocaleDateString() + " " + new Date(row.addedDate).toLocaleTimeString()}</strong></small>
                    </div>
                    <div class="card-action">
                        <div class="switch">
                            <label>
                            Done
                            <input checked = {row.done} type="checkbox"/>
                            <span class="lever"></span>
                            </label>
                        </div>
                    </div>
                    <div class="card-action">
                    <a style = {{color:'#26a69a'}} href =  {`/editTask/${row.id}`}><strong>EDIT</strong></a>
                    <a style = {{color:'#26a69a'}}   ><strong>DELETE</strong></a>
        
                    </div>
                </div>
               ):<div></div>
               
       ))}
    </div>
}


function EditCard() {
    
    let {cardId} = useParams();
    const user = useContext(UserContext);
    const [cardData,setCardData] = useState([]);
    let jwt = localStorage.getItem('jwtToken');
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [message, setMessage] = useState("");

    const [taskId, setTaskId] = useState(0);
    const [cardTaskId, setCardTaskId] = useState(0);
    const [taskText, setTaskText] = useState("");
    const [addedTaskDate, setAddedTaskDate] = useState(new Date());
    const [done,setDone] = useState(false);

    const handleNameChange = event =>{
        setName(event.target.value);
    }
    useEffect(()=>{
        getCard(cardId);
    },[]);

    const handleTaskTextChange = event =>{
        setTaskText(event.target.value);
    }

    const handleDoneChange = event =>{
        setDone(event.target.value);
    }
    const handleCardId = event =>{
        setCardTaskId(event.target.value);
    }
    const handleTaskSubmit = event =>{
        const addedDate = new Date();
        
        const card = {id,name,addedDate};
        const inputData = {card,taskText,addedDate,done};
        console.log(inputData);
        addTask(inputData);
        setTaskText("");
        event.preventDefault();

    }
   
    const handleSubmit = event =>{

        const inputData = {id, name,addedDate};
        saveItem(inputData);
        event.preventDefault();

    }
    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setAddedDate(data.addedDate);
    }

    async function addTask(data){
        const response = await fetch("http://localhost:8090/api/addCardTask", {
          method: "POST",
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
        setTaskId(messData.id);
        console.log(messData);
      }

    async function getCard(cardId) {
        let response = await fetch("http://localhost:8090/api/getCard/"+cardId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            setData(data);
            setCardData(data);
           
        }else{
            console.log("empty");
            setMessage("404 ITEM NOT FOUND");
        }
    }
    async function saveItem(data){
        const response = await fetch("http://localhost:8090/api/saveitem", {
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
 

    return <div className="row">
    <div className="col-8 offset-2 mt-5">
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title" value = {name}>{name}</span>
          <p >{new Date(addedDate).toLocaleDateString() +" " +  new Date(addedDate).toLocaleTimeString()}</p>
        </div>
        <div class="card-action">
         <a style = {{backgroundColor:'#546e7a',color:'white'}} href =  {`/edit/${id}`}><strong>EDIT</strong></a>
          <a  href = "#"  style = {{backgroundColor:'#546e7a',color:'white'}}><strong>DELETE</strong></a>
        </div>
      </div>
      <br/>
      <div class="card">
        <form onSubmit = {handleTaskSubmit} >
            <input type = "hidden" value = {cardId} onChange = {handleCardId} />
            <div class="card-content" style = {{padding:'10px 10px 0px 10px'}}>
            <div class="input-field col">
                <input id="last_name" type="text"   class="validate" value = {taskText} onChange = {handleTaskTextChange}/>
                <label for="last_name" >Create new task</label>
            </div>
            </div>
            <div class="card-content" style = {{padding:'0px 10px 20px 10px'}}>
            <button class="waves-effect waves-light btn-small" type= "submit" style = {{marginLeft:'10px'}}>ADD NEW TASK+</button>
            </div>
        </form>
            </div>
        
            <ListCardTasks cardTaskId = {cardId} taskId = {taskId}/>
        </div>
    </div>
}


export default EditCard;