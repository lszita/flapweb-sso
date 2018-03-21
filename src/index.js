import './style.css';
import '../node_modules/papercss/dist/paper.min.css';
import './template.js';

import registerHTML from './templates/register.html';
import loginHTML from './templates/login.html';


/*
 * routing
 */
const content = document.getElementById('content');
content.innerHTML = loginHTML;
window.location.hash = ''; //only in development

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

    var registrationForm = document.getElementById('registration-form');
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');

    confirmPasswordInput.addEventListener('input', event => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords Don\'t Match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    registrationForm.addEventListener('submit', event => {
        
        let data = {
            username : usernameInput.value,
            email : emailInput.value,
            password : passwordInput.value
        }
        console.log('going to post');
        console.log(data);
    });

};

