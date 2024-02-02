//The constansts in there
const e = 2.718281828459045,
	pi = 3.141592653589793238462643383279502884197;
//all buttons defined in the order they appear in the html doc??????
var isShiftOn = false;
var isAlphaOn = false;

var shiftButton = document.getElementById("shift");
var alphaButton = document.getElementById("alpha");

var reciprocalButton = document.getElementById("reciprocal");
var sinButton = document.getElementById("sin");

var logButton = document.getElementById("log");
var lnButton = document.getElementById("ln");
var powButton = document.getElementById("pow");
var tanButton = document.getElementById("tan");

var openBracketsButton = document.getElementById("openBrackets");
var closeBracketsButton = document.getElementById("closeBrackets");
var rootButton = document.getElementById("root");
var cosButton = document.getElementById("cos");

var sevenButton = document.getElementById("7");
var eightButton = document.getElementById("8");
var nineButton = document.getElementById("9");
var delButton = document.getElementById("del");
var ACButton = document.getElementById("AC");

var fourButton = document.getElementById("4");
var fiveButton = document.getElementById("5");
var sixButton = document.getElementById("6");
var multiplyButton = document.getElementById("multiply");
var divideButton = document.getElementById("divide");

var oneButton = document.getElementById("1");
var twoButton = document.getElementById("2");
var threeButton = document.getElementById("3");
var addButton = document.getElementById("add");
var subtractButton = document.getElementById("subtract");

var zeroButton = document.getElementById("0");
var dotButton = document.getElementById("dot");
var exponentialButton = document.getElementById("exponential");
var answerButton = document.getElementById("answer");
var equalButton = document.getElementById("equal");

//Dealing with shift and alpha first id est maniplation of states
function turnOnShift() {
	//turn alpha off if it is on
	if(isAlphaOn) {
		turnOffAlpha();
	}
	isShiftOn = true;
	shiftButton.setAttribute("class", "topButtons shiftActive");
	//change the texts of the affected
	reciprocalButton.innerHTML = "x!";
	rootButton.innerHTML = "3√x";
	logButton.innerHTML = "10^x";
	lnButton.innerHTML = "e^x";
	powButton.innerHTML = "y√x";
	sinButton.innerHTML = "sin^-1";
	cosButton.innerHTML = "cos^-1";
	tanButton.innerHTML = "tan^-1";
	exponentialButton.innerHTML = "π";
}

function turnOffShift() {
	isShiftOn = false;
	shiftButton.setAttribute("class", "topButtons");
	//change the texts of the affected buttons
	reciprocalButton.innerHTML = "<span class=\"shiftText\">[!] </span>x^-1";
	rootButton.innerHTML = "<span class=\"shiftText\">[3√ x] </span>√x";
	logButton.innerHTML = "<span class=\"shiftText\">[10^] </span>log";
	lnButton.innerHTML = "<span class=\"shiftText\">[e^] </span>ln";
	powButton.innerHTML = "<span class=\"shiftText\">[x√ y] </span>x^y";
	sinButton.innerHTML = "<span class=\"shiftText\">[sin^-1] </span>sin";
	cosButton.innerHTML = "<span class=\"shiftText\">[cos^-1] </span>cos";
	tanButton.innerHTML = "<span class=\"shiftText\">[tan^-1] </span>tan";
	exponentialButton.innerHTML = "<span class=\"shiftText\">[π] </span>X 10^x<span class=\"alphaText\"> [e]</span>";
}

function turnOnAlpha() {
	if(isShiftOn) {
		turnOffShift();
	}

	alphaButton.setAttribute("class", "topButtons alphaActive");
	isAlphaOn = true;
	//change the texts of the affected buttons
	exponentialButton.innerHTML = "e";
}

function turnOffAlpha() {
	isAlphaOn = false;
	alphaButton.setAttribute("class", "topButtons");
	//change the innerTexts of the affected buttons
	exponentialButton.innerHTML = "<span class=\"shiftText\">[π] </span>X 10^x<span class=\"alphaText\"> [e]</span>";
}

//The variables for screen text manipulation
var expressionScreen = document.getElementById("expressionScreen");
var answerScreen = document.getElementById("answerScreen");

function appendExpressionScreenText(text) {
	expressionScreen.value  += text;
}

function setExpressionScreenText(text) {
	expressionScreen.value = text;
}

function deleteExpressionScreenText(amount/*Amount through which to delete*/) {
	expressionScreen.value = expressionScreen.value.substring(0, expressionScreen.value.length - amount);
}

function setAnswerScreenText(text) {
	answerScreen.value = text;
}

//The array for holding the expression elemenst
var expressionArray = [];
//the number that is constantly modified before addition to expressionArray
var dynamicNumber = "N/A";
//The variable for holding the answerScreen
var answer = 0;
//variable for checking immediate state after evaluation
var justEvaluated = false;

//functions for modifying the expressionArray
function appendOperator(operator) {
	if(justEvaluated) {
		setExpressionScreenText("");
		justEvaluated = false;
		//If the operator is either -, +, / or X, add answer then operator
		if(operator === "+" || operator === "-" || operator === "X" || operator === "÷") {
			appendDynamicNumber(answer.toString());
			appendOperator(operator);
			return;
		}
	}
	//SPECIAL CASES
	//If one intends to make a negaive number, the last operator will have to be +, -, x or / and the dynamicNumber will have to be N/A
	if(operator === "-" && dynamicNumber === "N/A") {
		dynamicNumber = operator;
		appendExpressionScreenText(operator);
	} else if((operator === "+" || operator === "X" || operator === "÷") && dynamicNumber === "N/A") {
		//Here I throttle the addition of operators
		//No addition of cosecutive operators
		//No addition of +, -, x or / when the dynamicNumber is N/A
		//All these can be achieved by not adding the operators +,x and / when the dynamicNumber is N/A
		if(expressionArray[expressionArray.length - 1] === "+" || expressionArray[expressionArray.length - 1] === "-" || expressionArray[expressionArray.length - 1] === "X" || expressionArray[expressionArray.length - 1] === "÷" || expressionArray.length === 0) {
			return;
		}
	}

	//return if dynamicNumber === "-"
	if(dynamicNumber === "-") {
		return;
	}

	if(dynamicNumber !== "N/A") {
		expressionArray[expressionArray.length] = Number(dynamicNumber);
		dynamicNumber = "N/A";
	}

	expressionArray[expressionArray.length] = operator;
	appendExpressionScreenText(operator);
}

function appendDynamicNumber(number) {
	if(justEvaluated) {
		setExpressionScreenText("");
		justEvaluated = false;
	}

	if(dynamicNumber === "N/A") {
		dynamicNumber = number.toString();
		appendExpressionScreenText(number);
	} else if(dynamicNumber === "0") {
		dynamicNumber = number.toString();
		deleteExpressionScreenText(1);
		appendExpressionScreenText(number);
	} else {
		dynamicNumber += number.toString();
		appendExpressionScreenText(number);
	}
}

function appendDot() {
	if(dynamicNumber.indexOf(".") < 0) {
		//Add dot only when its absent
		if(dynamicNumber === "N/A") {
			dynamicNumber = "0.";
		} else if(dynamicNumber === "-") {
			dynamicNumber += "0.";
			appendExpressionScreenText("0.");
			return;
		} else {
			dynamicNumber += ".";
		}

		appendExpressionScreenText(".");
	}
}

function clear() {
	//revert everything to their defaults
	expressionArray = [];
	dynamicNumber = "N/A";
	setExpressionScreenText("");
}

/**For deleting when delButton is pressed
*/
function del() {
	//delete only if both dynamicNumber and expressionArray are not empty
	if(!(expressionArray.length === 0 && dynamicNumber === "N/A")) {
		//if the terminal element is number, dynamicNumber is not N/a
		if(dynamicNumber !== "N/A") {
			//if dynamicNumber has one digit, make it N/A
			if(dynamicNumber.length === 1) {
				dynamicNumber = "N/A";
			} else {
				//Here just reduce it
				dynamicNumber = dynamicNumber.substring(0, dynamicNumber.length - 1);
			}
			//Up here only one character is deleted from the screen
			deleteExpressionScreenText(1);
		} else {
			//Here the dynamicNumber number is N/A thus operators from the list are deleted instead
			//Get the length of the operator so as to know the amount through which to deleteExpressionScreenText
			var amount = expressionArray[expressionArray.length - 1].length;
			expressionArray = removeItems(expressionArray, expressionArray.length - 1, 1);
			//Now reduce the screen text by amount
			deleteExpressionScreenText(amount);
			//If the new last element is number, bring it down to the dynamicNumber
			if(typeof(expressionArray[expressionArray.length - 1]) === "number") {
				dynamicNumber = expressionArray[expressionArray.length - 1].toString();
				expressionArray = removeItems(expressionArray, expressionArray.length - 1, 1);
			}
		}
	}
}

//The onclick listeners for the buttons in the order they appear in the html
shiftButton.onclick = () => {
	if(isShiftOn) {
		turnOffShift();
	} else {
		turnOnShift();
	}
}

alphaButton.onclick = () => {
	if(isAlphaOn) {
		turnOffAlpha();
	} else {
		turnOnAlpha();
	}
}

//The complex operators will be added along side brackets to avoid discombobulation😎
reciprocalButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("!");
	} else {
		appendOperator("^-1");
	}
}

sinButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("sin^-1");
	} else {
		appendOperator("sin");
	}
}

logButton.onclick = () => {
	if(isShiftOn) {
		//if dynamicNumber is available, display it as product
		appendOperator("10^");
	} else {
		appendOperator("log");
	}
}

lnButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("e^");
	} else {
		appendOperator("ln");
	}
}

powButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("√");
	} else {
		appendOperator("^");
	}
}

tanButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("tan^-1");
	} else {
		appendOperator("tan");
	}
}

openBracketsButton.onclick = () => {
	appendOperator("(");
}

closeBracketsButton.onclick = () => {
	appendOperator(")");
}

rootButton.onclick = () => {
	if(isShiftOn) {
		appendOperator(" 3√");
	} else {
			appendOperator(" 2√");
	}
}

cosButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("cos^-1");
	} else {
		appendOperator("cos");
	}
}

sevenButton.onclick = () => {
	appendDynamicNumber(7);
}

eightButton.onclick = () => {
	appendDynamicNumber(8);
}

nineButton.onclick = () => {
	appendDynamicNumber(9);
}

delButton.onclick = () => {
	del();
}

ACButton.onclick = () => {
	clear();
}

fourButton.onclick = () => {
	appendDynamicNumber(4);
}

fiveButton.onclick = () => {
	appendDynamicNumber(5);
}

sixButton.onclick = () => {
	appendDynamicNumber(6);
}

multiplyButton.onclick = () => {
	appendOperator("X");
}

divideButton.onclick = () => {
	appendOperator("÷");
}

oneButton.onclick = () => {
	appendDynamicNumber(1);
}

twoButton.onclick = () => {
	appendDynamicNumber(2);
}

threeButton.onclick = () => {
	appendDynamicNumber(3);
}

addButton.onclick = () => {
 appendOperator("+");
}

subtractButton.onclick = () => {
	appendOperator("-");
}

zeroButton.onclick = () => {
	appendDynamicNumber(0);
}

dotButton.onclick = () => {
	appendDot();
}

exponentialButton.onclick = () => {
	if(isShiftOn) {
		appendOperator("π");
	} else if(isAlphaOn) {
		appendOperator("e");
	} else {
		appendOperator("X");
		appendDynamicNumber(10);
		appendOperator("^");
	}
}

answerButton.onclick = () => {
	appendOperator("Ans");
}

equalButton.onclick = () => {
	evaluate();
}

//Two fucntions for evaluation, one for solving an array of expresssions and the other for general evaluation
/**This function returns a single number; a solution of the expression
*/
function simplify(array) {
	for(var i = 0; i < array.length; i++) {
		//solving in order of appearance in the layout
		//reciprocal
		while(array.indexOf("^-1") >= 0) {
			var position = array.indexOf("^-1");
			array[position - 1] = reciprocal(array[position - 1]);
			array = removeItems(array, position, 1);
		}

		//factorial
		while(array.indexOf("!") >= 0) {
			var position = array.indexOf("!");
			array[position - 1] = factorial(array[position - 1]);
			array = removeItems(array, position, 1);
		}

		//sin
		while(array.indexOf("sin") >= 0) {
			var position = array.indexOf("sin");
			//replace the sin with the solution and remove the succeeding element from the list
			array[position] = sin(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf("sin^-1") >= 0) {
			var position = array.indexOf("sin^-1");
			array[position] = aSin(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		//log
		while(array.indexOf("log") >= 0) {
			var position = array.indexOf("log");
			array[position] = log(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf("10^") >= 0) {
			var position = array.indexOf("10^");
			array[position] = aLog(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		//ln
		while(array.indexOf("ln") >= 0) {
			var position = array.indexOf("ln");
			array[position] = ln(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf("e^") >= 0) {
			var position = array.indexOf("e^");
			array[position] = aLn(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}
		//
		while(array.indexOf("^") >= 0) {
			var position = array.indexOf("^");
			array[position - 1] = pow(array[position - 1], array[position + 1]);
			array = removeItems(array, position, 2);
		}

		while(array.indexOf("√") >= 0) {
			var position = array.indexOf("√");
			array[position - 1] = root(array[position + 1], array[position - 1]);
			array = removeItems(array, position, 2);
		}

		//tan
		while(array.indexOf("tan") >= 0) {
			var position = array.indexOf("tan");
			array[position] = tan(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf("tan^-1") >= 0) {
			var position = array.indexOf("tan^-1");
			array[position] = aTan(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		//roots
		while(array.indexOf(" 2√") >= 0) {
			var position = array.indexOf(" 2√");
			array[position] = squareroot(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf(" 3√") >= 0) {
			var position = array.indexOf(" 3√");
			array[position] = cuberoot(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		//cos
		while(array.indexOf("cos") >= 0) {
			var position = array.indexOf("cos");
			array[position] = cos(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}

		while(array.indexOf("cos^-1") >= 0) {
			var position = array.indexOf("cos^-1");
			array[position] = aCos(array[position + 1]);
			array = removeItems(array, position + 1, 1);
		}
		//division
		while(array.indexOf("÷") >= 0) {
			var position = array.indexOf("÷");
			array[position - 1] = divide(array[position - 1], array[position + 1]);
			array = removeItems(array, position, 2);
		}

		//multiplication
		while(array.indexOf("X") >= 0) {
			var position = array.indexOf("X");
			array[position - 1] = multiply(array[position - 1], array[position + 1]);
			array = removeItems(array, position, 2);
		}

		//subtraction
		while(array.indexOf("-") >= 0) {
			var position = array.indexOf("-");
			array[position - 1] = subtract(array[position - 1], array[position + 1]);
			array = removeItems(array, position, 2);
		}

		//addition
		while(array.indexOf("+") >= 0) {
			var position = array.indexOf("+");
			array[position - 1] = add(array[position - 1], array[position + 1]);
			array = removeItems(array, position, 2);
		}

		//Now do the implicit multiplications if length is larger than one still e.g (2)(3) = 6
		if(array.length === 1) {
			return array[0];
		} else {
			while(array.length > 1) {
				array[0] = multiply(array[0], array[1]);
				array = removeItems(array, 1, 1);
			}
			return array[0];
		}
	}
}

/**Now this function solves the whole thing
*/
function evaluate() {

	//replace the e, π and Ans
	for(var i = 0; i < expressionArray.length; i ++) {
		if(expressionArray[i] === "π") {
			expressionArray[i] = pi;
		} else if(expressionArray[i] === "e") {
			expressionArray[i] = e;
		} else if(expressionArray[i] === "Ans") {
			expressionArray[i] = answer;
		}
	}

	//return if list is empty and dynamicNumber is N/A
	if(expressionArray.length === 0 && dynamicNumber === "N/A") {
		return;
	}

	try {
		if(dynamicNumber !== "N/A") {
			expressionArray[expressionArray.length] = Number(dynamicNumber);
		}
		//for debugging
		console.log("expressionArray...");
		console.log(expressionArray);
		//solve brackets in reverse order
		while(expressionArray.indexOf("(") >= 0) {
			var openBracketPosition = expressionArray.lastIndexOf("(");
			var closeBracketPosition = expressionArray.indexOf(")", openBracketPosition);
			//Now the expression snippet within the bracket is solved
			//This solution replaces the openBrackets symbol and the rest are deleted
			expressionArray[openBracketPosition] = simplify(expressionArray.slice(openBracketPosition + 1, closeBracketPosition)/*Portion of the array wiwthin the brackets*/);
			expressionArray = removeItems(expressionArray, openBracketPosition + 1, closeBracketPosition - openBracketPosition /*amount*/);
		}
		//if the array's current length is one, return it. Otherwise simplify it further
		if(expressionArray.length === 1) {
			answer = expressionArray[0];
			setAnswerScreenText(answer);
		} else {
			answer = simplify(expressionArray);
			setAnswerScreenText(answer.toString());
		}

		//set the expressionArray and the dynamicNumber
		expressionArray = [];
		dynamicNumber = "N/A";
		justEvaluated = true;

	} catch(error) {
		console.log("Error ocurred...");
		console.log(error);
		setExpressionScreenText("anville95 says...");
		setAnswerScreenText("Sorry, an error occurred during evaluation");
	}
}

/**This function removes items from the array at a specified location over a specified range
*/
function removeItems(array, startIndex, amount/*The amount through which deletion occurrs*/) {
	for(var i = startIndex; i < array.length - amount; i++) {
		array[i] = array[i + amount];
	}
	//Now after rearranging, we remove the terminal obsolete elements and reeduce the array's length
	for(var i = 0; i < amount; i++) {
		delete array[array.length - 1];
		array.length --
	}

	return array;
}

//The evaluation functions in the order they appear in the layout
function reciprocal(firstNumber) {
	return pow(firstNumber, -1);
}

function factorial(firstNumber) {
	if(firstNumber === 0) {
		return 1;
	} else {
		return firstNumber * factorial(firstNumber - 1);
	}
}

function sin(firstNumber) {
	return Math.sin(firstNumber);
}

function aSin(firstNumber) {
	return Math.asin(firstNumber);
}

function log(firstNumber) {
	return Math.log(firstNumber) / 2.30258509299405;
}

function aLog(firstNumber) {
	return pow(10, firstNumber);
}

function ln(firstNumber) {
	return Math.log(firstNumber);
}

function aLn(firstNumber) {
	return pow(e, firstNumber);
}

function pow(firstNumber, secondNumber) {
	return Math.pow(firstNumber, secondNumber);
}

function root(firstNumber, secondNumber) {
	return pow(firstNumber, 1 / secondNumber);
}

function tan(firstNumber) {
	return Math.tan(firstNumber);
}

function aTan(firstNumber) {
	return Math.atan(firstNumber);
}

function squareroot(firstNumber) {
	return root(firstNumber, 2);
}

function cuberoot(firstNumber) {
	return root(firstNumber, 3);
}

function cos(firstNumber) {
	return Math.cos(firstNumber);
}

function aCos(firstNumber) {
	return Math.acos(firstNumber);
}

function multiply(firstNumber, secondNumber) {
	return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
	return firstNumber / secondNumber;
}
function add(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
	return firstNumber - secondNumber;
}
