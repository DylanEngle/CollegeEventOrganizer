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
        title: document.getElementById("eventTitle").value,
        subTitle: document.getElementById("eventSubtitle").value,
        description: document.getElementById("eventDescription").value,
        locationName: document.getElementById("eventLocationName").value,
        locationLat: document.getElementById("eventLocationLat").value,
        locationLong: document.getElementById("eventLocationLong").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        type: document.getElementById("eventType").value,
        category: document.getElementById("eventCategory").value,
        contactName: document.getElementById("eventContactName").value,
        contactPhone: document.getElementById("eventContactPhone").value,
        contactEmail: document.getElementById("eventContactEmail").value
        };

        let isEmptyField = false;
        if(newUser.eventTitle == ''){
            document.getElementById('eventTitle').placeholder = "Please enter a name!";
            document.getElementById('eventTitle').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventTitle').style.borderColor = "green";
        }

        if(newUser.subTitle == ''){
            document.getElementById("eventSubtitle").placeholder='Please enter a subtitle!';
            document.getElementById('eventSubtitle').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventSubtitle').style.borderColor = "green";
        }
        
        if(newUser.description == ''){
            document.getElementById("eventDescription").placeholder='Please enter an description!';
            document.getElementById('eventDescription').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventDescription').style.borderColor = "green";
        }

        if(newUser.password == ''){
            document.getElementById("eventLocationName").placeholder='Please enter a location name!';
            document.getElementById('eventLocationName').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventLocationName').style.borderColor = "green";
        }

        if(newUser.location_name == ''){
            document.getElementById("eventLocationName").placeholder='Please enter a location name!';
            document.getElementById('eventLocationName').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventLocationName').style.borderColor = "green";
        }

        if(newUser.location_lat == ''){
            document.getElementById("eventLocationLat").placeholder='Please enter a location latitude!';
            document.getElementById('eventLocationLat').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventLocationLat').style.borderColor = "green";
        }

        if(newUser.location_long == ''){
            document.getElementById("eventLocationLong").placeholder='Please enter a location longitude!';
            document.getElementById('eventLocationLong').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventLocationLong').style.borderColor = "green";
        }

        if(newUser.eventDate == ''){
            document.getElementById("eventDate").placeholder='Please enter a date!';
            document.getElementById('eventDate').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventDate').style.borderColor = "green";
        }

        if(newUser.eventTime == ''){
            document.getElementById("eventTime").placeholder='Please enter an event time!';
            document.getElementById('eventTime').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventTime').style.borderColor = "green";
        }

        if(newUser.eventType == ''){
            document.getElementById("eventType").placeholder='Please enter an event type!';
            document.getElementById('eventType').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventType').style.borderColor = "green";
        }

        if(newUser.category == ''){
            document.getElementById("eventCategory").placeholder='Please enter an event category!';
            document.getElementById('eventCategory').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventCategory').style.borderColor = "green";
        }

        if(newUser.contact_name == ''){
            document.getElementById("eventContactName").placeholder='Please enter a contact name!';
            document.getElementById('eventContactName').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventContactName').style.borderColor = "green";
        }

        if(newUser.contact_phone == ''){
            document.getElementById("eventContactPhone").placeholder='Please enter a contact phone!';
            document.getElementById('eventContactPhone').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventContactPhone').style.borderColor = "green";
        }

        if(newUser.contact_email == ''){
            document.getElementById("eventContactEmail").placeholder='Please enter a contact email!';
            document.getElementById('eventContactEmail').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('eventContactEmail').style.borderColor = "green";
        }

        if(newUser.rsoId == null){
            isEmptyField = true;
        }

        if(isEmptyField){
            return;
        }

        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/event'),
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
                console.log("Failed to create event.")
            }
            else
            {
                storage.storeToken(res);
                console.log("Event successfully created.");
                window.location.href = '/landing';
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
                        <input type="text" name="password" id="eventType"  placeholder="Public, Private, RSO"/>
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

                    <div class='input-item'>
                        <label for="Name"><strong>Event Date</strong></label>
                        <input type="text" name="nameFirst" id="eventDate" placeholder="YYYY-MM-DD"/>
                    </div>

                    <div class='input-item'>
                        <label for="Name"><strong>Event Time</strong></label>
                        <input type="text" name="nameFirst" id="eventTime" placeholder="MM:SS:MS"/>
                    </div>
                </div>
                <div id="registerButtonBox">
                        <input type="submit" value="Create Event" onClick={doCreateEvent} />
                </div>
        </center>
   );
};
export default CreateEvent;