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
import Alert from 'react-bootstrap/Alert';
import UserContext from './UserContext';

function Edit() {
    
    let {cardId} = useParams();
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    useEffect(()=>{
        getItem(cardId);
        user.profile();
    },[]);

    const handleNameChange = event =>{
        setName(event.target.value);
    }
    const handleDateChange = event =>{
        setAddedDate(event.target.value);
    }

    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setAddedDate(data.addedDate);
    }
    async function getItem(cardId) {
        let response = await fetch("http://localhost:8090/api/getCard/"+cardId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt,
            }
          });
        if(response.status==200){
            let data = await response.json();
            setData(data);
            console.log(data);
        }else{
            console.log("empty");
            setMessage("404 ITEM NOT FOUND");
        }
    }
    const handleSubmit = event =>{
        var addedDate = new Date();
        const inputData = {id, name,addedDate};
        saveItem(inputData);
        event.preventDefault();

    }
    async function saveItem(data){
        const response = await fetch("http://localhost:8090/api/saveCard", {
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
        const inputData = {id, name, addedDate};
        deleteCard(inputData);
    }
    async function deleteCard(data){
        const response = await fetch("http://localhost:8090/api/deleteCard", {
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
    }


    return <div className="row">
    <div className="col-8 offset-2 mt-5">
    <Alert variant="success" hidden = {message == ''}><Alert.Heading>{message}</Alert.Heading></Alert>
    <div class="card blue-grey darken-1">
        <form onSubmit = {handleSubmit}>
        <div class="card-content white-text" style = {{paddingBottom:'20px'}}>
          <input style = {{color:'white',fontSize:'28px'}} type = "text" class="card-title" value = {name} onChange = {handleNameChange}/>
         </div>
        <div class="card-content" style = {{paddingTop:'0px'}}>
         <button className = "btn mr-2" type="submit" style = {{backgroundColor:'#546e7a',color:'white'}}><strong>EDIT</strong></button>
         
         <a href = "http://localhost:3000/allCards" className = "btn" type="button" style = {{backgroundColor:'#546e7a',color:'white'}} onClick = {toDeleteItem}><strong>DELETE</strong></a>
        
        </div>
        </form>
      </div>
      <br/>
      
        </div>
    </div>
}
export default Edit;