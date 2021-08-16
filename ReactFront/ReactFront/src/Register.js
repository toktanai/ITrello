
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
function Register(params) {
    const [email, setEmail] = useState("");
    const [fullName,setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }
    const handleFullNameChange = event =>{
        setFullname(event.target.value);
    }
    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password,fullName};
        console.log(inputData);
        if(password == rePassword){
            setMessage("");
            addUser(inputData);
            setSuccess("User added successfully!");
            setFullname("");
            setEmail("");
            setPassword("");
            setRePassword("");
        }else{
            setSuccess("");
            setMessage("Password is no equal,please enter again!");
            setRePassword("");
            setPassword("");
        }
    
        event.preventDefault();
    }

    async function addUser(data){
        let jwt = localStorage.getItem('jwtToken');
        //console.log(jwt);
        const response = await fetch("http://localhost:8090/addUser", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
       //     "Authorization":"Bearer " +  jwt,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
       // let messData = await response.json();
       // console.log(messData);
    
    
        }
    return <div>
                <div className="row" style = {{marginTop:'60px'}}>
                    <form onSubmit = {handleSubmit} className="col-4 s6 offset-4">
                        <div className="row">
                        <blockquote><h5>Create new Account</h5></blockquote>
                        </div>
                        <div className = "row">
                        <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                            {message}
                        </div>
                        <div className = "alert alert-success" role="alert" hidden = {success == ""}>
                            {success}
                        </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>account_circle</i>
                            <input id="icon_prefix_name" type="text" class="validate" value = {fullName} onChange = {handleFullNameChange}/>
                            <label htmlFor="icon_prefix_name">Full Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>email</i>
                            <input id="icon_prefix_email" type="text" className="validate" value = {email} onChange = {handleEmailChange}/>
                            <label htmlFor="icon_prefix_email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>lock</i>
                            <input id="icon_prefix_password" type="password" className="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label htmlFor="icon_prefix_password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>lock</i>
                            <input id="icon_prefix" type="password" className="validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                            <label htmlFor="icon_prefix">Repeat password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div action="#" style = {{marginLeft:'18px'}}>
                                <p>
                                <label>
                                    <input type="checkbox" />
                                    <span>I have read and accepted the terms and conditions</span>
                                </label>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                        <button className="btn waves-effect waves-light" style = {{marginLeft:'360px',backgroundColor:'rgb(32, 88, 137)'}} type="submit" >REGISTER<i class="material-icons right">send</i></button>
                        </div>
                   </form>
            </div>
     </div>
}

export default Register;