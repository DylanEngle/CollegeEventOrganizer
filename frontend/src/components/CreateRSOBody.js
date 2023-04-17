import React, { useState, useEffect }  from 'react';
import '../css/Profile.css'
import '../css/Checkbox.css'
import { useJwt } from "react-jwt";
import axios from 'axios'
import '../css/login.css'

function loadStudents()
{
    console.log("made it in LoadStudents");

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var email = ud.email;

        const newUser = { /* Gathers User input to Register */
        email:email
        }

        let js = JSON.stringify(newUser);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/eventusers'),
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
                console.log("Failed to load users.")
            }
            else
            {
                console.log("Users successfully loaded.");
                localStorage.setItem('users', JSON.stringify(res));
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
}

function PageTitle()
{

  const [checkedList, setCheckedList] = useState([]);
  const [displayCheckedList, setDisplayCheckedList] = useState([]);
  
  
   

   useEffect(() => {
    loadStudents();
   }, []) 

   var _ud = localStorage.getItem('users');
   var ud = JSON.parse(_ud);
   let students = ud;
   let listData = [];
   console.log("students type is: "+typeof(students) + students.name);
   
   for(let i = 0; i< students.length; i++){
    var temp = {
        id: students[i].user_id,
        value: students[i].name
    };
    listData[i] = temp;
   }
   

  const handleSelect = (event) => {
    const value = event.target.value;
    console.log("value = " + value);

    const isChecked = event.target.checked;
    var index = value.indexOf(":");
    var displayValue = value.substring(index+1);

    console.log("index = " + index);
    console.log("display value = " + displayValue);

    if (isChecked) {
      //Add checked item into checkList
      setCheckedList([...checkedList, value]);
      setDisplayCheckedList([...displayCheckedList, displayValue]);

      console.log("checked list = " + checkedList);

    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);

      const filteredDispList = displayCheckedList.filter((item) => item !== displayValue);
      setDisplayCheckedList(filteredDispList);
    }
  }

  const doCreateRSO = async event =>{
    event.preventDefault();
    console.log("made it in doCreateRSO");

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var email = ud.email;
    var emaildomain = email.substring(email.indexOf("@"));
    let newMembers = [];
    for(let i = 0; i<checkedList.length;i++)
    {
        let temp = checkedList[i].substring(0,checkedList[i].indexOf(":"));
        newMembers[i] = temp;
    }

    const newUser = { /* Gathers User input to Register */
    name: document.getElementById("RSOname").value,
    description: document.getElementById("RSOdescription").value,
    emaildomain: emaildomain,
    users: newMembers
    };

    let isEmptyField = false;
    if(newUser.name == ''){
        document.getElementById('RSOname').placeholder = "Please enter a name!";
        document.getElementById('RSOname').style.borderColor = "red";
        isEmptyField = true;
    }else {
        document.getElementById('RSOname').style.borderColor = "green";
    }

    if(newUser.description == ''){
        document.getElementById("RSOdescription").placeholder='Please enter a userID!';
        document.getElementById('RSOdescription').style.borderColor = "red";
        isEmptyField = true;
    }else {
        document.getElementById('RSOdescription').style.borderColor = "green";
    }
    
    if(newUser.users.length < 5){
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
        url: bp.buildPath('api/rso'),
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
            console.log("Failed to create RSO.")
        }
        else
        {
            console.log("Successfully created RSO.");
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
        <br></br>
        <div class='input-item'>
            <label for="Name"><strong>RSO Name</strong></label>
            <input type="text" name="nameFirst" id="RSOname" placeholder="Name"/>
        </div>
                    
        <div class='input-item'>
            <label for="User Id"><strong>RSO Description</strong></label>
            <input type="text" name="nameLast" id="RSOdescription" placeholder="Description"/>
        </div>
        <label for="Name"><strong>Select Yourself and 4 others.</strong></label>
      <div className="card">
        <div className="card-header">
          <p className="title">Select Students for RSO</p>
        </div>

        <div className="list-container">
          <label>You Selected:</label>
          {displayCheckedList.map((item, index) => {
              var indexValue = index;
              var isAdmin = " ";
              if (index === 0) {
                isAdmin = " (admin)";
              }
              console.log("selected index : " + indexValue);
            return (
              <div className="chip">
                <p className="chip-label">{item}<b>{isAdmin}</b></p>
              </div>
            );
          })}
        </div>
        
        <div className="card-body">
          {listData.map((item, index) => {
            return (
              <div key={item.id} className="checkbox-container">
                <input
                  type="checkbox"
                  name="languages"
                  value={item.id + ":" + item.value}
                  onChange={handleSelect}
                />
                <label>{item.value}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div id="registerButtonBox">
            <input type="submit" value="Create RSO" onClick={doCreateRSO} />
      </div>
    </center>
   );
};
export default PageTitle;