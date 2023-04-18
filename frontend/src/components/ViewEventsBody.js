import React, { useState, useEffect }  from 'react';
import '../css/Profile.css'
import '../css/Checkbox.css'
import { useJwt } from "react-jwt";
import axios from 'axios'
import '../css/login.css'
import '../css/table.css'

let loadCorrectly = 0;

function saveEventInfo(event_id)
{
    localStorage.setItem('specificevent', event_id);
}
function loadEvents()
{
    console.log("made it in loadEvents");

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var user_id = ud.user_id;
    var email = ud.email;

        const newUser = { /* Gathers User input to Register */
        userid:user_id,
        email:email
        }

        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/userevents'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        console.log(config);
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);
            console.log("Response data is: "+res);

            if (response.status != 200)
            {
                //setMessage('Failed to register. Please try again.');
                console.log("Failed to load events.")
            }
            else
            {
                console.log("Events successfully loaded.");
                localStorage.setItem('events', JSON.stringify(res));
                console.log(res);
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });

}



function ViewEvents()
{
        useEffect(() => {
            loadEvents();
           }, []) 
    


    document.addEventListener("DOMContentLoaded", function() {
        if(loadCorrectly == 1){
            return;
        }
        const tableBody = document.querySelector("#eventsTable tbody");

        var _ud = localStorage.getItem('events');
        var ud = JSON.parse(_ud);
        var events = ud;

    events.forEach(event => {
    const row = tableBody.insertRow();
    const nameCell = row.insertCell();
    const ageCell = row.insertCell();
    const cityCell = row.insertCell();
    const typeCell = row.insertCell();
    const categoryCell = row.insertCell();

    const anchorTag = document.createElement("a");
    anchorTag.href = "/comments";
    anchorTag.id = event.event_id;

    anchorTag.onclick = function(event) {
        // create a closure to preserve the value of event_id
        return function() {
          saveEventInfo(event.event_id);
        }
      }(event);
    
    console.log(event.event_id);
    anchorTag.textContent = "Comment";
    const cell = document.createElement("td");
    cell.appendChild(anchorTag);
    row.appendChild(cell);
    
    nameCell.textContent = event.event_title;
    ageCell.textContent = event.description;
    cityCell.textContent = event.contact_name;
    typeCell.textContent = event.event_type;
    categoryCell.textContent = event.category;
    loadCorrectly = 1;
    });
});


  
     return(
      <center className='HomePageBox'>
          <table id="eventsTable">
            <thead>
                <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Contact Name</th>
                <th>Type</th>
                <th>Category</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
      </center>
     );
};
export default ViewEvents;