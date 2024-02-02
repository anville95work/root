//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if (height / width > 1 && window.location.href.indexOf("phone") < 0) {
	window.location.replace("phone-forum.html");
} else if (height / width < 1 && window.location.href.indexOf("phone") > 0) {
    window.location.replace("sign-up.html");
}
const DIRECTION_FIRST_TO_LAST = 0,
    DIRECTION_LAST_TO_FIRST = 1;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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

function signUp() {
    let emailAddress = document.getElementById("emailAddressInput").value;
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    console.log(password)
    let repeatPassword = document.getElementById("repeatPasswordInput").value;
    //all values must be provided
    if (!(emailAddress.trim() || username.trim() || password.trim() || repeatPassword.trim())) {
        alert("Sorry, I need al of these fields!");
    } else if (emailAddress.indexOf("@") < 1) {
        alert("Sorry, I need a valid email address!");
    } else if (password !== repeatPassword) {
        alert("Sorry, your password does not match with the repeated one!");
    } else {
        //create the account
        createUserWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredentials) => {
                console.log("User created successfully!");
                console.log("User Credentials...");
                console.log(userCredentials);
                setCookie("emailAddress", emailAddress, 90);
                setCookie("password", password, 90);
                //write data to DB
                let userFolderRef = ref(storage, "users/" + userCredentials.user.uid);
                if (selectImage.files.length > 0) {
                    uploadImageToDB("users/" + userCredentials.user.uid + "/profilePicture", selectImage.files[0], () => {
                        uploadString(ref(userFolderRef, "username"), username)
                            .then(() => {

                                sendEmailVerification(userCredentials.user)
                                    .then(() => {
                                        setCookie("isCreatingAccount", "true");
                                        setCookie("verificationEmailSent", "true");
                                        alert("Thank you, friend😁");
                                        window.location.href = "../index.html";
                                    })
                                    .catch(error => {
                                        setCookie("isCreatingAccount", "true");
                                        setCookie("verificationEmailSent", "false");
                                        alert("I can't send a verification email at the moment, sorry🥺");
                                        console.log("Sending verificaiton email failed...");
                                        console.log(error);
                                        window.location.href = "../index.html";
                                    })
                            })
                            .catch(error => {
                                alert("Sorry, a problem occurred!🥺");
                            })
                    })
                } else {
                    uploadString(ref(userFolderRef, "username"), username)
                        .then(() => {

                            sendEmailVerification(userCredentials.user)
                                .then(() => {
                                    setCookie("isCreatingAccount", "true");
                                    setCookie("verificationEmailSent", "true");
                                    alert("Thank you, friend😁");
                                    window.location.href = "../index.html";
                                })
                                .catch(error => {
                                    setCookie("isCreatingAccount", "true");
                                    setCookie("verificationEmailSent", "false");
                                    alert("I can't send a verification email at the moment, sorry🥺");
                                    console.log("Sending verificaiton email failed...");
                                    console.log(error);
                                    window.location.href = "../index.html";
                                })
                        })
                        .catch(error => {
                            alert("Sorry, a problem occurred!🥺");
                        })
                }
            })
    }
}

//set the listener for clicking that image
//---------------------------------------------------
var profilePictureSelection = document.getElementById("profilePictureSelection");

profilePictureSelection.addEventListener("click", event => {
    selectImage.click();

    selectImage.onchange = () => {
        console.log("Selected image name:");
        console.log(selectImage.files[0].name);
        profilePictureSelection.setAttribute("src", URL.createObjectURL(selectImage.files[0]));
    }
})

var selectImage = document.getElementById("selectImage");

var createAccountButton = document.getElementById("createAccountButton");
createAccountButton.addEventListener("click", (event) => {
    signUp();
});
//--------------------------------------------------------

//DATA_BASE FUNCTIONS
/**
* @param {string} fullPath
* @param {file} imageFile
* @param {function} callBackFunction
*/
function uploadImageToDB(fullPath, imageFile, callBackFunction) {
    console.log("image file provided for upload:");
    console.log(imageFile);
    let imageFileType = imageFile.name.substring(imageFile.name.indexOf(".") + 1);
    const metadata = {
        contentType: "image/" + imageFileType
    };

    uploadString(ref(storage, fullPath + "Extension"), imageFileType)
        .then(() => {
            uploadBytes(ref(storage, fullPath + "." + imageFileType), imageFile, metadata)
                .then(() => {
                    console.log("an email was uploaded!");

                    if (callBackFunction) {
                        callBackFunction();
                    }
                })
        })
}

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