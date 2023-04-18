import React, { useState, useEffect }  from 'react';
import '../css/Profile.css'
import '../css/Checkbox.css'
import { useJwt } from "react-jwt";
import axios from 'axios'
import '../css/login.css'
import '../css/table.css'

function loadComment()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('specificevent');
    var event = _ud;
    var event_id = event.event_id;

    var _uds = localStorage.getItem('user_data');
    var ud = JSON.parse(_uds);
    var user_id = ud.user_id;

    const newUser = { /* Gathers User input to Register */
    eventId: event_id,
    userId: user_id
    };

        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'get',
            url: bp.buildPath('api/readcomment'),
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
                console.log("Failed to load comments.")
            }
            else
            {
                storage.storeToken(res);
                console.log("Comment successfully loaded.");
                localStorage.setItem('specificcomment', JSON.stringify(res));
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
}



function PageTitle()
{
    useEffect(() => {
        loadComment();
       }, []) 

    var _ud = localStorage.getItem('specificevent');
    var event = _ud;

    
    var data = localStorage.getItem('specificcomment');
    if(data != null){
        var ud = JSON.parse(data);
    var ud_comment = ud.comment;
    var ud_rating = ud.rating;

    if((ud_comment != null)&&(ud_rating != null)){
        document.getElementById('commentText').value = ud_comment;
        document.getElementById('commentRating').value = ud_rating;
    }
    else{
        document.getElementById('registerButtonBoxdelete').style.visibility = "hidden";
    }

    }

    const doAddComment = async event =>
    {

        console.log("In DO add comment");

        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');

        var rating =  document.getElementById("commentRating").value;
        var numRating = Number(rating);

        var _udw = localStorage.getItem('specificevent');
        var eventID = _udw;

        var _udx = localStorage.getItem('user_data');
        var udn = JSON.parse(_udx);
        var user_ID = udn.user_id;

        const user = { /* Gathers User input to Register */
        eventId: eventID,
        userId: user_ID,
        comment: document.getElementById("commentText").value,  
        rating: numRating
        };

        let isEmptyField = false;
        if(user.comment == ''){
            document.getElementById('commentText').placeholder = "Please enter a comment!";
            document.getElementById('commentText').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('commentText').style.borderColor = "green";
        }

        if(user.rating == null){
            document.getElementById("commentRating").placeholder='Please enter a rating!';
            document.getElementById('commentRating').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('commentRating').style.borderColor = "green";
        }
        if(isEmptyField){
            return;
        }


        event.preventDefault();
        var js = JSON.stringify(user);
        console.log("This is JSON: " + js);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/addcomment'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);
    
            if (response.status != 200)
            {
                console.log("There was an error");
            }
            else
            {
                console.log("Worked");
                
                console.log("res is: "+res);
                window.location.href = '/landing';
            }
        }).catch(function (error)
        {
            console.log(error);
        });
    }

    const doDeleteComment = async event =>
    {

        console.log("In DO delete comment");


        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');

        var _udw = localStorage.getItem('specificevent');
        var eventID = _udw;

        var _udx = localStorage.getItem('user_data');
        var udn = JSON.parse(_udx);
        var user_ID = udn.user_id;

        const user = { /* Gathers User input to Register */
        eventId: eventID,
        userId: user_ID,
        };

        event.preventDefault();
        var js = JSON.stringify(user);
        console.log("This is JSON: " + js);
        var config =
        {
            method: 'delete',
            url: bp.buildPath('api/deletecomment'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);
    
            if (response.status != 200)
            {
                console.log("There was an error");
            }
            else
            {
                console.log("Worked");
                
                console.log("res is: "+res);
                window.location.href = '/landing';
            }
        }).catch(function (error)
        {
            console.log(error);
        });
    }
   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    Your comment for this event.
                </h1>
                <br></br>
                <br>
                </br>
                <div class='input-item'>
                        <label for="Name"><strong>Comment</strong></label>
                        <input type="text" name="nameFirst" id="commentText" placeholder=""/>
                </div>
                    
                <div class='input-item'>
                        <label for="User Id"><strong>Rating (1-5)</strong></label>
                        <input type="text" name="nameLast" id="commentRating" placeholder=""/>
                </div>

                <div id="registerButtonBox">
                        <input type="submit" value="Add/Update" onClick={doAddComment} />
                </div>

                <div id="registerButtonBoxdelete">
                        <input type="submit" value="Delete" onClick={doDeleteComment} />
                </div>

        </center>
   );
};
export default PageTitle;