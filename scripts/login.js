//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if (height / width > 1 && window.location.href.indexOf("phone") < 0) {
	window.location.replace("phone-forum.html");
} else if (height / width < 1 && window.location.href.indexOf("phone") > 0) {
    window.location.replace("login.html");
}
const DIRECTION_FIRST_TO_LAST = 0,
    DIRECTION_LAST_TO_FIRST = 1;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getStorage, getBytes, uploadBytes, ref, uploadString, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1iZFpDtYwRLUIGAAoMwc2q4PHYreE6TE",
    authDomain: "anville-95-official.firebaseapp.com",
    projectId: "anville-95-official",
    storageBucket: "anville-95-official.appspot.com",
    messagingSenderId: "606669711150",
    appId: "1:606669711150:web:d0ca550b0ffaa106b57cbf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

function login() {
    let emailAddress = document.getElementById("emailAddressInput").value;
    let password = document.getElementById("passwordInput").value;

    if (!(emailAddress.trim() && password)) {
        alert("Sorry, I need all these fields!");
    } else if (emailAddress.indexOf("@") < 1) {
        alert("Sorry, I need a valid emal address!");
    } else {
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(userCredentials => {
                //get the username
                getStringFromStorageDB("users/" + userCredentials.user.uid + "/username", username => {
                    setCookie("isLoggedIn", "true");
                    setCookie("emailAddress", userCredentials.user.email);
                    setCookie("username", username);
                    setCookie("password", password);
                    if(window.location.href.indexOf("phone") < 0) {
                        window.location.href = "../index.html";
                    } else {
                        window.location.href = "phone-index.html";
                    }
                })
            })
            .catch(error => {
                alert("Sorry, I couldn't log you in!🥺");
                console.log("Login failed...");
                console.log(error);
            })
    }
}

function setButtonsClickListeners() {
    //login button
    let loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", (event) => {
        login();
    });
}

//DATABASE FUNCTIONS
/**
* @param {string} fullPath
* @param {function} callBackFunction
*/
function getStringFromStorageDB(fullPath, callBackFunction) {
    getBytes(ref(storage, fullPath))
        .then((bytes) => {
            var array = new Uint8Array(bytes);
            //textencode
            var decoder = new TextDecoder();
            var downloadedString = decoder.decode(array);
            callBackFunction(downloadedString);
        })
}

//EXPLICIT EXECUTIONS

setButtonsClickListeners();
var isPasswordVisible = true;
function changePasswordTextVisibility(event) {
    let passwordElement = document.getElementById(event.target.getAttribute("target"));
    
    if(isPasswordVisible) {
        passwordElement.type = "password";
        event.target.setAttribute("src", "../images/eye-closed.png");
        isPasswordVisible = false;
    } else {
        passwordElement.type = "text";
        event.target.setAttribute("src", "../images/eye-open.png");
        isPasswordVisible = true;
    }
}

function initiate() {
    let togglePasswordVisibilityButtons = document.getElementsByClassName("togglePasswordTextVisibility");
    for(let i = 0; i < togglePasswordVisibilityButtons.length; i++) {
        togglePasswordVisibilityButtons[i].onclick = (event) => {
            changePasswordTextVisibility(event);
        }
    }
}

initiate();