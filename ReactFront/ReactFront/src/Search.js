import React, { useState, useEffect } from 'react';
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
import Moment from 'react-moment';

function Search() {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const handleNameChange = event =>{
        setName(event.target.value);
    }
    const handleSubmit = event =>{

        const inputData = name;
        console.log(inputData);
        searchByName(inputData);
        setName("");
        event.preventDefault();
    
    }

    async function searchByName(name){
        let response = await fetch("http://localhost:8090/api/search/"+name);
        let tableData = await response.json();
        setData(tableData);
        console.log(tableData);
    }
    return <div>
        <div className = "row mt-5" style = {{paddingRight:'0px',paddingLeft:'0px'}}>
                <div className = "col-8 offset-2">
                <nav style = {{backgroundColor:"#205889"}}>
                    <div class="nav-wrapper">
                    <form onSubmit = {handleSubmit}>
                        <div class="input-field">
                        <input id="search" type="search"  value = {name} onChange = {handleNameChange} required/>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                        </div>
                    </form>
                    </div>
                </nav>
                </div>
        </div>
        <div className = "container">
        <div className = "row">
            
            {data?.map(row=>(
            
                <div className = "col-4">
                <div class="card">
                    <div class="card-content" style = {{padding:'15px 15px 0px 15px'}}>
                        <h5 >{row.name}</h5>
                    </div>
                    <div class="card-content" style = {{padding:'0px 15px 15px 15px'}}>
                    <a href =  {`/editCard/${row.id}`} class="card-title activator grey-text text-darken-4"><strong style = {{color:'#205889',fontSize:'medium'}}>DETAILS</strong><i class="material-icons right">more_vert</i></a>
                    <p><small class="text-muted"> <Moment format="DD.MM.YYYY hh:mm">{row.addedDate}</Moment></small></p>
                    </div>
                    <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
                </div>
 ))}
            </div>
       
    </div>
    </div>
}

export default Search;