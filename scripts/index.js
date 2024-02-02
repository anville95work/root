//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if (height / width > 1 && window.location.href.indexOf("phone") < 0) {
	window.location.replace("html/phone-index.html");
} else if (height / width < 1 && window.location.href.indexOf("phone") > 0) {
    window.location.replace("../index.html");
}
/*
THIS IS THE LIST OF PROJECTS ENUMERATED ON THIS SITE IN ORDER OF MAKING
scientific java CLI calculator
scientific android calculator
scientific web calculator
*/

const DIRECTION_FIRST_TO_LAST = 0,
      DIRECTION_LAST_TO_FIRST = 1,
      ANVILLE_DELIMITER = "<--anville95-->";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateEmail } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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
const storage = getStorage(app);
const rtdb = getDatabase(app);


/*Holding loaded comments
loadedComments
  |
  [projectName]
    |
    [index]:[[emailAddress]<--anville95-->[comment]]
    |
    lastDownloadedCommentIndex:[lastDownloadedCommentIndex]
    |
    length: [length]
*/

//global variables
var loadedComments = { length: 0};
var currentVisiblePopup;
var specialExecutionForClosedPopup;//initialised only for special popups with something to be done after hiding
var isSaveModeOn;//This is only initialised if the user is logged in. It is used by the edit profile button.
var user;//also initialised only if user is logged in

var isDownloadingComments = false;
var isUploadingComments = false;

/**
* @param {string} projectName
* @param {string} commentSender
* @param {string} commentText
*/
function addComment(projectName, commentSender, commentText, commentTime) {
    //initialise the project's object if it does not exist
    if(!loadedComments[projectName]) {
        loadedComments[projectName] = { length: 0 };
        loadedComments.length += 1;
    }
    loadedComments[projectName][loadedComments[projectName]["length"]] = commentSender + ANVILLE_DELIMITER + commentText + ANVILLE_DELIMITER + commentTime;
    loadedComments[projectName]["length"] += 1;
    console.log(loadedComments);
}

/**
* @param {string} projectName
* @param {string} commentSender
* @param {string} commentText
* @param {number} position
*/
function insertComment(projectName, commentSender, commentText, commentTime, position) {
    //make the object if it does not exist
    if(!loadedComments[projectName]) {
        loadedComments[projectName] = {length: 0};
    }
    //append the length
    //push all elements in and after the position lower
    //put this element in the postion
    loadedComments[projectName]["length"] += 1;
    for(let i = loadedComments[projectName]["length"] - 1; i > position; i--) {
        loadedComments[projectName][i] = loadedComments[projectName][i - 1];
    }
    loadedComments[projectName][position] = commentSender + ANVILLE_DELIMITER + commentText + ANVILLE_DELIMITER + commentTime;
    console.log(loadedComments[projectName]);
}

function setLastDownloadedCommentIndex(projectName, index) {
    loadedComments[projectName]["lastDownloadedCommentIndex"] = index;
}

function handleUsersLoginStatus() {
    if (getCookie("isLoggedIn") === "true" || getCookie("isCreatingAccount") === "true") {
        //hide login and signupButtons
        let beFriendHereMeButton = document.getElementById("beFriendHereMeButton");
        let authenticateFriendshipButton = document.getElementById("authenticateFriendshipButton");

        beFriendHereMeButton.style.display = "none";
        authenticateFriendshipButton.style.display = "none";

        //show view profile button
        let viewProfileButton = document.getElementById("viewProfileButton");
        viewProfileButton.style.display = "inline-table";
        let forumButton = document.getElementById("forumButton");
        forumButton.style.display = "inline-table";

        //get the user's data
        let emailAddress = getCookie("emailAddress");
        let password = getCookie("password");
        let username = getCookie("username");

        let emailAddressInput = document.getElementById("emailAddressInput");
        let usernameInput = document.getElementById("usernameInput");

        emailAddressInput.value = emailAddress;
        usernameInput.value = username;

        //sign in ser first
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(userCredentials => {
                user = userCredentials.user;
                console.log("user...");
                console.log(user);

                //eitherway, the user's picture must be downloaded
                //start with the profile picture
                getImageURLFromStorageDB("users/" + user.uid, "profilePicture", (url) => {
                    //set this to the profile picture
                    let profilePicture = document.getElementById("profilePicture");
                    profilePicture.setAttribute("src", url);
                    //Now get the username and confirm it was not changed
                    getStringFromStorageDB("users/" + user.uid + "/username", downloadedUsername => {
                        if (downloadedUsername !== username) {
                            //update username both in cookie and views
                            setCookie("username", downloadedUsername);
                            usernameInput.value = downloadedUsername;
                        }
                    })
                }, (error) => {
                    console.log("User probably lacks profilepicture");
                    console.log("The error...");
                    console.log(error);
                    //get the username
                    getStringFromStorageDB("users/" + user.uid + "/username", downloadedUsername => {
                        if (downloadedUsername !== username) {
                            //update username both in cookie and views
                            setCookie("username", downloadedUsername);
                            usernameInput.value = downloadedUsername;
                        }
                    })
                })

                //now if logged in
                if (getCookie("isLoggedIn") === "true") {
                    //check if email is verified
                    if (!user.emailVerified) {
                        if (confirm("Please verify your email, " + username + " 🥺")) {
                            sendEmailVerification(user)
                                .then(() => {
                                    alert("Email sent, Please check your email inbox or spam folder 😁")
                                })
                                .catch(error => {
                                    alert("Sorry, an error occurred 😢");
                                    console.log("Error while sending verifcation email...");
                                    console.log(error);
                                })
                        }
                    }
                } else if (getCookie("isCreatingAccount") === "true") {
                    setCookie("isCreatingAccount", "false", 1);
                    setCookie("isLoggedIn", "true", 90);
                    //get the data
                    if (getCookie("verificationEmailSent") === "true" && !user.emailVerified) {
                        alert("Please check your email inbox or spam folder");
                    }
                }
            })

            .catch(error => {
                alert("error logging in");
                console.log("Error while logging user in...");
                console.log(error);
            });
    }
}

/**
* @param {object} popup
* @param {string} display
*/
function showPopup(popup, display, specialExecution) {
    popup.style.display = display;
    currentVisiblePopup = popup;
    let backgroundTint = document.getElementById("backgroundTint");
    backgroundTint.style.display = "table";
    backgroundTint.addEventListener("click", (event) => {
        hidePopup();
    });
    if(specialExecution) {
        specialExecutionForClosedPopup = specialExecution;
    }
}

function hidePopup() {
    currentVisiblePopup.style.display = "none";
    let backgroundTint = document.getElementById("backgroundTint");
    backgroundTint.style.display = "none";
    
    if(specialExecutionForClosedPopup) {
        specialExecutionForClosedPopup();
    }
}

/**
* @param {string} projectName The name
*/
function showCommentingPopup(projectName) {
    if (getCookie("isLoggedIn") === "true") {
        let commentingPopup = document.getElementById("commentingPopup");
        let projectsCommentsContainerScrollable = document.getElementById("projectsCommentsContainerScrollable");
        showPopup(commentingPopup, "table", () => {
            projectsCommentsContainerScrollable.innerHTML = "<div id=\"getCommentsButtonsContainer\">\n<input id=\"getMoreCommentsButton\" class=\"buttons\" type=\"button\" value=\"get more comments\">\n<input id=\"getAllCommentsButton\" class=\"buttons\" type=\"button\" value=\"get all comments\">\n</div>\n";
        });
        //set the projects name
        let commentsProjectName = document.getElementById("commentsProjectName");
        commentsProjectName.innerText = projectName;
        //get the older comments
        if(loadedComments[projectName]) {
            inflateDownloadedComments(projectName);
        } else {
            getCommentsFromStorageDB(projectName, 0, 20);
        }
    } else {
        let signUpInOrLoginPopUp = document.getElementById("signUpInOrLoginPopUp");
        let commentsAsGuestProjectName = document.getElementById("commentsAsGuestProjectName");
        commentsAsGuestProjectName.innerText = projectName;
        //download the comments only if they are not present in the loadedCommentsObject
        showPopup(signUpInOrLoginPopUp, "table");
    }
}

/**
* @param {string} projectName
* @param {number} startIndex
* @param {number} amount
*/
function getCommentsFromStorageDB(projectName, startIndex, amount) {
    if(isDownloadingComments) {
        alert("Please wait, some comments are still downloading!🥺");
        return;
    } else if(isUploadingComments) {
        alert("Please wait, another comment is still being uploaded!🥺");
        return;
    }
    
    isDownloadingComments = true;
    
    /*streamStringsFromStorageDBFolder(direction, fullFolderPath, startIndex, amount, stringChunkListener, callBackFunction, errorHandler)*/
    streamStringsFromStorageDBFolder(DIRECTION_FIRST_TO_LAST, "comments/" + projectName, startIndex, amount, (downloadedCommentTextDSV, commentRef) => {
        /*
          <div class="comment sentComment">
            <div class="commentSenderNameContainer">
              <input type="text"  value="yourUsername" readonly>
            </div>
            This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
          </div>
        */
        let downloadedCommentText = downloadedCommentTextDSV.substring(0, downloadedCommentTextDSV.indexOf(ANVILLE_DELIMITER));
        let downloadedCommentTime = downloadedCommentTextDSV.substring(downloadedCommentTextDSV.indexOf(ANVILLE_DELIMITER) + 15);
        let commentRootDiv = document.createElement("div");
        let emailAddress = getCookie("emailAddress");
        if(commentRef.name.substring(0, commentRef.name.indexOf(ANVILLE_DELIMITER)) === emailAddress) {
            commentRootDiv.setAttribute("class", "comment sentComment");
        } else {
            commentRootDiv.setAttribute("class", "comment receivedComment");
        }
        let commentSenderContainer = document.createElement("div");
        commentSenderContainer.setAttribute("class",  "commentSenderNameContainer");
        let commentSenderName = document.createElement("input");
        commentSenderName.setAttribute("type", "text");
        commentSenderName.setAttribute("value", commentRef.name.substring(0, commentRef.name.indexOf(ANVILLE_DELIMITER)));
        commentSenderName.readOnly = true;
        commentSenderContainer.appendChild(commentSenderName);
        commentRootDiv.appendChild(commentSenderContainer);
        //Now the actual comment
        commentRootDiv.innerHTML += "<br>" + downloadedCommentText;
        commentRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + downloadedCommentTime + "\" readonly>" + "</div>";
        //Now append it to comments container
        console.log(commentRootDiv);
        //insert the comment at the top
        insertComment(projectName, commentRef.name.substring(0, commentRef.name.indexOf(ANVILLE_DELIMITER)), downloadedCommentText, downloadedCommentTime, 0);
        //inflate if popp is visible only
        let commentingPopup = document.getElementById("commentingPopup");
        if(commentingPopup.style.display === "table") {
            //clear error messages if available
            if(projectsCommentsContainerScrollable.innerText === "There are no comments for this project yet!" || projectsCommentsContainerScrollable.innerText === "An error occured while loading the comments 🥺!") {
                projectsCommentsContainerScrollable.innerText = "";
            }
            projectsCommentsContainerScrollable.insertBefore(commentRootDiv, projectsCommentsContainerScrollable.children[1]);
            let projectsCommentsContainer = document.getElementById("projectsCommentsContainer");
            projectsCommentsContainer.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, (hasMoreComments, index) => {
        isDownloadingComments = false;
        console.log("Comments downloaded successfully!");
        let getCommentsButtonsContainer = document.getElementById("getCommentsButtonsContainer");
        if(hasMoreComments) {
            console.log("moreCommentsPresent");
            setLastDownloadedCommentIndex(projectName, index);
            getCommentsButtonsContainer.style.display = "table";
            
            //For persistence due to prior probable inadvertent removal of the listners
            let getMoreCommentsButton = document.getElementById("getMoreCommentsButton");
            getMoreCommentsButton.onclick = (event) => {
                let projectName = document.getElementById("commentsProjectName").innerText;
                console.log(projectName);
                getCommentsFromStorageDB(projectName, loadedComments[projectName]["lastDownloadedCommentIndex"], 20);
            };
            let getAllCommentsButton = document.getElementById("getAllCommentsButton");
            getAllCommentsButton.onclick = (event) => {
                let projectName = document.getElementById("commentsProjectName").innerText;
                getCommentsFromStorageDB(projectName, loadedComments[projectName]["lastDownloadedCommentIndex"], NaN/*NaN means while streaming, index === amount + index will always be false, thus the base of recursion is only length of items*/);
            };
            
        } else {
            console.log("No more comments");
            setLastDownloadedCommentIndex(projectName, NaN);
            getCommentsButtonsContainer.style.display = "none";
        }
        listenForNewComments(projectName);
    }, (/*ZeroCommentsHandler*/) => {
        isDownloadingComments = false;
        console.log("No comments found!");
        let projectsCommentsContainerScrollable = document.getElementById("projectsCommentsContainerScrollable");
        projectsCommentsContainerScrollable.innerText = "There are no comments for this project yet!";
        listenForNewComments(projectName);
    }, (error) => {
        isDownloadingComments = false;
        console.log("Error while streaming comments...");
        console.log(error);
        projectsCommentsContainerScrollable.innerText = "An error occured while loading the comments 🥺!";
        listenForNewComments(projectName);
    })
}

function getCommentFromStorageDB(projectName, commentName, callBackFunction) {
    getStringFromStorageDB("comments/" + projectName + "/" + commentName, downloadedCommentTextDSV => {
        /*
          <div class="comment sentComment">
            <div class="commentSenderNameContainer">
              <input type="text"  value="yourUsername" readonly>
            </div>
            This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
          </div>
        */
        let downloadedCommentText = downloadedCommentTextDSV.substring(0, downloadedCommentTextDSV.indexOf(ANVILLE_DELIMITER));
        let downloadedCommentTime = downloadedCommentTextDSV.substring(downloadedCommentTextDSV.indexOf(ANVILLE_DELIMITER) + 15);
        let commentRootDiv = document.createElement("div");
        let emailAddress = getCookie("emailAddress");
        if(commentName.substring(0, commentName.indexOf(ANVILLE_DELIMITER)) === emailAddress) {
            commentRootDiv.setAttribute("class", "comment sentComment");
        } else {
            commentRootDiv.setAttribute("class", "comment receivedComment");
        }
        let commentSenderContainer = document.createElement("div");
        commentSenderContainer.setAttribute("class",  "commentSenderNameContainer");
        let commentSenderName = document.createElement("input");
        commentSenderName.setAttribute("type", "text");
        commentSenderName.setAttribute("value", commentName.substring(0, commentName.indexOf(ANVILLE_DELIMITER)));
        commentSenderName.readOnly = true;
        commentSenderContainer.appendChild(commentSenderName);
        commentRootDiv.appendChild(commentSenderContainer);
        //Now the actual comment
        commentRootDiv.innerHTML += "<br>" + downloadedCommentText;
        commentRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + downloadedCommentTime + "\" readonly>" + "</div>";
        //Now append it to comments container
        console.log(commentRootDiv);
        //insert the comment at the top
        addComment(projectName, commentName.substring(0, commentName.indexOf(ANVILLE_DELIMITER)), downloadedCommentText, downloadedCommentTime);
        //inflate if popp is visible only
        let commentingPopup = document.getElementById("commentingPopup");
        if(commentingPopup.style.display === "table") {
            //clear error messages if available
            if(projectsCommentsContainerScrollable.innerText === "There are no comments for this project yet!" || projectsCommentsContainerScrollable.innerText === "An error occured while loading the comments 🥺!") {
                projectsCommentsContainerScrollable.innerText = "";
            }
            projectsCommentsContainerScrollable.appendChild(commentRootDiv);
            let projectsCommentsContainer = document.getElementById("projectsCommentsContainer");
            projectsCommentsContainer.scrollTo({
                top: projectsCommentsContainerScrollable.offsetHeight,
                behavior: "smooth"
            });
        }
    })
}

/**
* @param {string} projectName
*/
function inflateDownloadedComments(projectName) {
    for(let i = 0; i < loadedComments[projectName]["length"]; i++) {
        let commentDSV = loadedComments[projectName][i];
        let commentSender = commentDSV.substring(0, commentDSV.indexOf("<--anville95-->"));
        commentDSV = commentDSV.substring(commentDSV.indexOf(ANVILLE_DELIMITER) + 15);
        let commentText = commentDSV.substring(0, commentDSV.indexOf("<--anville95-->"));
        let commentTime = commentDSV.substring(commentDSV.indexOf(ANVILLE_DELIMITER) + 15);
        //Now inflate it
        /*
          <div class="comment sentComment">
            <div class="commentSenderNameContainer">
              <input type="text"  value="yourUsername" readonly>
            </div>
            This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
          </div>
        */
        let commentRootDiv = document.createElement("div");
        let emailAddress = getCookie("emailAddress");
        if(commentSender === emailAddress) {
            commentRootDiv.setAttribute("class", "comment sentComment");
        } else {
            commentRootDiv.setAttribute("class", "comment receivedComment");
        }
        let commentSenderContainer = document.createElement("div");
        commentSenderContainer.setAttribute("class",  "commentSenderNameContainer");
        let commentSenderName = document.createElement("input");
        commentSenderName.setAttribute("type", "text");
        commentSenderName.setAttribute("value", commentSender);
        commentSenderName.readOnly = true;
        commentSenderContainer.appendChild(commentSenderName);
        commentRootDiv.appendChild(commentSenderContainer);
        //Now the actual comment
        commentRootDiv.innerHTML += "<br>" + commentText;
        commentRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + commentTime + "\" readonly>" + "</div>";
        //Now append it to comments container
        console.log(commentRootDiv);
        projectsCommentsContainerScrollable.appendChild(commentRootDiv);
        let projectsCommentsContainer = document.getElementById("projectsCommentsContainer");
        projectsCommentsContainer.scrollTo({
            top: projectsCommentsContainerScrollable.offsetHeight,
            behavior: "smooth"
        });
    }
    //show the buttons for getting more commentss if there are more comments
    let getCommentsButtonsContainer = document.getElementById("getCommentsButtonsContainer");
    console.log(getCommentsButtonsContainer);
    if(isNaN(loadedComments[projectName]["lastDownloadedCommentIndex"])) {
        getCommentsButtonsContainer.style.display = "none";
    } else {
        getCommentsButtonsContainer.style.display = "table";
    }
}

function comment() {
    if(isDownloadingComments) {
        alert("Please wait, some comments are still downloading!🥺");
        return;
    } else if(isUploadingComments) {
        alert("Please wait, another comment is still being uploaded!🥺");
        return;
    }
    
    let commentTextArea = document.getElementById("commentTextArea");
    let commentText = commentTextArea.value;
    if (!commentText.trim()) {
        alert("Sorry, I can't allow you to send an empty comment🥺");
    } else {
        
        isUploadingComments = true;
    
        //clear the text area
        commentTextArea.value = "";
        let emailAddress = getCookie("emailAddress");
        let projectName = document.getElementById("commentsProjectName").innerText;
        let sentCommentTime = getCurrentDateAndTime();
        let timeStamp = (new Date()).getTime();
        uploadString(ref(storage, "comments/" + projectName + "/" + emailAddress + ANVILLE_DELIMITER + timeStamp), commentText + ANVILLE_DELIMITER + sentCommentTime)
        .then(() => {
            isUploadingComments = false;
            let projectsCommentsContainerScrollable = document.getElementById("projectsCommentsContainerScrollable");
            //inflate the comment
            /*
              <div class="comment sentComment">
                <div class="commentSenderNameContainer">
                  <input type="text"  value="yourUsername" readonly>
                </div>
                This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
              </div>
            */
            let commentRootDiv = document.createElement("div");
            commentRootDiv.setAttribute("class", "comment sentComment");
            let commentSenderContainer = document.createElement("div");
            commentSenderContainer.setAttribute("class",  "commentSenderNameContainer");
            let commentSenderName = document.createElement("input");
            commentSenderName.setAttribute("type", "text");
            commentSenderName.setAttribute("value", emailAddress);
            commentSenderName.readOnly = true;
            commentSenderContainer.appendChild(commentSenderName);
            commentRootDiv.appendChild(commentSenderContainer);
            //Now the actual comment
            commentRootDiv.innerHTML += "<br>" + commentText;
            commentRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + sentCommentTime + "\" readonly>" + "</div>";
            //Now append it to comments container
            console.log(commentRootDiv)
            projectsCommentsContainerScrollable.appendChild(commentRootDiv);
            addComment(projectName, emailAddress, commentText, sentCommentTime);
            projectsCommentsContainer.scrollTo({
                top: projectsCommentsContainerScrollable.offsetHeight,
                behavior: "smooth"
            });
            notifyNewComment(projectName, emailAddress, timeStamp);
        })

        .catch(error => {
            isUploadingComments = false;
            alert("Sorry, an error occurred whilst sending comment! 🥺");
            console.log("Error during commenting...");
            console.log(error);
        })
    }
}

function commentAsGuest() {
    if(isUploadingComments) {
        alert("Please wait, another comment is being uploaded!🥺");
        return;
    }
    
    let commentSendersEmailAddress = document.getElementById("commentAsGuestEmailAddress").value;
    let commentAsGuestTextArea = document.getElementById("commentAsGuestTextArea");
    let commentText = commentAsGuestTextArea.value;
    let projectName = document.getElementById("commentsAsGuestProjectName").innerText;
    let timeStamp = (new Date()).getTime();

    if (!commentSendersEmailAddress.trim()) {
        alert("Sorry, the email address is required!");
    } else if (commentSendersEmailAddress.indexOf("@") < 1) {
        alert("Sorry, a valid email address is required here!");
    } else if (!commentText.trim()) {
        alert("Sorry, I can't allow you to send an empty comment");
    } else {
        
        isUploadingComments = true;
    
        //remove the comment text
        commentAsGuestTextArea.value = "";
        let commentAsGuestTimeStamp = getCurrentDateAndTime();
        //post the comment
        uploadString(ref(storage, "comments/" + projectName + "/" + commentSendersEmailAddress + ANVILLE_DELIMITER + timeStamp), commentText + ANVILLE_DELIMITER + commentAsGuestTimeStamp)
            .then(() => {
                isUploadingComments = false;
                alert("Thank you for the feedback😁");
                notifyNewComment(projectName, commentSendersEmailAddress, timeStamp);
            }
            )
            .catch(error => {
                isUploadingComments = false;
                alert("Sorry, an error occurred whilst sending comment! 🥺");
            });
    }
}

function setButtonsClickListners() {
    //all projects' buttons
    let projectsContainer = document.getElementById("projectsContainer");

    for (let i = 0; i < projectsContainer.children.length; i++) {
        let tryProjectButton;
        let viewProjectFilesButton;
        let commentOnProjectButton;
        if(window.location.href.indexOf("phone") < 0) {
            tryProjectButton = projectsContainer.children[i].children[1].children[0].children[0];
            viewProjectFilesButton = projectsContainer.children[i].children[1].children[0].children[1];
            commentOnProjectButton = projectsContainer.children[i].children[1].children[0].children[2];
        } else {
            tryProjectButton = projectsContainer.children[i].children[2].children[0];
            viewProjectFilesButton = projectsContainer.children[i].children[2].children[1];
            commentOnProjectButton = projectsContainer.children[i].children[2].children[2];
        }
        //try project
        tryProjectButton.addEventListener("click", (event) => {
            let action = tryProjectButton.getAttribute("action");
            let href = tryProjectButton.getAttribute("href");
            if (action === "file") {
                window.open(href);
            } else if (action === "link") {
                window.location.href = href;
            } else {
                alert("You want to comment on the project 😁");
            }
        });

        viewProjectFilesButton.addEventListener("click", (event) => {
            //relocate to the githublink
            let gitHubLink = viewProjectFilesButton.getAttribute("gitHubLink");
            window.location.href = gitHubLink;
        });

        commentOnProjectButton.addEventListener("click", (event) => {
            showCommentingPopup(commentOnProjectButton.getAttribute("projectName"));
        });
    }

    //If the user is logged in, set the listener for commenting button
    if (getCookie("isLoggedIn") === "true") {
        let addCommentButton = document.getElementById("addCommentButton");
        let emailAddress = getCookie("emailAddress");
        //now set
        addCommentButton.addEventListener("click", (event) => {
            comment();
        });
        //getting more comments
        let getMoreCommentsButton = document.getElementById("getMoreCommentsButton");
        getMoreCommentsButton.onclick = (event) => {
            console.log("YOU WANT TO GET MORE COMMENTS");
            console.log(loadedComments);
            let projectName = document.getElementById("commentsProjectName").innerText;
            console.log(projectName);
            getCommentsFromStorageDB(projectName, loadedComments[projectName]["lastDownloadedCommentIndex"], 20);
        };
        let getAllCommentsButton = document.getElementById("getAllCommentsButton");
        getAllCommentsButton.onclick = (event) => {
            let projectName = document.getElementById("commentsProjectName").innerText;
            getCommentsFromStorageDB(projectName, loadedComments[projectName]["lastDownloadedCommentIndex"], NaN/*NaN means while streaming, index === amount + index will always be false, thus the base of recursion is only length of items*/);
        };
        //profile
        let viewProfileButton = document.getElementById("viewProfileButton");
        let profilePopup = document.getElementById("profilePopup");
        viewProfileButton.addEventListener("click", () => {
            showPopup(profilePopup, "table");
        });
        //editProfileButton
        isSaveModeOn = false;
        let editProfileButton = document.getElementById("editProfileButton");
        editProfileButton.addEventListener("click", (event) => {

            let selectImage = document.getElementById("selectImage");
            let profilePicture = document.getElementById("profilePicture");

            //there's an isSaveModeOn
            if(isSaveModeOn) {
                isSaveModeOn = false;
                editProfileButton.value = "EDIT";
                //make the username field uneditable
                let emailAddressInput = document.getElementById("emailAddressInput");
                emailAddressInput.readOnly = true;
                let usernameInput = document.getElementById("usernameInput");
                usernameInput.readOnly = true;
                //also the picture
                //since the event handler was am amonymous function, to remove it I must use a little trick
                let profilePopup = document.getElementById("profilePopup");
                //I first remove the original element which has the click listener
                profilePopup.removeChild(profilePicture);
                //Now I replace it with a clone, which lacks the listeners.
                profilePicture = profilePicture.cloneNode(true);
                profilePopup.insertBefore(profilePicture, profilePopup.children[0]);
                //all these happen too fast to be noticeable
                profilePicture.style.cursor = "default";
                //new values
                let newEmailAddress = emailAddressInput.value;
                let newUsername = usernameInput.value;
                //update the email address in the auth
                let oldEmailAddress = getCookie("emailAddress");
                let oldUsername = getCookie("username");
                
                let password = getCookie("password");
                
                //update the profile picture if it was changes
                if(selectImage.files[0]) {
                    uploadImageToDB("users/" + user.uid + "/profilePicture", selectImage.files[0], () => {
                        console.log("Profile picture updated successfully!");
                        //now check if the others were modified as well
                        if(newEmailAddress !== oldEmailAddress) {
                            updateEmail(user, newEmailAddress)
                            .then(() => {
                                console.log("Email Address updated successfully");
                                //update the email in the cookie
                                setCookie("emailAddress", newEmailAddress);
                                //now update the username if it was changed
                                if(oldUsername !== newUsername) {
                                    uploadString(ref(storage, "users/" + userCredentials.user.uid + "/username"), usernameInput.value)
                                    .then(() => {
                                        console.log("Username updated successfully!");
                                        //update username in cookie
                                        setCookie("username", newUsername);
                                    })
                                }
                            })
                        }
                        //otherwise update username only if it's the only thing that was changed
                        else if(newUsername !== oldUsername) {
                            uploadString(ref(storage, "users/" + user.uid + "/username"), newUsername)
                            .then(() => {
                                console.log("Username updated successfully!");
                                //update username in cookie
                                setCookie("username", newUsername);
                            })
                        }
                    })
                }
                //update email if it was changes
                else if(newEmailAddress !== oldEmailAddress) {
                    updateEmail(user, newEmailAddress)
                    .then(() => {
                        console.log("Email Address updated successfully");
                        //update the email in the cookie
                        setCookie("emailAddress", newEmailAddress);
                        //now update the username if it was changed
                        if(oldUsername !== newUsername) {
                            uploadString(ref(storage, "users/" + userCredentials.user.uid + "/username"), usernameInput.value)
                            .then(() => {
                                console.log("Username updated successfully!");
                                //update username in cookie
                                setCookie("username", newUsername);
                            })
                        }
                    })
                }
                //otherwise update username only if it's the only thing that was changed
                else if(newUsername !== oldUsername) {
                    uploadString(ref(storage, "users/" + user.uid + "/username"), newUsername)
                    .then(() => {
                        console.log("Username updated successfully!");
                        //update username in cookie
                        setCookie("username", newUsername);
                    })
                }
            } else {
                isSaveModeOn = true;
                editProfileButton.value = "SAVE";
                //make the username field editable
                let emailAddressInput = document.getElementById("emailAddressInput");
                emailAddressInput.readOnly = false;
                let usernameInput = document.getElementById("usernameInput");
                usernameInput.readOnly = false;
                //make the profile picture editable as well
                profilePicture.style.cursor = "pointer";
                profilePicture.addEventListener("click", (event) => {
                    selectImage.click();
                    selectImage.addEventListener("change", () => {
                        //change the local profile picture if a file was selected
                        if(selectImage.files[0]) {
                            profilePicture.setAttribute("src", URL.createObjectURL(selectImage.files[0]));
                        }
                    })
                })
            }
        });
        //logoutButton
        let logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", (event) => {
            //clear the cookies and reload the page
            setCookie("isLoggedIn", "false", 1);
            setCookie("emailAddress", "", 1);
            setCookie("password", "", 1);
            setCookie("username", "", 1);
            //reload
            window.location.href = "";
        })
        //otherwise set the listener for commenting as guest
    } else {
        //signuporloginorcommentasguest popup
        //commentAsGuestPopup
        let commentAsGuestButton = document.getElementById("commentAsGuestButton");
        commentAsGuestButton.addEventListener("click", (event) => {
            let commentAsGuestPopup = document.getElementById("commentAsGuestPopup");
            //hide the popup shown to show this popup first
            hidePopup();
            showPopup(commentAsGuestPopup, "table");
        });
        //goToSignUpPageButton
        let goToSignUpPageButton = document.getElementById("goToSignUpPageButton");
        goToSignUpPageButton.addEventListener("click", (event) => {
            if(window.location.href.indexOf("phone") < 0) {
                window.location.href = "html/sign-up.html";
            } else {
                window.location.href = "phone-sign-up.html";
            }
            hidePopup();
        });
        //goToLoginPageButton
        let goToLoginPageButton = document.getElementById("goToLoginPageButton");
        goToLoginPageButton.addEventListener("click", (event) => {
            if(window.location.href.indexOf("phone") < 0) {
                window.location.href = "html/login.html";
            } else {
                window.location.href = "phone-login.html";
            }
            hidePopup();
        });
        //comment as guest popup
        let addCommentAsGuestButton = document.getElementById("addCommentAsGuestButton");
        addCommentAsGuestButton.addEventListener("click", (event) => {
            commentAsGuest();
        })
    }
}

//DATABASE UTILITIES

/**
* @param {string} fullPath
* @param {function} callBackFunction
*/
function getStringFromStorageDB(fullPath, callBackFunction, errorHandler) {
    getBytes(ref(storage, fullPath))
        .then((bytes) => {
            var array = new Uint8Array(bytes);
            //textencode
            var decoder = new TextDecoder();
            var downloadedString = decoder.decode(array);
            callBackFunction(downloadedString);
        })
        .catch(error => {
            if (errorHandler) {
                errorHandler(error);
            } else {
                console.log("Error while getting string and no handler provided!");
                console.log("error:");
                console.log(error);
            }
        })
}

/**
* @param {number} direction
* @param {array} prefixes
* @param {number} index
* @param {number} stopIndex
* @param {function} stringChunkListener
* @param {function} callBackFunction
*/
function getSingleStringStreamChunkFromStorageDB(direction, items, index, stopIndex/*StopIndex = startIndex + amount - 1*/, stringChunkListener, callBackFunction) {
    getStringFromStorageDB(items[index].fullPath, stringChunk => {
        stringChunkListener(stringChunk, items[index]);
        if (index === stopIndex || index === items.length - 1 || (direction === DIRECTION_LAST_TO_FIRST && index === 0)) {
            if (callBackFunction) {
                //if there's more
                if(index < items.length - 1) {
                    callBackFunction(true, index);
                } else {
                    callBackFunction(false);
                }
            }
        } else {
            if (direction === DIRECTION_FIRST_TO_LAST) {
                getSingleStringStreamChunkFromStorageDB(direction, items, index + 1, stopIndex, stringChunkListener, callBackFunction);
            } else if (direction === DIRECTION_LAST_TO_FIRST) {
                getSingleStringStreamChunkFromStorageDB(direction, items, index - 1, stopIndex, stringChunkListener, callBackFunction);
            }
        }
    })
}

/**
* @param {number} direction
* @param {string} fullFolderPath
* @param {number} startIndex
* @param {number} amount
* @param {function} stringChunkListener
* @param {function} callBackFunction
* @param {fuction} zeroStringsHandler
* @param {function}rerrorHandler
*/
function streamStringsFromStorageDBFolder(direction, fullFolderPath, startIndex, amount, stringChunkListener, callBackFunction, zeroStringsHandler, errorHandler) {
    listAll(ref(storage, fullFolderPath))
    .then(response => {
        console.log("response...");
        console.log(response);
        //Now by direction from offset and by amount
        if (response.items.length > 0) {
            console.log("items before sorting...");
            console.log(response.items);
            let sortedItems = sortItemsWithTime(response.items);
            console.log("items after sorting with time...");
            console.log(sortedItems);
            //start from offset going forward
            getSingleStringStreamChunkFromStorageDB(direction, sortedItems, startIndex, startIndex + amount - 1, stringChunkListener, callBackFunction);
        } else {
            zeroStringsHandler();
        }
    })
    .catch(error => {
        if(errorHandler) {
            errorHandler(error);
        } else {
            console.log("Error encountered whilst streaming strings from DB and no handler was provided.");
            console.log("error:");
            console.log(error);
        }
    });
}

/**
* @param {string} fullFoldePath
* @param {string} imageName
* @param {function} callBackFunction
* @param {function} callBackFunction
*/
function getImageURLFromStorageDB(fullFolderPath, imageName, callBackFunction, errorHandler) {
    getStringFromStorageDB(fullFolderPath + "/" + imageName + "Extension", extension => {
        //now get the actual image
        getDownloadURL(ref(storage, fullFolderPath + "/" + imageName + "." + extension))
            .then(url => {
                callBackFunction(url);
            })
            .catch(error => {
                if (errorHandler) {
                    errorHandler(error);
                } else {
                    console.log("Error during getting image url and handler not provided!");
                    console.log("error:");
                    console.log(error);
                }
            })
    })
}

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

//UTILITY FUNCTIONS
function sortItemsWithTime(items) {
    //swapping sort
    for(var i = 0; i < items.length; i++) {
        for(var j = 0; j < items.length; j++) {
            let timeStamp1 = Number(items[i].name.substring(items[i].name.indexOf(ANVILLE_DELIMITER) + 15));
            let timeStamp2 = Number(items[j].name.substring(items[j].name.indexOf(ANVILLE_DELIMITER) + 15));
            
            if(i < j && timeStamp1 < timeStamp2) {
                let swap = items[i];
                items[i] = items[j];
                items[j] = swap;
            }
        }
    }
    
    return items;
}

function getCurrentDateAndTime() {
    let now = new Date();
    return monthNumberToWords(now.getMonth()) + " " + now.getDate() + " " + now.getFullYear() + ", " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

/**
* @param {number} monthNumber
*/
function monthNumberToWords(monthNumber) {
    switch(monthNumber) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "I have no idea what you're talking about!😂";
    }
}

function notifyNewComment(projectName, commentSender, timeStamp) {
    console.log("NOTIFYING NEW COMMENT");
    console.log("Comment name: " + commentSender + ANVILLE_DELIMITER + timeStamp);
    const newCommentRef = push(rtdbRef(rtdb, "comments/" + projectName));
    set(newCommentRef, commentSender + ANVILLE_DELIMITER + timeStamp);
}

function listenForNewComments(projectName) {
    onChildAdded(rtdbRef(rtdb, "comments/" + projectName), data => {
        let commentName = data.val();
        if(commentName.indexOf(getCookie("emailAddress")) < 0) {
            getCommentFromStorageDB(projectName, commentName, () => {
                deleteCommentNotificationAferThreeSeconds(projectName, data.key);
            });
        } else {
            deleteCommentNotificationAferThreeSeconds(projectName, data.key)
        }
    })
}

function deleteCommentNotificationAferThreeSeconds(projectName, commentKey) {
    setTimeout(() => {
        remove(rtdbRef(rtdb, "comments/" + projectName + "/" + commentKey)).then(() => {
            console.log("New comment notification deleted successfully after three seconds!");
        }).catch(error => {
            console.log("Error while deleting new comment notification...");
            console.log(error);
        })
    }, 3000);
}

//EXPLICIT EXECUTIONS

handleUsersLoginStatus();

setButtonsClickListners();