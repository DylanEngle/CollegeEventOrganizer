import React from 'react';
import '../css/Profile.css'
import '../css/login.css'
import { useJwt } from "react-jwt";
import axios from 'axios'

function CreateEvent()
{
    const doCreateEvent = async event =>{
        console.log("In doCreateEvent");
        event.preventDefault();

        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');

        var _ud = localStorage.getItem('selectedRSO');
        var ud = JSON.parse(_ud);
        var rso_id = ud;


        const newUser = { /* Gathers User input to Register */
        rsoId:rso_id,
        eventTitle: document.getElementById("eventTitle").value,
        subTitle: document.getElementById("eventSubtitle").value,
        description: document.getElementById("eventDescription").value,
        location_name: document.getElementById("eventLocationName").value,
        location_lat: document.getElementById("eventLocationLat").value,
        location_long: document.getElementById("eventLocationLong").value,
        //eventDate: 
       // eventTime:
        eventType: document.getElementById("eventType").value,
        category: document.getElementById("eventCategory").value,
        contact_name: document.getElementById("eventContactName").value,
        contact_phone: document.getElementById("eventContactPhone").value,
        contact_email: document.getElementById("eventContactEmail").value
        };

        let isEmptyField = false;
        if(newUser.name == ''){
            document.getElementById('registerNameFirst').placeholder = "Please enter a name!";
            document.getElementById('registerNameFirst').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerNameFirst').style.borderColor = "green";
        }

        if(newUser.userId == ''){
            document.getElementById("userId").placeholder='Please enter a userID!';
            document.getElementById('userId').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('userId').style.borderColor = "green";
        }
        
        if(newUser.email == ''){
            document.getElementById("registerEmail").placeholder='Please enter an email!';
            document.getElementById('registerEmail').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerEmail').style.borderColor = "green";
        }

        if(newUser.password == ''){
            document.getElementById("registerPassword").placeholder='Please enter a password!';
            document.getElementById('registerPassword').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerPassword').style.borderColor = "green";
        }

        if(isEmptyField){
            return;
        }
        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/register'),
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

            if (response.status != 200)
            {
                //setMessage('Failed to register. Please try again.');
                console.log("Failed to register.")
            }
            else
            {
                storage.storeToken(res);
                console.log("User successfully registered.");
                window.location.href = '/login';
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
    }

   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    Create Event!
                </h1>
                <br></br>
                <br></br>
                <div id="register" class="input-group register-input" action="">
                    <div class='input-item'>
                        <label for="Name"><strong>Event Name</strong></label>
                        <input type="text" name="nameFirst" id="eventTitle" placeholder="Event Name"/>
                    </div>
                    
                    <div class='input-item'>
                        <label for="User Id"><strong>Event Subtitle</strong></label>
                        <input type="text" name="nameLast" id="eventSubtitle" placeholder="Event Subtitle"/>
                    </div>
                    
                    <div class='input-item'>
                        <label for="Email"><strong>Description</strong></label>
                        <input type="text" name="email" id="eventDescription" placeholder="Description"/>
                    </div>

                    <div class='input-item'>
                        <label for="Password"><strong>Type</strong></label>
                        <input type="password" name="password" id="eventType"  placeholder="Public, Private, RSO"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Category</strong></label>
                        <input type="text" name="nameFirst" id="eventCategory" placeholder="Category"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Contact Name</strong></label>
                        <input type="text" name="nameFirst" id="eventContactName" placeholder="Contact Name"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Contact Phone</strong></label>
                        <input type="text" name="nameFirst" id="eventContactPhone" placeholder="Contact Phone"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Contact Email</strong></label>
                        <input type="text" name="nameFirst" id="eventContactEmail" placeholder="Contact Email"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Location Name</strong></label>
                        <input type="text" name="nameFirst" id="eventLocationName" placeholder="Location Name"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Location Latitude</strong></label>
                        <input type="text" name="nameFirst" id="eventLocationLat" placeholder="Location Latitude"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Location Longitude</strong></label>
                        <input type="text" name="nameFirst" id="eventLocationLong" placeholder="Location Longitude"/>
                    </div>
                </div>
                <div id="registerButtonBox">
                        <input type="submit" value="Create Event" onClick={doCreateEvent} />
                </div>
        </center>
   );
};
export default CreateEvent;