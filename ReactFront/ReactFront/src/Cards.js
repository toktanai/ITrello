import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css'
import './materialize/css/materialize.min.css'
import './materialize/css/materialize.css';
import React, { useState, useEffect,useContext } from 'react';
import Moment from 'react-moment';
import UserContext from './UserContext';

function ListCards({newItemAddedId,load}) {
  const [data, setData] = useState([]);
  const [statusCard,setStatusCard] = useState(false);
  const user = useContext(UserContext);

  async function loadData() {
    let jwt = localStorage.getItem('jwtToken');
    console.log(jwt);
    let response = await fetch("http://localhost:8090/api/allCards", {
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " +  jwt,
      }
    });
    let tableData = await response.json();
    setStatusCard(false);

    console.log(tableData);
    setData(tableData);
   
  }
  async function searchByName(name){
    let jwt = localStorage.getItem('jwtToken');
    console.log(name);
    if(name.length == 0){
        name = null;
        console.log(name);
      
      }
    let response = await fetch("http://localhost:8090/api/search/"+name, {
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " +  jwt,
      }
    });

    let tableData = await response.json();

    setStatusCard(true);
    setData(tableData);
    if(name  == null){
      setStatusCard(false);

      loadData();
    }
    console.log(tableData);
}

useEffect(() => {
  console.log(load);
  searchByName(load);
  if(load == null){
    loadData();
    user.profile();
  }

},[load])

useEffect(() => {
  console.log(load);
    if(load.length == 0 || load == null){
    loadData();
    user.profile();
    }
}, [newItemAddedId]);

  return (
    <div className = "container">
      <div className = "row">
        <div className = "col-8" style = {{paddingLeft:'30px'}}>
         
        { statusCard == true ? 
         load.length != 0 && data.length != 0  ? <h5>Search Result for: "{load}"{console.log(data)} </h5> : <div>
           <h5>Search Result for: "{load}"</h5>
           <div className = "row">
              <p style = {{marginLeft:'350px',fontSize:'42px',marginTop:'30px'}}> Results not found</p>
              <br/>
              <img height = '80' width ='80' style = {{marginLeft:'480px',marginTop:'30px'}} src = "error.png"/>
               </div>
           </div>
        : <div></div>
        }
         
        </div>
        </div>
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
  )
}

function Cards() {
 
    const [name, setName] = useState("");
    
    const [addedDate, setAddedDate] = useState(new Date());
    const [newId, setNewId] = useState(0);
    const [load,setLoad] = useState("");

    const [search_name, setSearch_Name] = useState("");
    const [sr_data, setSr_Data] = useState([]);
    const handleSearchNameChange = event =>{
        setSearch_Name(event.target.value);
        console.log(search_name);
    }
    const handleSearchSubmit = event =>{

        const inputData = search_name;
        console.log(inputData);
      setLoad(inputData);
       searchByName(inputData);
        setSearch_Name("");
        event.preventDefault();
    
    }

    async function searchByName(name){
      console.log(name);
      if(name.length == 0){
        name = null;
        console.log(name);
      }
        let response = await fetch("http://localhost:8090/api/search/"+name);
        let tableData = await response.json();
        console.log(tableData);
        setSr_Data(tableData);
        console.log(tableData);
    }

    const handleNameChange = event =>{
        setName(event.target.value);
    }

    const handleSubmit = event =>{

        const inputData = {name, addedDate}
        console.log(inputData);
        addCard(inputData);
        setName("");
        event.preventDefault();
    
    }
    async function addCard(data){
      let jwt = localStorage.getItem('jwtToken');
    
        const response = await fetch("http://localhost:8090/api/addCard", {
          method: "POST",
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
        let messData = await response.json();
        console.log(jwt);
      
        setNewId(messData.id);
      }
    
    return <div>
      <div className = "row mt-5" style = {{paddingRight:'0px',paddingLeft:'0px'}}>
                <div className = "col-8 offset-2">
                <nav style = {{backgroundColor:"#205889"}}>
                    <div class="nav-wrapper">
                    <form onSubmit = {handleSearchSubmit}>
                        <div class="input-field">
                        <input id="search" type="search"  value = {search_name} onChange = {handleSearchNameChange} />
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                        </div>
                    </form>
                    </div>
                </nav>
                </div>
        </div>
        {(search_name.length == 0 ?

            <div className="row">
                <div className="col-4 offset-4">
                    <div class="card mt-4">
                       <form onSubmit = {handleSubmit}>
                            <div class="card-content" style = {{padding:'10px 10px 0px 10px'}}>
                            <div class="input-field col"  >
                                <input id="last_name" type="text"  value = {name} onChange = {handleNameChange} class="validate"/>
                                <label for="last_name" >Create new card</label>
                            </div>
                            </div>
                            <div class="card-content" style = {{padding:'0px 10px 20px 10px'}}>
                            <button class="waves-effect waves-light btn-small" type= "submit" style = {{marginLeft:'10px'}}>ADD NEW +</button>
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        :<div></div> ) }
        <ListCards newItemAddedId = {newId} load = {search_name}/>
    </div>
}
export default Cards;
