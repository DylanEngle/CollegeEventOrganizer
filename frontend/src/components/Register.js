import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'
import { login } from './loginAnimation';

function Register()
{
    const doRegister = async event =>{
        console.log("In Register");
        event.preventDefault();
        console.log("made it in doRegister");

        var bp = require('./Path.js');
        var storage = require('../tokenStorage.js');


        const newUser = { /* Gathers User input to Register */
        firstName: document.getElementById("registerNameFirst").value,  
        lastName: document.getElementById("registerNameLast").value,
        email: document.getElementById("registerEmail").value,
        login: document.getElementById("registerUsername").value,
        password: document.getElementById("registerPassword").value,
        }

        let isEmptyField = false;
        if(newUser.firstName == ''){
            document.getElementById('registerNameFirst').placeholder = "Please enter a first name!";
            document.getElementById('registerNameFirst').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerNameFirst').style.borderColor = "green";
        }

        if(newUser.lastName == ''){
            document.getElementById("registerNameLast").placeholder='Please enter a last name!';
            document.getElementById('registerNameLast').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerNameLast').style.borderColor = "green";
        }
        
        if(newUser.email == ''){
            document.getElementById("registerEmail").placeholder='Please enter an email!';
            document.getElementById('registerEmail').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerEmail').style.borderColor = "green";
        }

        if(newUser.login == ''){
            document.getElementById("registerUsername").placeholder='Please enter a username!';
            document.getElementById('registerUsername').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('registerUsername').style.borderColor = "green";
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

            if (res.error != 'success')
            {
                //setMessage('Failed to register. Please try again.');
                console.log("Failed to register.")
            }
            else
            {
                storage.storeToken(res);
                /*var jwt = require('jsonwebtoken');
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                */
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

    <div class="register-app">
        <div class='form-main-register'>
            <div id="logo-Words">
                <img src={Logo} alt="Paradise Logo" id="paradiseLogo" />
                <h1 id="paradiseText">Paradise Kitchen</h1>
            </div>
            <div id="form-container" class="form-container">
                <div class="button-box">
                    <div id="btn-register"></div>
                    <a href='/login'><button type="button" id="toggle-unselected" class="toggle-btn"><strong>Sign In</strong></button></a>
                    <a href='/register'><button type="button" id="toggle-selected" class="toggle-btn"><strong>Sign Up</strong></button></a>
                </div>
                <span class="text" id="signUpResult"></span>
                <div id="register" class="input-group register-input" action="">
                    <div class='input-item'>
                        <label for="First Name"><strong>First Name</strong></label>
                        <input type="text" name="nameFirst" id="registerNameFirst" placeholder="First Name"/>
                    </div>
                    
                    <div class='input-item'>
                        <label for="Last Name"><strong>Last Name</strong></label>
                        <input type="text" name="nameLast" id="registerNameLast" placeholder="Last Name"/>
                    </div>
                    
                    <div class='input-item'>
                        <label for="Email"><strong>Email</strong></label>
                        <input type="text" name="email" id="registerEmail" placeholder="johndoe@gmail.com"/>
                    </div>
                    
                    <div class='input-item'>
                        <label for="Username"><strong>Username</strong></label>
                        <input type="text" name="username" id="registerUsername" placeholder="Username"/>
                    </div>

                    <div class='input-item'>
                        <label for="Password"><strong>Password</strong></label>
                        <input type="password" name="password" id="registerPassword"  placeholder="Password"/>
                    </div>
                </div>
                <div id="registerButtonBox">
                        <input type="submit" value="Register" onClick={doRegister} />
                </div>
            </div>
        </div>

    </div>
    );
};

export default Register;