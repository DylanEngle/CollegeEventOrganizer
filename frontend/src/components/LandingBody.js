import React from 'react';
import '../css/Landing.css'

function CreateEvent(){
    window.location.href = '/selectRSO';
}

function ViewEvents(){
    window.location.href = '/viewEvents';
}

function CreateRSO(){
    window.location.href = '/createRSO';
}

function ViewProfile(){
    window.location.href = '/profile';
}

function JoinRSO(){
    window.location.href = '/joinRSO';
}

function CreateUniProfile(){
    window.location.href = '/createUniProfile';
}

function LeaveRSO(){
    window.location.href = '/leaveRSO';
}


function RenderCorrectly(){
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var name = ud.name;
    let level = ud.level;
    document.addEventListener("DOMContentLoaded", function () {
        // your code here
        if(level === "Admin"){
            document.querySelector("#SearchRecipesWords").style.visibility = "visible";
            document.querySelector("#SearchRecipesButton").style.visibility = "visible";
        }
        
        if(level === "SuperAdmin"){
            document.querySelector("#CreateUniProfileWords").style.visibility = "visible";
            document.querySelector("#CreateUniProfileButton").style.visibility = "visible";
        }
      });
}


function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var name = ud.name;
    let level = ud.level;
 
   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    Welcome, {name}!
                </h1>
                <h3 id="HomePageLevel">Level: {level}</h3>

                <div id="JoinRSOWords">Join an exising RSO!</div>
                <button type="button" id="JoinRSOButton" class="buttons" onClick={JoinRSO}> Join RSO </button>

                <div id="YourRecipesWords">Check out the events!</div>
                <button type="button" id="YourRecipesButton" class="buttons" onClick={ViewEvents}> View Events </button>

                <div id="CreateRecipesWords">Create your own RSO!</div>
                <button type="button" id="CreateRecipesButton" class="buttons" onClick={CreateRSO}> Create RSO </button>

                <div id="YourProfileWords">Check out your profile!</div>
                <button type="button" id="YourprofileButton" class="buttons" onClick={ViewProfile}> Profile Page </button>

                <div id="SearchRecipesWords">Create a new event!</div>
                <button type="button" id="SearchRecipesButton" class="buttons" onClick={CreateEvent}> Create Event </button>
                
                <div id="YourProfileWords">Leave an RSO!</div>
                <button type="button" id="YourprofileButton" class="buttons" onClick={LeaveRSO}> Leave RSO </button>

                <div id="CreateUniProfileWords">Create University Profile!</div>
                <button type="button" id="CreateUniProfileButton" class="buttons" onClick={CreateUniProfile}> Create Uni Profile </button>

                <RenderCorrectly />
        </center>
   );
};
export default PageTitle;