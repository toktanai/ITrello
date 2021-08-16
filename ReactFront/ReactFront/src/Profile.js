import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect ,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import UserContext from './UserContext';
function Profile(params) {
    let jwt = localStorage.getItem('jwtToken');
    const {user,login,logout,profile} = useContext(UserContext);
    const [id, setId] = useState(user.id);
    const [fullName, setFullName] = useState(user.fullName);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");
    const [succes,setSucces] = useState("");
    useEffect(()=>{
        profile();
      
     //   getUser(user.email);
      },[]);
 
    M.updateTextFields();

    const handleNameChange = event =>{
        login(user.id,user.email,event.target.value);
       // console.log(fullName);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleNewPasswordChange = event =>{
        setNewPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
        
    }
  
    async function setData(data) {
        setId(user.id);
        setFullName(user.fullName);
        //setPassword(user.password);
        console.log(fullName);
        console.log(password);
    }
    async function getUser(email) {
 
        let response = await fetch("http://localhost:8090/api/getUser/"+email, {
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt,
            }
          });
        if(response.status==200){
            let data = await response.json();
            console.log(data);
            setData(data);
        
        }else{
            console.log("empty");
           
        }
    }
    const handlePasswordSubmit = event =>{
        const inputDate = {newPassword:newPassword,password:password}
        var correct = false;
        if(newPassword == rePassword){
            correct = true;
        }else{
            correct = false;
        }
        if(!correct){
            setMessage("not Equal");
            setNewPassword("");
            setRePassword("");
        }else{
            //setMessage("Equal !!");
            saveUserPassword(inputDate);
        }
        
        event.preventDefault();
        console.log(newPassword)
        console.log(message);
    }
    const handleSubmit = event =>{
        console.log(fullName);
        const inputData = {
            id:user.id,
            email:user.email,
            fullName:user.fullName
        };
       // login(id,user.email,fullName);
        console.log(inputData);
        saveUser(inputData);
    
        event.preventDefault();

    }
    async function saveUserPassword(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/updatePassword", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.text();
        if(messData == "Password saved !"){
            setMessage("");
            setSuccess(messData);
            
            setPassword("");
            setNewPassword("");
            setRePassword("");
            setSucces("");
        }else{
            setSuccess("");
            setMessage(messData);
            setPassword("");
            setNewPassword("");
            setRePassword("");
            setSucces("");
        }
       // console.log(JSON.stringify(messData));
     
        console.log(messData);
    }
    async function saveUser(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/saveUser", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.text();
        setSuccess("");
        setSucces(messData);

    }
    return <div>
        <div class="row" style = {{marginTop:'40px'}}>
                    <div class="col-4 s6 offset-4">
                    <div class="row">
                      <blockquote><h5>Update Profile Data</h5></blockquote>  
                    </div>
                    <form onSubmit = {handleSubmit}>
                        <div className = "row">
                            <div className = "alert alert-success" role="alert" hidden = {succes == ""}>
                                {succes}
                            </div>
                        </div>
                        <div class="row">
                                <div class="input-field col s6">
                                <i class="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>email</i>
                                <input id="icon_prefix_email" type="text" class="validate"  value = {user.email} readOnly/>
                                <label  class="active" for="icon_prefix_email">Email</label>
                                </div>
                            </div>
                            <div class="row" style = {{marginBottom:'0px'}}>
                                <div class="input-field col s6">
                                <i class="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>account_circle</i>
                                <input id="icon_prefix_name" type="text" class="validate" value = {user.fullName} onChange = {handleNameChange}/>
                                <label  class="active" for="icon_prefix_name">Full Name</label>
                                </div>
                            </div>
                            
                            <div class="row">
                            <button class="btn waves-effect waves-light" style = {{marginLeft:'310px',backgroundColor:'rgb(32, 88, 137)'}} type="submit" >UPDATE PROFILE<i class="material-icons right">refresh</i></button>
                            </div>
                    </form>
                        <div class="row">
                        <blockquote><h5>Update Password</h5></blockquote>
                        </div>
                    <form onSubmit = {handlePasswordSubmit}>
                        <div className = "row">
                        <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                            {message}
                        </div>
                        <div className = "alert alert-success" role="alert" hidden = {success == ""}>
                            {success}
                        </div>
                        </div>
                        <div class="row" style = {{marginBottom:'0px'}}>
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>lock</i>
                            <input id="icon_prefix_password" type="password" class="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label for="icon_prefix_password">Old Password</label>
                            </div>
                        </div>
                        <div class="row"  style = {{marginBottom:'0px'}}>
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>lock</i>
                            <input id="icon_prefix" type="password" class="validate" value = {newPassword} onChange = {handleNewPasswordChange}/>
                            <label for="icon_prefix">New password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>lock</i>
                            <input id="icon_prefix_repeat" type="password" class="validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                            <label for="icon_prefix_repeat">Repeat new password</label>
                            </div>
                        </div>
                    
                        <div class="row">
                        <button class="btn waves-effect waves-light" style = {{marginLeft:'290px',backgroundColor:'rgb(32, 88, 137)'}} type="submit" >UPDATE PASSWORD<i class="material-icons right">refresh</i></button>
                        </div>
                        </form>
                   </div>
            </div>
    </div>
}

export default Profile;