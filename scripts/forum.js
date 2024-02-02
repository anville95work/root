//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if (height / width > 1 && window.location.href.indexOf("phone") < 0) {
	window.location.replace("phone-forum.html");
} else if (height / width < 1 && window.location.href.indexOf("phone") > 0) {
    window.location.replace("forum.html");
}
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

var lastDownloadedMessageIndex;
var isGettingMessages = false;
var isSendingMessage = false;
//prevent double/tripple inflation
var listenedMessageNames = {};

/**
* @param {number} startIndex
* @param {number} amount
* @param {function} callBackFunction
*/
function getMessages(startIndex, amount, callBackFunction) {
    if(isGettingMessages) {
        alert("Please wait 🥺 Other messages are downloading...");
        return;
    } else if(isSendingMessage) {
        alert("Please wait, a message is being sent still!🥺");
        return;
    }
    isGettingMessages = true;
    /*streamStringsFromStorageDBFolder(direction, fullFolderPath, startIndex, amount, stringChunkListener, callBackFunction, zeroStringsHandler, errorHandler)*/
    streamStringsFromStorageDBFolder(DIRECTION_FIRST_TO_LAST, "messages", startIndex, amount, (messageTextAndTime, messageRef) => {
        //inflate the new message
        let messageSenderEmailAddress = messageRef.name.substring(0, messageRef.name.indexOf(ANVILLE_DELIMITER));
        let emailAddress = getCookie("emailAddress");
        
        let messageText = messageTextAndTime.substring(0, messageTextAndTime.indexOf(ANVILLE_DELIMITER));
        let messageTime = messageTextAndTime.substring(messageTextAndTime.indexOf(ANVILLE_DELIMITER) + 15);
        
        let messagesContainerChild = document.getElementById("messagesContainerChild");
        let messagesContainer = document.getElementById("messagesContainer");

        if (messageSenderEmailAddress === emailAddress) {
            //message is sent
            /*
            <div class="messageLine sentMessageLine">
              <div class="message sentMessage">
                <div class="messageSenderNameContainer">
                  <input type="text"  value="yourUsername" readonly>
                </div>
                This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
                <div class="timeInputContainer">
                    <input type="text" value="June 24th 2000, 23:00" readonly>
                </div>
              </div>
            </div>
            */
            let messageLine = document.createElement("div");
            messageLine.setAttribute("class", "messageLine sentMessageLine");
            let messageRootDiv = document.createElement("div");
            messageRootDiv.setAttribute("class", "message sentMessage");
            let messageSenderNameContainer = document.createElement("div");
            messageSenderNameContainer.setAttribute("class", "messageSenderNameContainer");
            let messageSenderEmailAddressInput = document.createElement("input");
            messageSenderEmailAddressInput.setAttribute("type", "text");
            messageSenderEmailAddressInput.readOnly = true;
            messageSenderEmailAddressInput.setAttribute("value", messageSenderEmailAddress);
            messageSenderNameContainer.appendChild(messageSenderEmailAddressInput);
            messageRootDiv.appendChild(messageSenderNameContainer);
            messageRootDiv.innerHTML += messageText;
            messageRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + messageTime + "\" readonly>" + "</div>";
            messageLine.appendChild(messageRootDiv);
            messagesContainerChild.insertBefore(messageLine, messagesContainerChild.children[1]);
            messagesContainer.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            });
            console.log(messageLine);

        } else {
            //message is received
            /*
            <div class="messageLine receivedMessageLine">
              <div class="message receivedMessage">
                <div class="messageSenderNameContainer">
                  <input type="text"  value="sender's Username" readonly>
                </div>
                This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
                <div class="timeInputContainer">
                    <input type="text" value="June 24th 2000, 23:00" readonly>
                </div>
              </div>
            </div>
            */
            let messageLine = document.createElement("div");
            messageLine.setAttribute("class", "messageLine receivedMessageLine");
            let messageRootDiv = document.createElement("div");
            messageRootDiv.setAttribute("class", "message receivedMessage");
            let messageSenderNameContainer = document.createElement("div");
            messageSenderNameContainer.setAttribute("class", "messageSenderNameContainer");
            let messageSenderEmailAddressInput = document.createElement("input");
            messageSenderEmailAddressInput.setAttribute("type", "text");
            messageSenderEmailAddressInput.readOnly = true;
            messageSenderEmailAddressInput.setAttribute("value", messageSenderEmailAddress);
            messageSenderNameContainer.appendChild(messageSenderEmailAddressInput);
            messageRootDiv.appendChild(messageSenderNameContainer);
            messageRootDiv.innerHTML += messageText;
            messageRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + messageTime + "\" readonly>" + "</div>";
            messageLine.appendChild(messageRootDiv);
            messagesContainerChild.insertBefore(messageLine, messagesContainerChild.children[1]);
            messagesContainer.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            });
        }
    }, (hasMoreMessages, lastMessageIndex) => {
        isGettingMessages = false;
        if(hasMoreMessages) {
            lastDownloadedMessageIndex = lastMessageIndex;
            //set the visibility of the older message button group
            let olderMessageGettingButtonGroup = document.getElementById("olderMessageGettingButtonGroup");
            olderMessageGettingButtonGroup.style.display = "table";
        } else {
            lastDownloadedMessageIndex = undefined;
            let olderMessageGettingButtonGroup = document.getElementById("olderMessageGettingButtonGroup");
            olderMessageGettingButtonGroup.style.display = "none";
        }
        listenForNewMessages();
    }, () => {
        console.log("No prior messages available!");
        let messagesContainerChild = document.getElementById("messagesContainerChild");
        messagesContainerChild.innerText = "No prior messages available! 🥺";
        isGettingMessages = false;
        listenForNewMessages();
    }, (error) => {
        console.log("Error occurred during retrieval of messages...");
        console.log(error);
        let messagesContainerChild = document.getElementById("messagesContainerChild");
        messagesContainerChild.innerText = "An error occurred during retrieval of messages, I apologise! 🥺";
        isGettingMessages = false;
        listenForNewMessages();
    })
}


function getMessage(messageName, callBackFunction) {
    getStringFromStorageDB("messages/" + messageName, messageTextAndTime => {
        //inflate the new message
        let messageSenderEmailAddress = messageName.substring(0, messageName.indexOf(ANVILLE_DELIMITER));
        let emailAddress = getCookie("emailAddress");
        
        let messageText = messageTextAndTime.substring(0, messageTextAndTime.indexOf(ANVILLE_DELIMITER));
        let messageTime = messageTextAndTime.substring(messageTextAndTime.indexOf(ANVILLE_DELIMITER) + 15);
        
        let messagesContainerChild = document.getElementById("messagesContainerChild");
        let messagesContainer = document.getElementById("messagesContainer");

        if (messageSenderEmailAddress === emailAddress) {
            //message is sent
            /*
            <div class="messageLine sentMessageLine">
              <div class="message sentMessage">
                <div class="messageSenderNameContainer">
                  <input type="text"  value="yourUsername" readonly>
                </div>
                This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
                <div class="timeInputContainer">
                    <input type="text" value="June 24th 2000, 23:00" readonly>
                </div>
              </div>
            </div>
            */
            let messageLine = document.createElement("div");
            messageLine.setAttribute("class", "messageLine sentMessageLine");
            let messageRootDiv = document.createElement("div");
            messageRootDiv.setAttribute("class", "message sentMessage");
            let messageSenderNameContainer = document.createElement("div");
            messageSenderNameContainer.setAttribute("class", "messageSenderNameContainer");
            let messageSenderEmailAddressInput = document.createElement("input");
            messageSenderEmailAddressInput.setAttribute("type", "text");
            messageSenderEmailAddressInput.readOnly = true;
            messageSenderEmailAddressInput.setAttribute("value", messageSenderEmailAddress);
            messageSenderNameContainer.appendChild(messageSenderEmailAddressInput);
            messageRootDiv.appendChild(messageSenderNameContainer);
            messageRootDiv.innerHTML += messageText;
            messageRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + messageTime + "\" readonly>" + "</div>";
            if(messagesContainerChild.innerText === "No prior messages available! 🥺" || messagesContainerChild.innerText === "An error occurred during retrieval of messages, I apologise! 🥺") {
                messagesContainerChild.innerText = "";
            }
            messageLine.appendChild(messageRootDiv);
            messagesContainerChild.appendChild(messageLine);
            messagesContainer.scrollTo(
            {
                top: messagesContainerChild.offsetHeight,
                behavior: "smooth"
            });
            console.log(messageLine);

        } else {
            //message is received
            /*
            <div class="messageLine receivedMessageLine">
              <div class="message receivedMessage">
                <div class="messageSenderNameContainer">
                  <input type="text"  value="sender's Username" readonly>
                </div>
                This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
                <div class="timeInputContainer">
                    <input type="text" value="June 24th 2000, 23:00" readonly>
                </div>
              </div>
            </div>
            */
            let messageLine = document.createElement("div");
            messageLine.setAttribute("class", "messageLine receivedMessageLine");
            let messageRootDiv = document.createElement("div");
            messageRootDiv.setAttribute("class", "message receivedMessage");
            let messageSenderNameContainer = document.createElement("div");
            messageSenderNameContainer.setAttribute("class", "messageSenderNameContainer");
            let messageSenderEmailAddressInput = document.createElement("input");
            messageSenderEmailAddressInput.setAttribute("type", "text");
            messageSenderEmailAddressInput.readOnly = true;
            messageSenderEmailAddressInput.setAttribute("value", messageSenderEmailAddress);
            messageSenderNameContainer.appendChild(messageSenderEmailAddressInput);
            messageRootDiv.appendChild(messageSenderNameContainer);
            messageRootDiv.innerHTML += messageText;
            messageRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + messageTime + "\" readonly>" + "</div>";
            if(messagesContainerChild.innerText === "No prior messages available! 🥺" || messagesContainerChild.innerText === "An error occurred during retrieval of messages, I apologise! 🥺") {
                messagesContainerChild.innerText = "";
            }
            messageLine.appendChild(messageRootDiv);
            messagesContainerChild.appendChild(messageLine);
            messagesContainer.scrollTo(
            {
                top: messagesContainerChild.offsetHeight,
                behavior: "smooth"
            });
        }
        
        if(callBackFunction) {
            callBackFunction();
        }
    })
}

function sendMessage() {
    //Dont send if streaming is in progress
    if(isGettingMessages) {
        alert("Please wait, some messages are still downloading!🥺");
        return;
    } else if(isSendingMessage) {
        alert("Please wait, another message is being sent!🥺");
        return;
    }
    isSendingMessage = true;
    let messageTextInput = document.getElementById("bottomBar").children[0];
    let messageText = messageTextInput.value;
    messageTextInput.value = "";
    if (!messageText.trim()) {
        alert("Sorry, I can't let you send an empty message");
    } else {
        let emailAddress = getCookie("emailAddress");
        //get the timestamp
        let timeStamp = (new Date()).getTime();
        let currentDateAndTime = getCurrentDateAndTime();
        uploadString(ref(storage, "messages/" + emailAddress + ANVILLE_DELIMITER + timeStamp), messageText + ANVILLE_DELIMITER + currentDateAndTime)
            .then(() => {
                //inflate the sent message
                /*
                <div class="messageLine sentMessageLine">
                  <div class="message sentMessage">
                    <div class="messageSenderNameContainer">
                      <input type="text"  value="yourUsername" readonly>
                    </div>
                    This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.
                    <div class="timeInputContainer">
                        <input type="text" value="June 24th 2000, 23:00" readonly>
                    </div>
                  </div>
                </div>
                */
                let messageLine = document.createElement("div");
                messageLine.setAttribute("class", "messageLine sentMessageLine");
                let messageRootDiv = document.createElement("div");
                messageRootDiv.setAttribute("class", "message sentMessage");
                let messageSenderNameContainer = document.createElement("div");
                messageSenderNameContainer.setAttribute("class", "messageSenderNameContainer");
                let messageSenderEmailAddressInput = document.createElement("input");
                messageSenderEmailAddressInput.setAttribute("type", "text");
                messageSenderEmailAddressInput.readOnly = true;
                messageSenderEmailAddressInput.setAttribute("value", emailAddress);
                messageSenderNameContainer.appendChild(messageSenderEmailAddressInput);
                messageRootDiv.appendChild(messageSenderNameContainer);
                messageRootDiv.innerHTML += "<br>"
                messageRootDiv.innerHTML += messageText;
                messageRootDiv.innerHTML += "<div class=\"timeInputContainer\">" + "    <input type=\"text\" value=\"" + currentDateAndTime + "\" readonly>" + "</div>";
                messageLine.appendChild(messageRootDiv);
                let messagesContainerChild = document.getElementById("messagesContainerChild");
                let messagesContainer = document.getElementById("messagesContainer");
                if(messagesContainerChild.innerText === "No prior messages available! 🥺" || messagesContainerChild.innerText === "An error occurred during retrieval of messages, I apologise! 🥺") {
                    messagesContainerChild.innerText = "";
                }
                console.log(messageLine);
                messagesContainerChild.appendChild(messageLine);
                messagesContainer.scrollTo(
                {
                    top: messagesContainerChild.offsetHeight,
                    behavior: "smooth"
                });
                isSendingMessage = false;
                notifyNewMessageInRTDB(emailAddress, timeStamp);
            })
            .catch(error => {
                alert("Sorry, a problem occurred!");
                console.log("Error while sending message!");
                console.log(error);
                isSendingMessage = false;
            })
    }
}

function initiate() {
    //return to index page if user is not logged in
    if(!getCookie("emailAddress")) {
        alert("Sorry, you are not logged in!🥺");
        window.location.href = "../index.html";
        return;
    }
    
    //set button click listeners and get messages
    let sendMessageButton = document.getElementById("sendMessageButton");
    sendMessageButton.addEventListener("click", (event) => {
        sendMessage();
    });

    getMessages(0, 20, () => {
        console.log("FIRST 20 MESSAGES GOTTEN!😊");
    });
    
    //getting all messages and older messages
    let getOderMessagesButton = document.getElementById("getOderMessagesButton");
    let getAllOlderMessagesButton = document.getElementById("getAllOlderMessagesButton");
    
    getOderMessagesButton.addEventListener("click", (event) => {
        getMessages(lastDownloadedMessageIndex + 1, 20, () => {
            console.log("All older messages downloaded successfully!");
        });
    });
    
    getAllOlderMessagesButton.addEventListener("click", (event) => {
        getMessages(lastDownloadedMessageIndex + 1, NaN, () => {
            console.log("All oler messages downloaded successfully!");
        })
    });
}

initiate();

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

/**
* @param {string} messageSender
* @param {number} messageTimeStamp
*/
function notifyNewMessageInRTDB(messageSender, messageTimeStamp) {
    const messageNotificationRef = push(rtdbRef(rtdb, "messages"));
    set(messageNotificationRef, messageSender + ANVILLE_DELIMITER + messageTimeStamp)
}

function listenForNewMessages() {
    onChildAdded(rtdbRef(rtdb, "messages"), data => {
        let messageName = data.val();
        //DO NOT DOWNLOAD IF MESSAGE NOTIFICAATION IS FROM SELF
        if(messageName.indexOf(getCookie("emailAddress")) < 0) {
            //return if message is already available, a bug on the phone lead to 3x addition
            if(listenedMessageNames[messageName]) {
                return;
            }
            listenedMessageNames[messageName] = "anville el grande";
            getMessage(messageName, deleteNotificationAfterThreeSeconds(data.key));
        } else {
            deleteNotificationAfterThreeSeconds(data.key);
        }
    })
}

/**
* @param {string} messageName
*/
function deleteNotificationAfterThreeSeconds(messageName) {
    setTimeout(() => {
        remove(rtdbRef(rtdb, "messages/" + messageName)).then(() => {
            console.log("RTDB message notification deleted");
        }).catch(error => {
            console.log("Error whilst deleting RTDB message notification...");
            console.log(error);
        });
    }, 3000);
}
