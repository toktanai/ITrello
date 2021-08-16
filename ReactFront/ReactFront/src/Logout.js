import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import logo from './logo.svg';
import UserContext from './UserContext';
import './App.css';

function Logout() {
    let jwt = localStorage.getItem('jwtToken');
    const user = useContext(UserContext);

    const handleLogChange = event =>{
      localStorage.removeItem("jwtToken");
    
      console.log(jwt);
    }

    return <a href = {`/`} className="nav-link"  onClick = {handleLogChange}>Log out</a>
}

export default Logout;