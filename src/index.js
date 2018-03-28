import './style.css';
import '../node_modules/papercss/dist/paper.min.css';
import './template.js';

import registerHTML from './templates/register.html';
import loginHTML from './templates/login.html';
import successHTML from './templates/success.html';
import errorHTML from './templates/error.html';

 

var host;
if (window.location.hostname === 'localhost') {
    host = 'http://localhost:8080';
    window.location.hash = ''; 
} else {
    host = '';
}

/*
 * routing
 */
const content = document.getElementById('content');
content.innerHTML = loginHTML;


window.onhashchange = function(){
    const newHash = window.location.hash.substr(1);
    
    switch(newHash) {
        case 'login' :
            content.innerHTML = loginHTML;
            break;
        case 'register':
            content.innerHTML = registerHTML;
            addRegisterListeners();
            break;
        default:
            content.innerHTML = loginHTML;
    }

};

/*
 * custom password validation
 */
function addRegisterListeners(){

    const registrationForm = document.getElementById('registration-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const statusBar = document.getElementById('status-bar');

    confirmPasswordInput.addEventListener('input', event => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords don\'t Match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    registrationForm.addEventListener('submit', event => {
        statusBar.removeAttribute('style');
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                console.log(httpRequest.status);
                console.log(httpRequest.responseText);

                switch(httpRequest.status){
                    case 201 : 
                        console.log('user succesfully created');
                        statusBar.innerHTML = successHTML;
                        statusBar.style.opacity = 1;
                        break;
                    case 400 :
                        console.log('bad request');
                        statusBar.innerHTML = '';
                        JSON.parse(httpRequest.responseText).errors.forEach(errorMsg => {
                            statusBar.innerHTML += errorHTML.replace('##error##',errorMsg);
                        });
                        statusBar.style.opacity = 1;
                        break;
                    case 500 :
                        console.log('ooops');
                        break;
                    default :
                        console.log('ooops 2');
                }

            }
        };
        httpRequest.open('POST', `${host}/auth/register`);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(`username=${usernameInput.value}&email_address=${emailInput.value}&password=${passwordInput.value}`);
    });

};

