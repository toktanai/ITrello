import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState,useContext } from 'react';
import logo from './logo.svg';
import UserContext from './UserContext';
import './App.css';

function Login() {
   
    const {user,login,logout,profile} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password};
        console.log(inputData);
        auth(inputData);
    
        event.preventDefault();
    }

    async function auth(data){
        
        const response = await fetch("http://localhost:8090/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });

        if(response.status==200){
            let jwt = await response.json();
            console.log(jwt);
            localStorage.setItem('jwtToken', jwt.jwtToken);
            profile();
            //user.auth(true);
            console.log(user);
            
        }else{
            setMessage("Wrong password or email,please again enter!");
            setEmail("");
            setPassword("");
        }

    }
    
    

    async function test(){
        let jwt = localStorage.getItem('jwtToken');
        console.log(jwt);
        alert(jwt);
    }
    return (
                <div className="row" style = {{marginTop:'60px'}}>
                <form className="col-4 s6 offset-4" onSubmit = {handleSubmit}>
                    <div className="row">
                     <blockquote><h5>Sign In</h5></blockquote>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                            {message}
                        </div>
                    </div>
                    
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}}>email</i>
                            <input id="icon_prefix_emal" type="text" className="validate" value = {email} onChange = {handleEmailChange}/>
                            <label htmlFor="icon_prefix_emal">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'rgb(32, 88, 137)'}} >lock</i>
                            <input id="icon_prefix" type="password" className="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label htmlFor="icon_prefix">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <form action="#" style = {{marginLeft:'18px'}}>
                                <p>
                                <label>
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                </p>
                            </form>
                        </div>
                        <div className="row">
                        <button className="btn waves-effect waves-light" style = {{marginLeft:'360px',backgroundColor:'rgb(32, 88, 137)'}} type="submit" >LOGIN<i class="material-icons right">send</i></button>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-danger" type = "button" onClick={test}>TEST</button>
                        </div>
                   </form>
            </div>
    )
}

export default Login;