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

var buttonTryAndroidCalc = document.getElementById("androidCalcTrial");
buttonTryAndroidCalc.onclick = () => {
	window.open("bin/calc.apk");
}

var buttonViewAndroidCalcFiles = document.getElementById("androidCalcFiles");
buttonViewAndroidCalcFiles.onclick = () => {
	window.location.href = "https://github.com/anville95/-Android-Scientific-Calculator-Neon-";
}

var buttonTryCliCalc = document.getElementById("cliCalcTrial");
buttonTryCliCalc.onclick = () => {
	window.open("zip/calc.zip")
}

var buttonViewCliCalcFiles = document.getElementById("cliCalcFiles");
buttonViewCliCalcFiles.onclick = () => {
	window.location.href = "https://github.com/anville95/CLI-Scientific-Calculator";
}
