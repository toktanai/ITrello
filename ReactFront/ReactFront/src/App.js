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
import Navbar from "./Navbar.js";
import UserProvider from './UserProvider';
import UserContext from './UserContext';


function App() {

  let jwt = localStorage.getItem('jwtToken');
  const {user,login,logout,profile} = useContext(UserContext);
  

  console.log(user);
  return (
    <div className="main-content">
      <UserProvider >
        <Router>
        <Navbar currentUser = {user}/> 
        </Router>
      </UserProvider>
  
    </div>
  );
}

export default App;
