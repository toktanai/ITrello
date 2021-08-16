
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserContext';


class CarouselMain extends React.Component{
    componentWillMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
          });
    };
    render(){
        return <div class="slider">
        <ul class="slides">
        
        <li>
            <img src="https://image.freepik.com/free-photo/felt-tip-pen-water-color-plastic-bottles-painted-easter-eggs-green-background-with-copy-space_23-2148066914.jpg"/> 
            <div class="caption left-align">
                <div className = "row" style = {{marginTop:'95px'}}>
                    <div className = "col-12">
                        <h3 style = {{backgroundColor:'rgb(32, 88, 137)',display:'inline',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>Manage with your tasks</h3>
                    </div>
                    <div className = "col-12">
                        <a class="btn waves-effect white black-text darken-text-2 mt-5">REGISTER NOW</a>
                    </div>
                
                </div>
            </div>
        </li>
        <li>
            <img src="https://slidesgo.com/storage/95707/0-primary-school-end-of-the-year-awards.png"/> 
            <div class="caption center-align">
            
            </div>
        </li>
        <li>
            <img src="https://i.pinimg.com/564x/c4/ed/23/c4ed2397c0f68076e613cead6a737f16.jpg"/> 
            <div class="caption right-align">
            <h3 style = {{backgroundColor:'rgb(32, 88, 137)',display:'inline',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>Manage with your tasks</h3>
                
            <h5 class="light grey-text text-lighten-3"> <a class="btn waves-effect white black-text darken-text-2 mt-5">REGISTER NOW</a></h5>
            </div>
        </li>
        <li>
            <img src="https://i.graphicmama.com/blog/wp-content/uploads/2020/04/10112407/sketchnotes-lesson-presentation-template.jpg"/>
            <div class="caption center-align" style = {{marginTop:'150px'}}>
            <h3 style = {{backgroundColor:'rgb(32, 88, 137)',display:'inline',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px',marginTop:'200px'}}>Manage with your tasks</h3>
            <h5 class="light grey-text text-lighten-3"><a class="btn waves-effect white black-text darken-text-2" style = {{marginTop:'50px'}}>REGISTER NOW</a></h5>
            </div>
        </li>
        </ul>
    </div>
    }
}
function Main(params) {
    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){
        
    }
   

    return <div className = "container">
       <div className = "row mt-5">
           <CarouselMain/>
    <br/>
    <div className = "col-12 mt-5" style = {{paddingLeft:'0px',paddingRight:'0px'}}>
    <ul class="collection">
        <li class="collection-item avatar">
        <img src="clock.png" alt="" class="circle mt-2"/>
        <span class="title">Quick Access</span>
        <p>Fast and easy 
        </p>
        <a href="#!" class="secondary-content"><img height = "22" src = "check.png"/></a>
        </li>
        <li class="collection-item avatar">
        <img src="folder.png" alt="" class="circle mt-2"/>
        <span class="title">Great Management</span>
        <p>Grouping your tasks
        </p>
        <a href="#!" class="secondary-content"><img height = "22" src = "check.png"/></a>
        </li>
        <li class="collection-item avatar">
        <img src="bars.png" alt="" class="circle mt-2"/>
        <span class="title">Statistics</span>
        <p>Monitoring with your success
        </p>
        <a href="#!" class="secondary-content"><img height = "22" src = "check.png"/></a>
        </li>
        <li class="collection-item avatar">
        <img src="cloud.png" alt="" class="circle mt-2"/>
        <span class="title">Cloud Service</span>
        <p>Store you data in cloud
        </p>
        <a href="#!" class="secondary-content"><img height = "22" src = "check.png"/></a>
        </li>
  </ul>
  </div>
    </div>
    </div>
}

export default  Main;

