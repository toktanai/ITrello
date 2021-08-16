import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';
import './materialize/css/materialize.min.css';
import  EditCard  from "./EditCard.js";
import Cards from './Cards.js'
import React, { useState,useContext,useEffect } from 'react';
import Edit from "./Edit.js";
import EditTask from './EditTask.js';
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { Redirect } from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Logout from "./Logout.js";
import Profile from "./Profile.js";
import UserProvider from './UserProvider';
import UserContext from './UserContext';

function Navbar({currentUser}){
    const {user,login,logout,profile} = useContext(UserContext);
    useEffect(()=>{
        profile();
      },[]);
     


return (
    <div>
 <nav className="navbar navbar-expand-lg navbar-dark "  style = {{backgroundColor:'#205889'}}>
 <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav mr-auto" style = {{marginLeft:'250px'}}>
         <li className="nav-item">
             <a href={`/`}><h4 style ={{color:'white',marginBottom:'30px'}}><strong>ITrello</strong></h4></a>
         </li>  
     </ul>
   
     <ul className="navbar-nav" style = {{marginRight:'250px'}}>
         <li className="nav-item">
       {user.auth?<a className="nav-link" href={`/allCards`}>All Card</a>:<a className="nav-link" href={`/register`}>
         Register           
         </a>}
         </li>
         <li className="nav-item">
         {user.auth?<a className="nav-link"  href={`/profile`}>{user.fullName}</a>:""}
         </li>
         <li className="nav-item">
         {user.auth?<Logout/>:<a className="nav-link" href={`/login`}>Login</a>}
         </li>
     </ul>
 </div>
</nav>
<Switch>
        <Route path = "/editCard/:cardId">
            <EditCard/>
        </Route>
        <Route path = "/editTask/:task">
           <EditTask/>
        </Route>
        <Route path = "/edit/:cardId">
           <Edit/>
        </Route>
        <Route path = "/logout">
            <Main  />
        </Route>
        <Route path = "/register">
             <Register  />
        </Route>
        
        <Route path = "/login">
            {user.auth?<Redirect to = "/allCards"/>:<Login/> }
        </Route>
        <Route path = "/profile">
           <Profile/>
        </Route>
        <Route path = "/allCards">
           <Cards/>
        </Route>
        <Route path = "/">
             <Main  />
        </Route>
        </Switch>
</div>
)
}
export default Navbar;