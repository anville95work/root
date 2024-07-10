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

const ANVILLE_DELIMITER = "<--anville95-->";

/**
* @param {array} references
* @param {string} keyword
*/
function matchReferenceName(references, keyword) {
    let matchingReferences = { length: 0 };
    for(let i = 0; i < references.length; i++) {
        if(references[i].name.indexOf(keyword) >= 0) {
            matchingReferences[matchingReferences.length] = references[i];
            matchingReferences.length += 1;
        }
    }
    return matchingReferences;
}

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
* @param {reference} itemReference
* @param {function} callBackFunction
*/
function getItem(itemReference, callBackFunction) {
    getStringFromStorageDB(itemReference.path, text => {
        callBackFunction(text);
    })
}


function getFolderAsItem(folderRef, callBackFunction) {
    /*
    folderItem
        |
        |[index]: [key]<--anville95-->[value]
    */
    let folderItem = { length: 0 };
    
    listAll(folderRef).then(response => {
        if(response.items.length === 0) {
            console.log("No items in this folder!");
            return folderItem;
        } else {
            getItems(response.items, 0, NaN, (itemRef, text) => {
                if(text.indexOf("imageResponse") >= 0) {
                    folderItem[folderItem.length] = text;
                } else {
                    folderItem[folderItem.length] = itemRef.name + ANVILLE_DELIMITER + text;
                }
                folderItem.length += 1;
            }, () => {
                console.log("Folder download complete!");
                callBackFunction(folderItem);
            });
        }
    }).catch(error => {
        console.log("error getting the folder");
        console.log(error);
        callBackFunction(error);
    })
}

function getFoldersAsItems(folderReferences, index, stopIndex, folderItemListener, callBackFunction) {
    getFolderAsItem(folderReferences[index], folderItem => {
        if(!folderItem["length"]) {
            //then this is an error
            console.log("Error getting folder item...");
            console.log(error);
        } else {
            folderItemListener(folderItem);
        }
        
        if(index === stopIndex || index === folderReferences.length - 1) {
            console.log("All folder items downloaded successfully!");
            if(callBackFunction) {
                callBackFunction();
            }
        } else {
            getFoldersAsItems(folderReferences, index + 1, stopIndex, folderItemListener, callBackFunction);
        }
    })
}

function getItems(items, index, stopIndex, itemChunkListener, callBackFunction) {
    console.log(items[index]);
    //check itemname, if it is a picture, getDownloadURL if it is a string getStringFromDBStorage is it is extension skip
    if((items[index].name.indexOf("Picture") >= 0 || items[index].name.indexOf("Pic") >= 0 || items[index].name.indexOf("picture") >= 0) && items[index].name.indexOf("Extension") < 0) {
        getDownloadURL(items[index]).then(url => {
            console.log("ImageItem retrieved -> " + items[index].name + ": " + url);
            itemChunkListener(items[index], items[index].name + ANVILLE_DELIMITER + url + "imageResponse");

            if(index === stopIndex || index === items.length - 1) {
                if(callBackFunction) {
                    callBackFunction();
                }
            } else {
                getItems(items, index + 1, stopIndex, itemChunkListener, callBackFunction);
            }
        })
    } else if(items[index].name.indexOf("Extension") > 0) {
        if(index === stopIndex || index === items.length - 1) {
            if(callBackFunction) {
                callBackFunction();
            }
        } else {
            getItems(items, index + 1, stopIndex, itemChunkListener, callBackFunction);
        }
    } else {
        getStringFromStorageDB(items[index].fullPath, text => {
            itemChunkListener(items[index], text);
            
            console.log("Item retrieved -> " + items[index].name + ": " + text);

            if(index === stopIndex || index === items.length - 1) {
                if(callBackFunction) {
                    callBackFunction();
                }
            } else {
                getItems(items, index + 1, stopIndex, itemChunkListener, callBackFunction);
            }
        });
    }
}


/*
<i class="executedCommand">executed command</i>
<i class="grandTitle">Grand Title</i>
<div class="historyElement">
    <i class="title">title</i>
    <i class="textResponse">key: value</i>
    <i class="imageResponse">picture: <span>imageName</span></i>
</div>
*/


//COMMENTS
function getRandomComments(projectName, amount) {
    console.log("PARAMS: " + projectName + ", " + amount);
    var randomComments = "<div class=\"historyElement\">\n";
    
    listAll(ref(storage, "comments/" + projectName)).then(response => {
        console.log(response);
        if(response.items.length === 0) {
            randomComments += "<i class=\"title\"> No comments for " + projectName + " project</i>\n";
            randomComments += "</div>\n";
            appendCommandHistory(randomComments);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">comments available. getting...</i>");
            getItems(response.items, 0, amount - 1, (commentRef, commentText) => {
                randomComments += "<i class=\"textResponse\">" + commentRef.name + ": " + commentText + "</i>";
            }, () => {
                randomComments += "</div>\n";
                appendCommandHistory(randomComments);
            })
        }
    })
}

function getAllComments(projectName) {
    console.log("PARAMS: " + projectName);
    var randomComments = "<div class=\"historyElement\">\n";
    
    listAll(ref(storage, "comments/" + projectName)).then(response => {
        console.log(response);
        if(response.items.length === 0) {
            randomComments += "<i class=\"title\"> No comments for [" + projectName + "] project</i>\n";
            randomComments += "</div>\n";
            appendCommandHistory(randomComments);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">comments available. getting...</i>");
            getItems(response.items, 0, NaN - 1, (commentRef, commentText) => {
                randomComments += "<i class=\"textResponse\">" + commentRef.name + ": " + commentText + "</i>";
            }, () => {
                randomComments += "</div>\n";
                appendCommandHistory(randomComments);
            })
        }
    })
}

function searchCommentsByEmailAddress(projectName, emailAddress) {
    let searchResult = "<div class=\"historyElement\">";
    listAll(ref(storage, "comments/" + projectName)).then(response => {
        let matchingComments = matchReferenceName(response.items, emailAddress);
        if(matchingComments.length === 0) {
            searchResult += "<i class=\"title\"> No matching comments for " + projectName + " project and email address; " + emailAddress + "</i>\n";
            searchResult += "</div>\n";
            appendCommandHistory(searchResult);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">matching comments available. getting...</i>");
            getItems(matchingComments, 0, NaN, (commentRef, commentText) => {
                searchResult += "<i class=\"textResponse\">" + commentRef.name + ": " + commentText + "</i>";
            }, () => {
                searchResult += "</div>\n";
                appendCommandHistory(searchResult);
            })
        }
    })
}

function searchCommentsByKeyWords(projectName, keywords/*array of keywords*/) {
    var searchResult = "<div class=\"historyElement\">\n";
    
    listAll(ref(storage, "comments/" + projectName)).then(response => {
        if(response.items.length === 0) {
            searchResult += "<i class=\"title\"> No comments for " + projectName + " project yet</i>\n";
            searchResult += "</div>\n";
            appendCommandHistory(searchResult);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">comments available. searching for comments of " + projectName + " project with the keywords " + keywords.toString() + "</i>");
            getItems(response.items, 0, NaN, (commentRef, commentText) => {
                for(let i = 0; i < keywords.length; i++) {
                    if(commentText.indexOf(keywords[i]) >= 0) {
                        searchResult += "<i class=\"textResponse\">" + commentRef.name + ": " + commentText + "</i>";
                        break;
                    }
                }
            }, () => {
                if(searchResult === "<div class=\"historyElement\">\n") {
                    searchResult += "<i class=\"title\"> No comments for " + projectName + " project  matching keywords " + keywords.toString() + "</i>\n";
                }
                searchResult += "</div>\n";
                appendCommandHistory(searchResult);
            })
        }
    })
}

//USERS
function getAllUsers() {
    appendCommandHistory("<i class=\"executedCommand\">Getting all users...</i>");
    listAll(ref(storage, "users")).then(response => {
        //get folders as items
        /*getFoldersAsItems(folderReferences, index + 1, stopIndex, folderItemListener, callBackFunction)*/
        getFoldersAsItems(response.prefixes, 0, NaN - 1, userDataArray => {
            console.log("userDataArray...");
            console.log(userDataArray);
            let userItem = document.createElement("div");
            userItem.setAttribute("class", "historyElement");
            console.log(userItem)
            
            for(let i = 0; i < userDataArray.length; i++) {
                if(userDataArray[i].indexOf("imageResponse") >= 0) {
                    //userDataArray[i] = [name]<--anville95-->[url]imageResponse
                    userDataArray[i] = userDataArray[i].substring(0, userDataArray[i].indexOf("imageResponse"));
                    //it is picture data, add it as it is
                    /*<i class="imageResponse">picture: <span>imageName</span></i>*/
                    let dataItem = document.createElement("i");
                    dataItem.setAttribute("class", "imageResponse");
                    let imageName = document.createElement("span");
                    let imageNameText = userDataArray[i].substring(0, userDataArray[i].indexOf(ANVILLE_DELIMITER));
                    imageName.innerText = imageNameText;
                    dataItem.appendChild(imageName);
                    imageName.innerText += ": ";
                    let imageLink = document.createElement("span");
                    let url = userDataArray[i].substring(userDataArray[i].indexOf(ANVILLE_DELIMITER) + 15);
                    imageLink.setAttribute("url", url);
                    imageLink.setAttribute("name", imageNameText);
                    imageLink.setAttribute("class", "imageLink");
                    imageLink.onclick = (event) => {
                        displayGraphicInfo(event);
                    }
                    imageLink.innerText = "link";
                    dataItem.appendChild(imageLink);
                    userItem.appendChild(dataItem);
                } else {
                    let dataItem = document.createElement("i");
                    dataItem.setAttribute("class", "textResponse");
                    dataItem.innerText = userDataArray[i].substring(0, userDataArray[i].indexOf(ANVILLE_DELIMITER)) + ": " + userDataArray[i].substring(userDataArray[i].indexOf(ANVILLE_DELIMITER) + 15);
                    userItem.appendChild(dataItem);
                }
            }
            console.log(userItem);
            
            appendCommandHistoryWithElement(userItem);
        }, () => {
            console.log("All users downloaded successfully!");
        })
    })
}

function getRandomUsers(amount) {
    appendCommandHistory("<i class=\"executedCommand\">Getting " + amount + " users...</i>");
    listAll(ref(storage, "users")).then(response => {
        //get folders as items
        /*getFoldersAsItems(folderReferences, index + 1, stopIndex, folderItemListener, callBackFunction)*/
        getFoldersAsItems(response.prefixes, 0, amount - 1, userDataArray => {
            console.log("userDataArray...");
            console.log(userDataArray);
            let userItem = document.createElement("div");
            userItem.setAttribute("class", "historyElement");
            console.log(userItem)
            
            for(let i = 0; i < userDataArray.length; i++) {
                if(userDataArray[i].indexOf("imageResponse") >= 0) {
                    //userDataArray[i] = [name]<--anville95-->[url]imageResponse
                    userDataArray[i] = userDataArray[i].substring(0, userDataArray[i].indexOf("imageResponse"));
                    //it is picture data, add it as it is
                    /*<i class="imageResponse">picture: <span>imageName</span></i>*/
                    let dataItem = document.createElement("i");
                    dataItem.setAttribute("class", "imageResponse");
                    let imageName = document.createElement("span");
                    let imageNameText = userDataArray[i].substring(0, userDataArray[i].indexOf(ANVILLE_DELIMITER));
                    imageName.innerText = imageNameText;
                    dataItem.appendChild(imageName);
                    imageName.innerText += ": ";
                    let imageLink = document.createElement("span");
                    let url = userDataArray[i].substring(userDataArray[i].indexOf(ANVILLE_DELIMITER) + 15);
                    imageLink.setAttribute("url", url);
                    imageLink.setAttribute("name", imageNameText);
                    imageLink.setAttribute("class", "imageLink");
                    imageLink.onclick = (event) => {
                        displayGraphicInfo(event);
                    }
                    imageLink.innerText = "link";
                    dataItem.appendChild(imageLink);
                    userItem.appendChild(dataItem);
                } else {
                    let dataItem = document.createElement("i");
                    dataItem.setAttribute("class", "textResponse");
                    dataItem.innerText = userDataArray[i].substring(0, userDataArray[i].indexOf(ANVILLE_DELIMITER)) + ": " + userDataArray[i].substring(userDataArray[i].indexOf(ANVILLE_DELIMITER) + 15);
                    userItem.appendChild(dataItem);
                }
            }
            console.log(userItem);
            
            appendCommandHistoryWithElement(userItem);
        }, () => {
            console.log("All users downloaded successfully!");
        })
    })
}

function searchUserByUsername(username) {
    listAll(ref(storage, "users")).then(response => {
        matchUsersByUsernames(response.prefixes, 0, username, userDataArray => {
            let userItem = "<div class=\"historyElement\">\n";
            
            for(let i = 0; i < userDataArray.length; i++) {
                userItem += "<i class=\"textResponse\">" + userDataArray[i].substring(0, userDataArray[i].indexOf(ANVILLE_DELIMITER)) + ": " + userDataArray[i].substring(userDataArray[i].indexOf(ANVILLE_DELIMITER) + 15) + "</i>";
            }
            
            userItem += "</div>";
            appendCommandHistory(userItem);
        }, () => {
            console.log("All matching users downloaded!");
        })
    })
}

function matchUsersByUsernames(userReferences, index, username, userMatchListener, callBackFunction) {
    getStringFromStorageDB(userReferences[index].fullPath + "/username", downloadedUsername => {
        if(username.indexOf(downloadedUsername) >= 0 || downloadedUsername.indexOf(username) >= 0) {
            getFolderAsItem(userReferences[index], userItem => {
                userMatchListener(userItem);
                
                if(index === userReferences.length - 1) {
                    if(callBackFunction) {
                        callBackFunction();
                    }
                } else {
                    matchUsersByUsernames(userReferences, index + 1, username, userMatchListener, callBackFunction);
                }
            })
        } else if(index === userReferences.length - 1) {
            if(callBackFunction) {
                callBackFunction();
            }
        } else {
            matchUsersByUsernames(userReferences, index + 1, username, userMatchListener, callBackFunction);
        }
    })
}

//MESSAGES
function getAllMessages() {
    let allMessages = "<div class=\"historyElement\">\n";
    listAll(ref(storage, "messages")).then(response => {
        if(response.items.length === 0) {
            allMessages += "<i class=\"title\"> No messages available yet!</i>\n";
            allMessages += "</div>\n";
            appendCommandHistory(allMessages);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">messages available. getting all...</i>");
            getItems(response.items, 0, NaN, (messageRef, messageText) => {
                allMessages += "<i class=\"textResponse\">" + messageRef.name + ": " + messageText + "</i>";
            }, () => {
                allMessages += "</div>";
                appendCommandHistory(allMessages);
            })
        }
    })
}

function getRandomMessages(amount) {
    let allMessages = "<div class=\"historyElement\">\n";
    listAll(ref(storage, "messages")).then(response => {
        if(response.items.length === 0) {
            allMessages += "<i class=\"title\"> No messages available yet!</i>\n";
            allMessages += "</div>\n";
            appendCommandHistory(allMessages);
        } else {
            appendCommandHistory("<i class=\"executedCommand\">messages available. getting " + amount + "...</i>");
            getItems(response.items, 0, amount - 1, (messageRef, messageText) => {
                allMessages += "<i class=\"textResponse\">" + messageRef.name + ": " + messageText + "</i>";
            }, () => {
                allMessages += "</div>";
                appendCommandHistory(allMessages);
            })
        }
    })
}

function searchMessagesByEmailAddress(emailAddress) {
    let searchResult = "<div class=\"historyElement\">\n";
    listAll(ref(storage, "messages")).then(response => {
        if(response.items.length === 0) {
            searchResult += "<i class=\"title\"> No messages available yet!</i>\n";
            searchResult += "</div>\n";
            appendCommandHistory(searchResult);
        } else {
            let matchingMessagesRefs = matchReferenceName(response.items, emailAddress);
            if(matchingMessagesRefs.length === 0) {
                searchResult += "<i class=\"title\"> No messages matching emailAddress; " + emailAddress + " found!</i>\n";
                searchResult += "</div>\n";
                appendCommandHistory(searchResult);
            } else {
                appendCommandHistory("<i class=\"executedCommand\">matching messages available for " + emailAddress + ", getting...</i>");
                getItems(matchingMessagesRefs, 0, NaN, (messageRef, messageText) => {
                    searchResult += "<i class=\"textResponse\">" + messageRef.name + ": " + messageText + "</i>";
                }, () => {
                    if(searchResult === "<div class=\"historyElement\">\n") {
                        searchResult += "<i class=\"title\"> No messages matching emailAddress; " + emailAddress + " were found!</i>\n";
                    }
                    searchResult += "</div>";
                    appendCommandHistory(searchResult);
                })
            }
        }
    })
}

function searchMessagesByKeywords(keywordsArray) {
    let searchResult = "<div class=\"historyElement\">\n";
    listAll(ref(storage, "messages")).then(response => {
        if(response.items.length === 0) {
            searchResult += "<i class=\"title\"> No messages available yet!</i>\n";
            searchResult += "</div>";
            commandsHistoryScrollable += searchResult;
        } else {
            appendCommandHistory("<i class=\"executedCommand\">messages available. searching for keywords " + keywordsArray.toString() + "...</i>");
            getItems(response.items, 0, NaN, (messageRef, messageText) => {
                for(let i = 0; i < keywordsArray.length; i++) {
                    if(messageText.indexOf(keywordsArray[i]) >= 0) {
                        searchResult += "<i class=\"textResponse\">" + messageRef.name + ": " + messageText + "</i>";
                        break;
                    }
                }
            }, () => {
                    if(searchResult === "<div class=\"historyElement\">\n") {
                        searchResult += "<i class=\"title\"> No messages matching keywords " + keywordsArray.toString() + " were found!</i>\n";
                    }
                searchResult += "</div>";
                appendCommandHistory(searchResult);
            })
        }
    })
}

function initiate() {
    let commandInput = document.getElementById("commandInput");
    document.addEventListener("keyup", event => {
        if(event.key === "Enter") {
            //get the command and execute
            /*
            COMMANDS LIST
            ^^^^^^^^^^^^^
            help
            get-comments [projectName] [amount]
            get-all-comments
            search-comments-by-email [projectName] [emailAddress]
            search-comments-by-keywords [projectName] [keyword1] [keyword2] [keyword3] \e.t.c/
            
            get-messages [amount]
            get-all-messages
            search-messages-by-email [emailAddress]
            search-messages-by-keywords [keyword1] [keyword2] [keyword3] \e.t.c/
            
            get-users [amount]
            get-all-users
            search-users-by-username [username]
            */
            
            let commandText = commandInput.value;
            commandInput.value = "";
            if(commandText.trim()) {
                //push the command to the command history
                appendCommandHistory("<i class=\"executedCommand\">" + commandText + "</i>");
                //remove the \n character added to the commandText
                commandText = commandText.substring(0, commandText.length - 1);
                if(commandText === "help") {
                    let helpText = "<i class=\"grandTitle\">Usage Instructions</i>";
                    helpText += "<div class=\"historyElement\">";
                    helpText += "<i class=\"title\">COMMANDS LIST</i>";
                    helpText += "<i class=\"textResponse\">help: lists commands and their purposes</i>";
                    helpText += "<i class=\"textResponse\">get-comments [projectName] [amount]</i>";
                    helpText += "<i class=\"textResponse\">get-all-comments</i>";
                    helpText += "<i class=\"textResponse\">search-comments-by-email [projectName] [emailAddress]</i>";
                    helpText += "<i class=\"textResponse\">search-comments-by-keywords [projectName] [keyword1] [keyword2] [keyword3] \\e.t.c/</i>";
                    
                    helpText += "<i class=\"textResponse\">get-messages [amount]</i>";
                    helpText += "<i class=\"textResponse\">get-all-messages</i>";
                    helpText += "<i class=\"textResponse\">search-messages-by-email [emailAddress]</i>";
                    helpText += "<i class=\"textResponse\">search-messages-by-keywords [keyword1] [keyword2] [keyword3] \\e.t.c/</i>";
                    
                    helpText += "<i class=\"textResponse\">get-users [amount]</i>";
                    helpText += "<i class=\"textResponse\">get-all-users</i>";
                    helpText += "<i class=\"textResponse\">search-users-by-username [username]</i></div>";
                    appendCommandHistory(helpText);
                } else {
                    //extract the command's individual words
                    let commandWordsArray = commandText.split(";");
                    //commandWordsArray = [[command], [parameter1], [parameter2] \e.t.c/]
                    switch(commandWordsArray[0]) {
                        case "get-comments":
                            getRandomComments(commandWordsArray[1], Number(commandWordsArray[2]));
                            break;
                        case "get-all-comments":
                            getAllComments(commandWordsArray[1]);
                            break;
                        case "search-comments-by-email":
                            searchCommentsByEmailAddress(commandWordsArray[1], commandWordsArray[2])
                            break;
                        case "search-comments-by-keywords":
                            let keywords = {
                                length: 0,
                                toString: () => {
                                    let value = "[";
                                    for(let i = 0; i < keywords.length; i++) {
                                        if(i !== 0) {
                                            value += ", ";
                                        }
                                        value += keywords[i]
                                    }
                                    return value + "]";
                                }
                            };
                            for(let i = 2; i < commandWordsArray.length; i++) {
                                keywords[i - 2] = commandWordsArray[i];
                                keywords.length += 1;
                            }
                            searchCommentsByKeyWords(commandWordsArray[1], keywords);
                            break;
                        case "get-messages":
                            getRandomMessages(Number(commandWordsArray[1]));
                            break;
                        case "get-all-messages":
                            getAllMessages();
                            break;
                        case "search-messages-by-email":
                            searchMessagesByEmailAddress(commandWordsArray[1], commandWordsArray[2]);
                            break;
                        case "search-messages-by-keywords":
                            let keywordsArray = {
                                length: 0,
                                toString: () => {
                                    let value = "[";
                                    for(let i = 0; i < keywordsArray.length; i++) {
                                        if(i !== 0) {
                                            value += ", ";
                                        }
                                        value += keywordsArray[i]
                                    }
                                    return value + "]";
                                }
                            };
                            for(let i = 1; i < commandWordsArray.length; i++) {
                                keywordsArray[i - 1] = commandWordsArray[i];
                                keywordsArray.length += 1;
                            }
                            searchMessagesByKeywords(keywordsArray);
                            break;
                        case "get-users":
                            getRandomUsers(Number(commandWordsArray[1]));
                            break;
                        case "get-all-users":
                            getAllUsers();
                            break;
                        case "search-users-by-username":
                            searchUserByUsername(commandWordsArray[1]);
                            break;
                        default:
                            appendCommandHistory("<i class=\"title\">'" + commandWordsArray[0] + "' is unknown command or syntax</i>");
                            break;
                    }
                }
            } else {
                console.log("Command empty");
            }
        }
    });
    
    let commandsHistory = document.getElementById("commandsHistory");
    commandsHistory.addEventListener("click", () => {
        commandInput.focus();
    });
    
    let backgroundTint = document.getElementById("backgroundTint");
    backgroundTint.addEventListener("click", event => {
        //hide the graphicViewerDiv
        let graphicViewerDiv = document.getElementById("graphicViewerDiv");
        graphicViewerDiv.style.display = "none";
        backgroundTint.style.display = "none";
        commandInput.focus();
    })
    
    let emailAddress = getCookie("emailAddress");
    let password = getCookie("password");
    signInWithEmailAndPassword(auth, emailAddress, password).then( userCredentials => {
        if(userCredentials.user.uid !== "3MU1wIM3v3YyDbDkC1YuGT7soYz2") {
            alert("Ha! you're not the admin😂. Back to index you go!😂");
            window.location.href = "../../../../../../../index.html";
            return;
        }
    }).catch(error => {
        if(userCredentials.user.uid !== "3MU1wIM3v3YyDbDkC1YuGT7soYz2") {
            alert("Ha! you're logged in😂. Back to index you go!😂");
            window.location.href = "../../../../../../../index.html";
            return;
        }
    })
    
    commandInput.focus();
}

function appendCommandHistory(elementString) {
    let commandsHistoryScrollable = document.getElementById("commandsHistoryScrollable");
    commandsHistoryScrollable.innerHTML += elementString;
    let commandsHistory = document.getElementById("commandsHistory");
    commandsHistory.scroll({
        top: commandsHistoryScrollable.offsetHeight,
        behavior: "smooth"
    })
}

function appendCommandHistoryWithElement(element) {
    let commandsHistoryScrollable = document.getElementById("commandsHistoryScrollable");
    commandsHistoryScrollable.appendChild(element);
    let commandsHistory = document.getElementById("commandsHistory");
    commandsHistory.scroll({
        top: commandsHistoryScrollable.offsetHeight,
        behavior: "smooth"
    })
}

function displayGraphicInfo(event) {
    let graphicViewerDiv = document.getElementById("graphicViewerDiv");
    let graphicURL = event.target.getAttribute("url");
    let graphicName = event.target.getAttribute("name");
    graphicViewerDiv.style.backgroundImage = "url(\"" + graphicURL + "\")";
    graphicViewerDiv.children[0].value = graphicName;
    graphicViewerDiv.style.display = "table";
    let backgroundTint = document.getElementById("backgroundTint");
    backgroundTint.style.display = "table";
    console.log(graphicViewerDiv);
}

initiate();
