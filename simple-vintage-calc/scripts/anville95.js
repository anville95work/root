//is the calculator on or off?
var isCalculatorOn = true;
//current number is string and is turned into a number ONLY upon addition to list so as to ease it's modification with the delete button
var currentNumber = "0";
//answers holder
var answer = 0;
//alert if an answer was just provided
var justEvaluated = false;
//list-like object for holding the operands and operators
var expressionList = {
	length:0
}

//screen values
var screen = document.getElementById("screen");
var expressionScreen = document.getElementById("expression");
var answerScreen = document.getElementById("answer");

function appendScreen(character) {
	expressionScreen.value += character;
}

function deleteScreen() {
	expressionScreen.value = expressionScreen.value.substring(0, expressionScreen.value.length - 1);
}

function clearScreen() {
	expressionScreen.value = "0";
	answerScreen.value = "0";
}

function clearScreenAndSetScreen(value) {
	expressionScreen.value = value;
	answerScreen.value = "0";
}

function setAnswer(value) {
	answerScreen.value = value;
}

function divide(firstNumber, secondNumber) {
	return firstNumber / secondNumber;
}

function multiply(firstNumber, secondNumber) {
	return firstNumber * secondNumber;
}

function add(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
	return firstNumber - secondNumber;
}

//Appends the current number before addition to list
function appendNumber(number) {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	//clear screen if an evaluation just ocurred
	if(justEvaluated) {
		clearScreen();
		justEvaluated = false;
	}
	if(currentNumber === "0" || currentNumber === "N/A") {
		currentNumber = number.toString();
		if(expressionList.length === 0) {
			deleteScreen();
		}
		appendScreen(currentNumber);
	} else {
		currentNumber += number.toString();
		appendScreen(number.toString());
	}
}

function addDot() {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	//append dot only if absent
	if(currentNumber.indexOf(".") < 0) {
		currentNumber += ".";
		appendScreen(".");
	}
}

function appendOperator(operator) {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	if(currentNumber !== "N/A" && currentNumber.indexOf(".") != currentNumber.length - 1) { //Do not add two consecutive operators and also ensure the terminal character of current number is not a dot
		expressionList[expressionList.length] = Number(currentNumber);
		expressionList[expressionList.length + 1] = operator;
		appendScreen(operator);
		expressionList.length += 2;
		currentNumber = "N/A";
	} else if(justEvaluated) {
		//add answer to list
		expressionList[expressionList.length] = answer;
		clearScreenAndSetScreen(answer);
		expressionList[expressionList.length + 1] = operator;
		appendScreen(operator);
		expressionList.length += 2;
		justEvaluated = false;
	}
}

function del() {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	//Don't do anything if the list is empty and current number is N/A
	if(!(expressionList.length === 0 && currentNumber === "N/A")) {
		//If the last element is an operator, remove it from the list and pull the second last element to the current number
		if(currentNumber === "N/A") {
			delete expressionList[expressionList.length - 1];
			currentNumber = expressionList[expressionList.length - 2].toString();
			delete expressionList[expressionList.length - 2];
			expressionList.length -= 2;
		}
		//Otherwise erase the current number if it is zero
		 else if(currentNumber.length === 1) {
			currentNumber = "N/A";
		}
		//Otherwise truncate the current number at the terminal position
		else {
			currentNumber = currentNumber.substring(0, currentNumber.length - 1);
		}
		deleteScreen();
	}
}

function removeItems(startIndex, amount) {
	//rearrange items by replacing the removed items with the trailing items
	for(var i = startIndex; i < expressionList.length - amount; i++) {
		expressionList[i] = expressionList[i + amount];
	}
	//Now remove the duplicated posterior items
	for(var i = 0; i < amount; i++) {
		delete expressionList[expressionList.length - 1];
		expressionList.length --;
	}
}

function evaluate() {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	//Evaluate only if the last element is not an operator
	if(currentNumber !== "N/A") {
		//add the last number to the list
		expressionList[expressionList.length] = Number(currentNumber);
		//now clear it
		currentNumber = "N/A";
		expressionList.length += 1;
		//Division -> Multiplication -> Addition -> Subtraction
		//But in my implementation the subtraction comes first. You'll see when you do something like [12-33+25x9] which yields -246 when addition comes before subtraction and 204 when subtraction comes before addition 
		for(var i = 0; i < expressionList.length; i++) {
			if(expressionList[i] === "÷") {
				expressionList[i - 1] = divide(expressionList[i - 1], expressionList[i + 1]);
				removeItems(i, 2);
				i -= 1;
			}
		}
		
		for(var i = 0; i < expressionList.length; i++) {
			if(expressionList[i] === "x") {
				expressionList[i - 1] = multiply(expressionList[i - 1], expressionList[i + 1]);
				removeItems(i, 2);
				i -= 1;
			}
		}
		
		for(var i = 0; i <expressionList.length; i++) {
			if(expressionList[i] === "-") {
				expressionList[i - 1] = subtract(expressionList[i - 1], expressionList[i + 1]);
				removeItems(i, 2);
				i -= 1;
			}
		}
		
		for(var i = 0; i <expressionList.length; i++) {
			if(expressionList[i] === "+") {
				expressionList[i - 1] = add(expressionList[i - 1], expressionList[i + 1]);
				removeItems(i, 2);
				//must find a way to take it back
				i -= 1;
			}
		}
		
		//At this point, the length of  the expressionList should be one, if not, alert it
		if(expressionList.length === 1) {
			answer = expressionList[0];
			setAnswer(expressionList[0].toString());
		} else {
			setAnswer("SORRY, ERROR OCCURRED!")
			console.log("Why is the length not zero ??");
			console.log(expressionList);
		}
		//clear the expressionList
		expressionList = {
			length: 0
		}
		justEvaluated = true;
	}
}

function clear() {
	//Do nothing if calculator is off
	if(!isCalculatorOn) {
		return;
	}
	currentNumber = "0";
	expressionList = {
		length: 0
	};
	//clear the screens
	clearScreen();
}

//This will be used to prevent cancellation of shut-down upon initiation until completion
var isShuttingDown = false;
//similarly

function turnCalculatorOff() {
	isShuttingDown = true;
	isCalculatorOn = false;
	expressionScreen.value = "anville95";
	answerScreen.value = "shutting down...";
	isShuttingDown = true;
	setTimeout(() => {
		powerButton.setAttribute("class", "button powerOff");
		expressionScreen.value = "";
		answerScreen.value = "";
		screen.style.backgroundColor = "#a0a286";
		isShuttingDown = false;
	}, 800);
}

function turnCalculatorOn() {
	screen.style.backgroundColor = "#f1f6a9";
	expressionScreen.value = "anville95";
	answerScreen.value = "powering up...";
	setTimeout(() => {
		powerButton.setAttribute("class", "button powerOn");
		isCalculatorOn = true;
		clear();
	}, 800);
}

var clearButton = document.getElementById("clear");
var divideButton = document.getElementById("divide");
var multiplyButton = document.getElementById("multiply");
var powerButton = document.getElementById("power");

var sevenButton = document.getElementById("seven");
var eightButton = document.getElementById("eight");
var nineButton = document.getElementById("nine");
var deleteButton = document.getElementById("delete");

var fourButton = document.getElementById("four");
var fiveButton = document.getElementById("five");
var sixButton = document.getElementById("six");
var minusButton = document.getElementById("minus");

var oneButton = document.getElementById("one");
var twoButton = document.getElementById("two");
var threeButton = document.getElementById("three");
var addButton = document.getElementById("add");

var zeroButton = document.getElementById("zero");
var dotButton = document.getElementById("dot");
var equalButton = document.getElementById("equal");

//their onclick listeners

clearButton.onclick = () => {
	clear();
}
divideButton.onclick = () => {
	appendOperator("÷");
}
multiplyButton.onclick = () => {
	appendOperator("x");
}
powerButton.onclick = () => {
	if(!isShuttingDown) {
		if(isCalculatorOn) {
			turnCalculatorOff();
		} else {
			turnCalculatorOn();
		}
	}
}

sevenButton.onclick = () => {
	appendNumber(7);
}
eightButton.onclick = () => {
	appendNumber(8);
}
nineButton.onclick = () => {
	appendNumber(9);
}
deleteButton.onclick = () => {
	del();
}

fourButton.onclick = () => {
	appendNumber(4);
}
fiveButton.onclick = () => {
	appendNumber(5);
}
sixButton.onclick = () => {
	appendNumber(6);
}
minusButton.onclick = () => {
	appendOperator("-");
}

oneButton.onclick = () => {
	appendNumber(1);
}
twoButton.onclick = () => {
	appendNumber(2);
}
threeButton.onclick = () => {
	appendNumber(3)
}
addButton.onclick = () => {
	appendOperator("+");
}

zeroButton.onclick = () => {
	appendNumber(0);
}
dotButton.onclick = () => {
	addDot();
}
equalButton.onclick = () => {
	evaluate();
}

/*
TURN OFF CALCULATOR UPON LAUNCH
*/
//--------------------------------------------YAS
powerButton.setAttribute("class", "button powerOff");
expressionScreen.value = "";
answerScreen.value = "";
screen.style.backgroundColor = "#a0a286";
isCalculatorOn = false;
//--------------------------------------------YAS