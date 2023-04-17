import React, { useState } from 'react';
import { useJwt } from 'react-jwt';
import axios from 'axios'
import Logo from '../images/logoNoBackground.png'
import '../css/login.css'
import { login } from './loginAnimation';
import { register } from './loginAnimation';
import Register from './Register_old';

function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    const doLogin = async event =>
    {

        console.log("In DO login");

        const user = { /* Gathers User input to Register */
        email: document.getElementById("emailName").value,  
        password: document.getElementById("loginPassword").value,
        }

        let isEmptyField = false;
        if(user.email == ''){
            document.getElementById('emailName').placeholder = "Please enter a username!";
            document.getElementById('emailName').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('emailName').style.borderColor = "green";
        }

        if(user.password == ''){
            document.getElementById("loginPassword").placeholder='Please enter a password!';
            document.getElementById('loginPassword').style.borderColor = "red";
            isEmptyField = true;
        }else {
            document.getElementById('loginPassword').style.borderColor = "green";
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
            url: bp.buildPath('api/login'),
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
                setMessage('User/Password combination incorrect');
            }
            else
            {
                console.log("Worked");
                
                console.log("res is: "+res);
                localStorage.setItem('user_data', JSON.stringify(res));
                window.location.href = '/landing';
            }
        }).catch(function (error)
        {
            console.log(error);
        });
    }
    

    return(

    <div class="login-app">
        <div class='form-main-login'>
            <div id="logo-Words">
                <img src={Logo} alt="Paradise Logo" id="paradiseLogo" />
                <h1 id="paradiseText">Paradise Events</h1>
            </div>
            <div id="form-container" class="form-container">
                <div class="button-box">
                    <div id="btn-login"></div>
                    <a href='/login'><button type="button" id="toggle-selected" class="toggle-btn"><strong>Sign In</strong></button></a>
                    <a href='/register'><button type="button" id="toggle-unselected" class="toggle-btn"><strong>Sign Up</strong></button></a>
                </div>
                <span class="text" id="loginResult">{message}</span>
                <div id="login" class="input-group login-input" action="">
                    <div class='input-item'>
                        <label for="Username"><strong>Email</strong></label>
                        <input type="text" name="username" id="emailName" placeholder="Email" ref={(c) => loginName = c} />
                    </div>
                    
                    <div class='input-item'>
                        <label for="Password"><strong>Password</strong></label>
                        <input type="password" name="password" id="loginPassword" placeholder="Password" ref={(c) =>
                        loginPassword = c} />
                    </div>
                </div>
                <div id="loginButtonBox">
                        <input type="submit" value="Login" onClick={doLogin} />
                </div>
            </div>
        </div>

    </div>
    
    );
};

export default Login;
