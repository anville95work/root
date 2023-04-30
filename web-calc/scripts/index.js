//Get the window dimensions
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//Redirect to mobile layout page if The aspect ratio is that of a mobile
if(height / width > 1 && window.location.href.indexOf("phone-index") === -1){
	window.location.replace("html/phone-index.html");
}
//The constants
const PI = 3.141592653589793;
const e = 2.718281828459045;
//The funcions for the operations
function add(firstNum, secondNum){
	verifyInputsAreNum(firstNum, secondNum);
	return firstNum + secondNum;
}

function multiply(firstNum, secondNum){
	verifyInputsAreNum(firstNum, secondNum);
	return firstNum * secondNum;
}

function subtract(firstNum, secondNum){
	verifyInputsAreNum(firstNum, secondNum);
	return firstNum - secondNum;
}

function divide(firstNum, secondNum){
	verifyInputsAreNum(firstNum, secondNum);
	return firstNum / secondNum;
}

function log(num){
	verifyInputIsNum(num);
	return (Math.log(num) / Math.log(10));
}

function ln(num){
	verifyInputIsNum(num);
	return Math.log(num);
}

function sin(num){
	if(data.isInRads){
		//special cases
		if(num % (2 * PI) === PI / 2){
			return 1;
		} else if(num % (2 * PI) === (PI * 3) / 2){
			return -1;
		} else if(num % (2 * PI) === 0){
			return 0;
		} else if(num % (2 * PI) === PI){//Please don't mind me duplicating this instead of merging the conditions; I needed to ease the comprehension of the algorithm
			return 0;
		} else if(num % (2 * PI) === PI / 6){
			return 0.5;
		} else if(num % (2 * PI) === (PI * 5) / 6){
			return 0.5;
		} else if(num % (2 * PI) === (PI * 7) / 6){
			return -0.5;
		}
		verifyInputIsNum(num);
		return Math.sin(num);
	} else {
		if(num % 360 === 90){
			return 1;
		} else if(num % 360 === 270){
			return -1;
		} else if(num % 360 === 0){
			return 0;
		} else if(num % 360 === 180){
			return 0;
		} else if(num % 360 === 30){
			return 0.5;
		} else if(num % 360 === 150){
			return 0.5;
		} else if(num % 360 === 210){
			return -0.5;
		}
		verifyInputIsNum(num);
		return Math.sin((num * PI) / 180);
	}
}

function cos(num){
	if(data.isInRads){
		//special cases
		if(num % (2 * PI) === PI / 2){
			return 0;
		} else if(num % (2 * PI) === (PI * 3) / 2){
			return 0;
		} else if(num % (2 * PI) === 0){
			return 1;
		} else if(num % (2 * PI) === PI){
			return -1;
		} else if(num % (2 * PI) === PI / 3){
			return 0.5;
		} else if(num % (2 * PI) === (PI * 2) / 3){
			return -0.5;
		} else if(num % (2 * PI) === (PI * 4) / 3){
			return -0.5;
		}
		verifyInputIsNum(num);
		return Math.cos(num);
	} else {
		//special cases
		if(num % 360 === 90){
			return 0;
		} else if(num % 360 === 270){
			return 0;
		} else if(num % 360 === 0){
			return 1;
		} else if(num % 360 === 180){
			return -1;
		} else if(num % 360 === 60){
			return 0.5;
		} else if(num % 360 === 120){
			return -0.5;
		} else if(num % 360 === 240){
			return -0.5;
		}
		verifyInputIsNum(num);
		return Math.cos((num * PI) / 180);
	}
}

function tan(num){
	if(data.isInRads){
		//special cases
		if(num % (2 * PI) === PI / 2){
			return Number.POSITIVE_INFINITY;
		} else if(num % (2 * PI) === (PI * 3) / 2){
			return Number.NEGATIVE_INFINITY;
		} else if(num % (2 * PI) === 0){
			return 0;
		} else if(num % (2 * PI) === (PI / 4)){
			return 1;
		} else if(num % (2 * PI) === (PI * 3) / 4){
			return -1;
		} else if(num % (2 * PI) === (PI * 5) / 4){
			return -1;
		}
		verifyInputIsNum(num);
		return Math.tan(num);
	} else{
		//special cases
		if(num % 360 === 90){
			return Number.POSITIVE_INFINITY;
		} else if(num % 360 === 270){
			return Number.NEGATIVE_INFINITY;
		} else if(num % 360 === 0){
			return 0;
		} else if(num % 360 === 45){
			return 1;
		} else if(num % 360 === 135){
			return -1;
		} else if(num % 360 === 225){
			return -1;
		}
		verifyInputIsNum(num);
		return Math.tan((num * PI) / 180);
	}
}

function asin(num){
	verifyInputIsNum(num);
	if(data.isInRads){
		//special cases
		if(num == 1){
			return PI / 2;
		} else if(num === 0){
			return 0;
		}
		return Math.asin(num);
	} else {
		//special cases
		if(num == 1){
			return 90;
		} else if(num === 0){
			return 0;
		}
		return (Math.asin(num) * 180) / PI;
	}
}

function acos(num){
	verifyInputIsNum(num);
	if(data.isInRads){
		//special cases
		if(num === 0){
			return PI / 2;
		} else if(num === 1){
			return 0;
		}
		return Math.acos(num);
	} else {
		//special cases
		if(num === 0){
			return 90;
		} else if(num === 1){
			return 0;
		}
		return (Math.acos(num) * 180) / PI;
	}
}

function atan(num){
	verifyInputIsNum(num);
	if(data.isInRads){
		//special cases
		if(num === Number.POSITIVE_INFINITY){
			return PI / 2;
		} else if(num === Number.NEGATIVE_INFINITY){
			return -1 * (PI / 2);
		} else if(num === 0){
			return 0;
		}
		return Math.atan(num);
	} else {
		//special cases
		if(num === Number.POSITIVE_INFINITY){
			return 90;
		} else if(num === Number.NEGATIVE_INFINITY){
			return -90;
		} else if(num === 0){
			return 0;
		}
		return (Math.atan(num) * 180) / PI;
	}
}

function power(firstNum, secondNum){
	verifyInputsAreNum(firstNum, secondNum);
	return Math.pow(firstNum, secondNum);
}

function factorial(num){
	if(num === 0){
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}

function verifyInputsAreNum(firstNum, secondNum){
	if(typeof firstNum !== "number" || typeof secondNum !== "number"){
		throw new Error("arguments for numerical operations must be numbers");
	}
}

function verifyInputIsNum(num){
	if(typeof num !== "number"){
		throw new Error("Input must be a number");
	}
}

function isNumber(num){
	if(typeof num === "number"){
		return true;
	} else {
		return false;
	}
}

function simplify(expressionArray){
	//trigonomeric ratios
	//===================
	//sine
	while(expressionArray.indexOf("sin") > -1){
		var position = expressionArray.indexOf("sin");
		expressionArray[position] = sin(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//cos
	while(expressionArray.indexOf("cos") > -1){
		var position = expressionArray.indexOf("cos");
		expressionArray[position] = cos(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//tan
	while(expressionArray.indexOf("tan") > -1){
		var position = expressionArray.indexOf("tan");
		expressionArray[position] = tan(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//sin^-1
	while(expressionArray.indexOf("sin^-1") > -1){
		var position = expressionArray.indexOf("sin^-1");
		expressionArray[position] = sin(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//cos^-1
	while(expressionArray.indexOf("cos^-1") > -1){
		var position = expressionArray.indexOf("cos^-1");
		expressionArray[position] = acos(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//tan^-1
	while(expressionArray.indexOf("tan^-1") > -1){
		var position = expressionArray.indexOf("tan^-1");
		expressionArray[position] = atan(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//Logarithms
	//==========
	//ln
	while(expressionArray.indexOf("ln") > -1){
		var position = expressionArray.indexOf("ln");
		expressionArray[position] = ln(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//log
	while(expressionArray.indexOf("log") > -1){
		var position = expressionArray.indexOf("log");
		expressionArray[position] = log(expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//e^x
	while(expressionArray.indexOf("e^") > -1){
		var position = expressionArray.indexOf("e^");
		expressionArray[position] = power(e, expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//10^x
	while(expressionArray.indexOf("10^") > -1){
		var position = expressionArray.indexOf("10^");
		expressionArray[position] = power(10, expressionArray[position + 1]);
		removeItems(position + 1, 1, expressionArray);
	}
	//power
	while(expressionArray.indexOf("^") > -1){
		var position = expressionArray.indexOf("^");
		expressionArray[position - 1] = power(expressionArray[position - 1], expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//root
	while(expressionArray.indexOf("^1/") > -1){
		var position = expressionArray.indexOf("^1/");
		expressionArray[position - 1] = power(expressionArray[position - 1], 1 / expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//squareroot
	while(expressionArray.indexOf("√") > -1){
		var position = expressionArray.indexOf("√");
		expressionArray[position] = power(expressionArray[position + 1], 0.5);
		removeItems(position + 1, 1, expressionArray);
	}
	//factorial
	while(expressionArray.indexOf("!") > -1){
		var position = expressionArray.indexOf("!");
		expressionArray[position - 1] = factorial(expressionArray[position - 1]);
		removeItems(position, 1, expressionArray);
	}
	//now simple calculations
	//initial implicit multiplications. I decided this after testing '2(3) + 3(2)'
	for(var i = 0; i < expressionArray.length; i++){
		if(isNumber(expressionArray[i]) && isNumber(expressionArray[i + 1])){
			expressionArray[i] *= expressionArray[i + 1];
			//now remove the next element
			removeItems(i + 1, 1, expressionArray);
		}
	}
	//division
	while(expressionArray.indexOf("÷") > -1){
		var position = expressionArray.indexOf("÷");
		expressionArray[position - 1] = divide(expressionArray[position - 1], expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//multiplication
	while(expressionArray.indexOf("x") > -1){
		var position = expressionArray.indexOf("x");
		expressionArray[position - 1] = multiply(expressionArray[position - 1], expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//subtraction
	//subtraction comes before addition. I noticed this after getting 31 from the expression: 9 x 10 - 9 + 10 x 5 instead of 131
	while(expressionArray.indexOf("-") > -1){
		var position = expressionArray.indexOf("-");
		expressionArray[position - 1] = subtract(expressionArray[position - 1], expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//addition
	while(expressionArray.indexOf("+") > -1){
		var position = expressionArray.indexOf("+");
		expressionArray[position - 1] = add(expressionArray[position - 1], expressionArray[position + 1]);
		removeItems(position, 2, expressionArray);
	}
	//multiply implicit products e.g (12)(13)
	if(expressionArray.length > 1){
		var result = 1;
		for(var i = 0; i < expressionArray.length; i++){
			result *= expressionArray[i];
		}
		return result;
	}
	return expressionArray[0];
}

function removeItems(position, amount, expressionArray){
	/*
	*Start at position, replace each element with preceeding up to length - 2
	*Remove element at length - 1
	*Do this for 'amount' times
	*/
	for(var j = amount; j > 0; j--){
		for(var i = position; i < expressionArray.length - 1; i++){
			expressionArray[i] = expressionArray[i + 1];
		}
		expressionArray[expressionArray.length - 1] = undefined;
		expressionArray.length -= 1;
	}
}

function evaluate(){
	//You must reset incase of an error
	try{
		if(data.lastNumber !== "NA" || data.count !== 0){
			//first replace the constants 'e' and 'π' wherever they may be if they are
			while(data.expressionArray.indexOf("e") > -1){
				var position = data.expressionArray.indexOf("e");
				data.expressionArray[position] = e;
			}
			while(data.expressionArray.indexOf("π") > -1){
				var position = data.expressionArray.indexOf("π");
				data.expressionArray[position] = PI;
			}
			//add the lastNumber if it's available
			if(data.lastNumber !== "NA"){
				data.appendElement(Number(data.lastNumber));
				data.count++;
				data.lastNumber = "NA";
			}
			data.expressionArray.length = data.count;
			while(data.expressionArray.indexOf("(") > -1){
				var start = data.expressionArray.lastIndexOf("(");
				var stop = data.expressionArray.indexOf(")", start);
				//if no closing brackets exist, take it as the last
				//MUST DEAL WITH THIS LATER...
				if(stop === -1){ stop = data.expressionArray.length;}
				var subExpressionArray = data.expressionArray.slice(start + 1, stop);
				data.expressionArray[start] = simplify(subExpressionArray);
				removeItems(start + 1, stop - start, data.expressionArray);
			}
			var result = simplify(data.expressionArray);
			if(isNaN(result)){
				alert("Sorry, something's wrong with your expression 😟😟");
				data.reset();
			}
			var resultScreen = document.getElementById("result");
			resultScreen.setAttribute("value", "Result: " + result);
			//reset values but without updating screen
			data.resetWithoutUpdatingScreen();
		}
	} catch(error){
		alert("Sorry, something's wrong with your expression 😟😟");
		data.reset();
	}
}

//and here lies the objects for data
var data = {
	lastNumber:"NA",
	expressionArray : new Array(10),
	count : 0,
	result : 0,
	isShifted : false,
	isInRads : true,
	//Methods for appending data
	appendElement : function(element){
		if(data.count >= data.expressionArray.length){
			var coppiedArray = new Array(data.expressionArray.length * 2);
			for(var i = 0; i < data.count; i++){
				coppiedArray[i] = data.expressionArray[i];
			}
			data.expressionArray = null;
			data.expressionArray = coppiedArray;
		}
		data.expressionArray[data.count] = element;
	},
	removeLastElement : function(){
		data.expressionArray[data.count] = undefined;
		data.count--;
	},
	getLastElement : function(){
		return data.expressionArray[data.count - 1];
	},
	reset : function(){
		data.lastNumber = "NA";
		data.expressionArray = new Array(10);
		data.count = 0;
		updateScreen();
	},
	resetWithoutUpdatingScreen : function(){
		data.lastNumber = "NA";
		data.expressionArray = new Array(10);
		data.count = 0;
	}
};

function addOperator(operator){
		//mustn't be executed if lastNumber is only symbol i.e. '-' or '+'
	if(data.lastNumber !== "+" && data.lastNumber !== "-"){
		if(data.lastNumber !== "NA"){
			data.appendElement(Number(data.lastNumber));
			data.count++;
			data.lastNumber = "NA";
		} else if((operator === "-" || operator === "+") && data.getLastElement() !== ")" && data.getLastElement() !== "π" && data.getLastElement() !== "e" && data.getLastElement() !== "!"){//here, last number might not be available but the terminal element might be a ')', 'PI', 'e' or '!' thus I must prevent this...
			//mustn't add if sign symbol already present
			if(data.lastNumber.indexOf("-") === -1 && data.lastNumber.indexOf("+") === -1){
				data.lastNumber = operator;
				updateScreen();
				return;
			}
		}
		data.appendElement(operator);
		data.count++;
		updateScreen();
	}
}

function appendLastNumber(num){
	if(data.lastNumber === "NA"){
		data.lastNumber = String(num);
	} else {
		data.lastNumber += String(num);
	}
	updateScreen();
}

function deleteLastElementOrNumber(){
	if(data.lastNumber !== "NA"){
		data.lastNumber = data.lastNumber.substring(0, data.lastNumber.length - 1);
		if(data.lastNumber.length === 0){data.lastNumber = "NA";}
	} else {
		var lastElement = data.getLastElement();
		data.removeLastElement();
		if(isNumber(lastElement)){
			data.lastNumber = String(lastElement);
			//now chip off the last character
			data.lastNumber = data.lastNumber.substring(0, data.lastNumber.length - 1);
			if(data.lastNumber.length === 0){data.lastNumber = "NA";}
		} else {
			//check if remaining last element is number so it may be loaded on to last number
			if(isNumber(data.getLastElement())){
				data.lastNumber = String(data.getLastElement());
				data.removeLastElement();
			}
		}
	}
	updateScreen();
}

function clearEverything(){
	data.reset();
	updateScreen();
}

function updateScreen(){
	var screenText = "";
	if(data.count > 0){
		for(var i = 0; i < data.count; i++){
			if(i === 0){
				screenText += "";
			}
			screenText += data.expressionArray[i];
		}
	}
	if(data.lastNumber !== "NA"){
		screenText += data.lastNumber;
	}
	var screen = document.getElementById("screen");
	screen.value = screenText;
	screen.focus();
	screen.setSelectionRange(screenText.length, screenText.length);
}

//Initiate the References to the Buttons
//======================================
var button7 = document.getElementById("7");
var button8 = document.getElementById("8");
var button9 = document.getElementById("9");
var buttonDiv = document.getElementById("÷");
var buttonShift = document.getElementById(">>");
var buttonRAD = document.getElementById("RAD");
var buttonAC = document.getElementById("AC");
var buttonDEL = document.getElementById("DEL");
var button4 = document.getElementById("4");
var button5 = document.getElementById("5");
var button6 = document.getElementById("6");
var button8 = document.getElementById("8");
var buttonX = document.getElementById("x");
var buttonSin = document.getElementById("sin");
var buttonCos = document.getElementById("cos");
var buttonTan = document.getElementById("tan");
var buttonPow = document.getElementById("^");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var buttonMinus = document.getElementById("-");
var buttonLn = document.getElementById("ln");
var buttonLog = document.getElementById("log");
var buttonE = document.getElementById("e");
var buttonFactorial = document.getElementById("!");
var buttonDot = document.getElementById(".");
var button0 = document.getElementById("0");
var buttonEquals = document.getElementById("=");
var buttonPlus = document.getElementById("+");
var buttonOpenBracket = document.getElementById("(");
var buttonCloseBracket = document.getElementById(")");
var buttonPi = document.getElementById("π");
var buttonSquareRoot = document.getElementById("√");
//Listeners for the Buttons
//=========================
button7.onclick = function(){
	appendLastNumber(7);
};
button8.onclick = function(){
	appendLastNumber(8);
};
button9.onclick = function(){
	appendLastNumber(9);
};
buttonDiv.onclick = function(){
	addOperator("÷");
};
buttonShift.onclick = function(){
	if(!data.isShifted){
		//set shifted to true
		data.isShifted = true;
		//set values of buttons to indicate this
		buttonSin.setAttribute("value", "sin^-1");
		buttonCos.setAttribute("value", "cos^-1");
		buttonTan.setAttribute("value", "tan^-1");
		buttonPow.setAttribute("value", "^(1/x)");
		buttonLn.setAttribute("value", "e^x");
		buttonLog.setAttribute("value", "10^x");
		buttonShift.setAttribute("value", "<<");
	} else {
		//set shifted to true
		data.isShifted = false;
		//set values of buttons to indicate this
		buttonSin.setAttribute("value", "sin");
		buttonCos.setAttribute("value", "cos");
		buttonTan.setAttribute("value", "tan");
		buttonPow.setAttribute("value", "^");
		buttonLn.setAttribute("value", "ln");
		buttonLog.setAttribute("value", "log");
		buttonShift.setAttribute("value", ">>");
	}
};

buttonRAD.onclick = function(){
	if(!data.isInRads){
		//set isInRad
		data.isInRads = true;
		//set value
		buttonRAD.setAttribute("value", "RAD");
	} else {
		//set isInRad
		data.isInRads = false;
		//set value
		buttonRAD.setAttribute("value", "DEG");
	}
};

buttonAC.onclick = function(){
	 data.reset();
};
buttonDEL.onclick = function(){
	deleteLastElementOrNumber();
};
button4.onclick = function(){
	appendLastNumber(4);
};
button5.onclick = function(){
	appendLastNumber(5);
};
button6.onclick = function(){
	appendLastNumber(6);
};
buttonX.onclick = function(){
	addOperator("x");
};
buttonSin.onclick = function(){
	if(!data.isShifted){
		addOperator("sin");
		addOperator("(");
	} else {
		addOperator("sin^-1");
		addOperator("(");
	}
};
buttonCos.onclick = function(){
	if(!data.isShifted){
		addOperator("cos");
		addOperator("(");
	} else {
		addOperator("cos^-1");
		addOperator("(");
	}
};
buttonTan.onclick = function(){
	if(!data.isShifted){
		addOperator("tan");
		addOperator("(");
	} else {
		addOperator("tan^-1");
		addOperator("(");
	}
};
buttonPow.onclick = function(){
	if(!data.isShifted){
		addOperator("^");
		addOperator("(");
	} else {
		addOperator("^1/");
		addOperator("(");
	}
};
button1.onclick = function(){
	appendLastNumber(1);
};
button2.onclick = function(){
	appendLastNumber(2);
};
button3.onclick = function(){
	appendLastNumber(3);
};
buttonMinus.onclick = function(){
	addOperator("-");
}
buttonLn.onclick = function(){
	if(!data.isShifted){
		addOperator("ln");
		addOperator("(");
	} else {
		addOperator("e^-1");
		addOperator("(");
	}
};
buttonLog.onclick = function(){
	if(!data.isShifted){
		addOperator("log");
		addOperator("(");
	} else {
		addOperator("10^");
		addOperator("(");
	}
};
buttonE.onclick = function(){
	addOperator("e");
};
buttonFactorial.onclick = function(){
	addOperator("!");
};
buttonDot.onclick = function(){
	//musnt add dot if already present
	if(data.lastNumber.indexOf(".") === -1){
		if(data.lastNumber === "NA"){
			data.lastNumber = "0";
			data.lastNumber += ".";
		} else {
			data.lastNumber += ".";
		}
		updateScreen();
	}
}
button0.onclick = function(){
	appendLastNumber(0);
};
buttonEquals.onclick = function(){
	evaluate();
};
buttonPlus.onclick = function(){
	addOperator("+");
};
buttonOpenBracket.onclick = function(){
	addOperator("(");
};
buttonCloseBracket.onclick = function(){
	addOperator(")");
};
buttonPi.onclick = function(){
	addOperator("π");
};
buttonSquareRoot.onclick = function(){
	addOperator("√");
};
//Keyboard events for flexibility
var screen = document.getElementById("screen");
document.addEventListener("keyup", (event) => {
	switch(event.key){
		case "7":
			button7.click();
			break;
		case "8":
			button8.click();
			break;
		case "9":
			button9.click();
			break;
		case "/":
			buttonDiv.click();
			break;
		case ">":
			buttonShift.click();
			break;
		case "r":
			buttonRAD.click();
			break;
		case "R":
			buttonRAD.click();
			break;
		case "a":
			buttonAC.click();
			break;
		case "A":
			buttonAC.click();
			break;
		case "Backspace":
			buttonDEL.click();
			break;
		case "Delete":
			buttonDEL.click();
			break;
		case "4":
			button4.click();
			break;
		case "5":
			button5.click();
			break;
		case "6":
			button6.click();
			break;
		case "*":
			buttonX.click();
			break;
		case "x":
			buttonX.click();
			break;
		case "s":
			buttonSin.click();
			break;
		case "S":
			buttonSin.click();
			break;
		case "c":
			buttonCos.click();
			break;
		case "C":
			buttonCos.click();
			break;
		case "t":
			buttonTan.click();
			break;
		case "T":
			buttonTan.click();
			break;
		case "^":
			buttonPow.click();
			break;
		case "1":
			button1.click();
			break;
		case "2":
			button2.click();
			break;
		case "3":
			button3.click();
			break;
		case "-":
			buttonMinus.click();
			break;
		case "n":
			buttonLn.click();
			break;
		case "N":
			buttonLn.click();
			break;
		case "l":
			buttonLog.click();
			break;
		case "L":
			buttonLog.click();
			break;
		case "e":
			buttonE.click();
			break;
		case "E":
			buttonE.click();
			break;
		case "!":
			buttonFactorial.click();
			break;
		case ".":
			buttonDot.click();
			break;
		case "0":
			button0.click();
			break;
		case "=":
			buttonEquals.click();
			break;
		case "Enter":
			buttonEquals.click();
			break;
		case "+":
			buttonPlus.click();
			break;
		case "|":
			buttonPlus.click();
			break;
		case "(":
			buttonOpenBracket.click();
			break;
		case ")":
			buttonCloseBracket.click();
			break;
		case "P":
			buttonPi.click();
			break;
		case "p":
			buttonPi.click();
			break;
		case "@":
			buttonSquareRoot.click();
			break;
	}
}, false);

var buttonHelp = document.getElementById("?");
buttonHelp.onclick = () => {
	if(window.location.href.indexOf("phone-index") > -1){
		window.location.replace("help.html");
	} else {
		window.location.replace("html/help.html");	
	}
}