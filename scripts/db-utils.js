//DATA_BASE STRUCTURE
/*
//ALL IMAGES MUST BE IN THE FORM, [imageName], [imageName]Extension

+users
|
|
+--[userId]
  |
  |
  +--username:[user's name]
  +--profilePictureExtension:[.extension] //Helps with mime type during loading
  +-- profilePicture:[profilePicture file]
+messages
|
|
+--[user's email address]:[message]
+comments
|
|
+--[project name]
  |
  |
  +--[user's email address]:[comment_message]

*/
const DIRECTION_FIRST_TO_LAST = 0,
    DIRECTION_LAST_TO_FIRST = 1;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateEmail } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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
            //start from offset going forward
            getSingleStringStreamChunkFromStorageDB(direction, response.items, startIndex, startIndex + amount - 1, stringChunkListener, callBackFunction);
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
* @param {string} callBackFunction
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
