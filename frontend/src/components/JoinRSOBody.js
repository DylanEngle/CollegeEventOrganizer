import React, { useState, useEffect }  from 'react';
import '../css/Profile.css'
import '../css/Checkbox.css'
import { useJwt } from "react-jwt";
import axios from 'axios'
import '../css/login.css'

function loadRSO()
{
    console.log("made it in LoadRSO");

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
            url: bp.buildPath('api/displayrso'),
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
                console.log("Failed to load RSOs.")
            }
            else
            {
                console.log("RSOs successfully loaded.");
                localStorage.setItem('rsos', JSON.stringify(res));
                console.log(res);
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });

}



function JoinRSO()
{
    const [checkedList, setCheckedList] = useState([]);
    const [displayCheckedList, setDisplayCheckedList] = useState([]);
    
     useEffect(() => {
      loadRSO();
     }, []) 
  
     var _ud = localStorage.getItem('rsos');
     console.log("HELLO"+_ud);
     var ud = JSON.parse(_ud);
     let RSOS = ud;
     console.log("rsos is: "+RSOS);
     let listData = [];
     
     
     for(let i = 0; i< RSOS.length; i++){
      var temp = {
          id: RSOS[i].RSO_ID,
          value: RSOS[i].RSO_name
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
  
    const doJoinRSO = async event =>{
      event.preventDefault();
      console.log("made it in doJoinRSO");
  
      var bp = require('./Path.js');
      var storage = require('../tokenStorage.js');
  
      var _ud = localStorage.getItem('user_data');
      var ud = JSON.parse(_ud);
      var user_id = ud.user_id;
    
      if(checkedList.length > 1){
        return;
      }

      let rso_id = checkedList[0].substring(0,checkedList[0].indexOf(":"));
  
      const newUser = { /* Gathers User input to Register */
      user_id: user_id,
      rso_id: rso_id
      };
  
      let js = JSON.stringify(newUser);
      console.log("This is JSON: " + js);
  
      let config =
      {
          method: 'post',
          url: bp.buildPath('api/joinrso'),
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
              console.log("Failed to join RSO.")
          }
          else
          {
              console.log("Successfully joined RSO.");
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
          <label for="Name"><strong>Select Just One RSO to join.</strong></label>
        <div className="card">
          <div className="card-header">
            <p className="title">Select RSO</p>
          </div>
  
          <div className="list-container">
            <label>You Selected:</label>
            {displayCheckedList.map((item, index) => {
                var indexValue = index;
                console.log("selected index : " + indexValue);
              return (
                <div className="chip">
                  <p className="chip-label">{item}<b></b></p>
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
              <input type="submit" value="Create RSO" onClick={doJoinRSO} />
        </div>
      </center>
     );
};
export default JoinRSO;