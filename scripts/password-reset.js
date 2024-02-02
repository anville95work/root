//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if (height / width > 1 && window.location.href.indexOf("phone") < 0) {
	window.location.replace("phone-forgot-password.html");
} else if (height / width < 1 && window.location.href.indexOf("phone") > 0) {
    window.location.replace("forgot-password.html");
}
/*
THIS IS THE LIST OF PROJECTS ENUMERATED ON THIS SITE IN ORDER OF MAKING
scientific java CLI calculator
scientific android calculator
scientific web calculator
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getStorage, getBytes, uploadBytes, ref, uploadString, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
import { getDatabase, ref as rtdbRef, set, onChildAdded, remove, push } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";


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

function initiate() {
    let resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", (event) =>{
        //initialise the email address input
        let emailAddressInput = document.getElementById("emailAddressInput");
        let emailAddress = emailAddressInput.value;
        
        if(!emailAddress.trim()) {
            alert("Sorry, email address is required!");
        } else if(emailAddress.indexOf("@") < 0) {
            alert("Sorry, a valid email address is required!");
        } else {
            //send the password reset email
        const actionCodeSettings = {
            url: "https://mitofashion.github.io/html/login.html",
            handleCodeInApp: true
        };

        sendPasswordResetEmail(auth, emailAddress, actionCodeSettings)
            .then(() => {
                alert("Please check your email inbox for reset link");
                alert("The email might be in your spam folder")
                //relocate to the index page
                console.log("Login email sent!");
            })

            .catch(error => {
                alert("Sorry, maximum daily email limit exceeded!😭");
                console.log("Error during login link email sending...");
                console.log("error.code: " + error.code);
                console.log("error.message" + error.message);
				console.log("error...");
				console.log(error);
            })
        }
    })
}

initiate();