//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if(height / width > 1 && window.location.href.indexOf("phone-index") === -1){
	window.location.replace("phone-index.html");
}
var buttonEmailMe = document.getElementById("emailMe");
buttonEmailMe.onclick = () => {
	window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=anville095@gmail.com";
}

var buttonCallMe = document.getElementById("callMe");
buttonCallMe.onclick = () => {
	window.open("tel:+254743437015");
}

var buttonKnowMeMore = document.getElementById("knowMeMore");
buttonKnowMeMore.onclick = () => {
	alert("Sorry, I'm still working on my bio!");
}

var buttonTryWebCalc = document.getElementById("webCalcTrial");
buttonTryWebCalc.onclick = () => {
	window.location = "web-calc/index.html";
}

var buttonViewWebCalcFiles = document.getElementById("webCalcFiles");
buttonViewWebCalcFiles.onclick = () => {
	window.location.href = "https://github.com/anville95/Web-Scientific-Calculator";
}

var buttonTryAndroidCalc = document.getElementById("androidCalcTrial");
buttonTryAndroidCalc.onclick = () => {
	window.open("bin/calc.apk");
}

var buttonViewAndroidCalcFiles = document.getElementById("androidCalcFiles");
buttonViewAndroidCalcFiles.onclick = () => {
	window.location.href = "https://github.com/anville95/Android-Calculator";
}

var buttonTryCliCalc = document.getElementById("cliCalcTrial");
buttonTryCliCalc.onclick = () => {
	window.open("zip/calc.zip")
}

var buttonViewCliCalcFiles = document.getElementById("cliCalcFiles");
buttonViewCliCalcFiles.onclick = () => {
	window.location.href = "https://github.com/anville95/CLI-Scientific-Calculator";
}
