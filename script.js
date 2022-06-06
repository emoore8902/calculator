let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numbersbtns = document.querySelectorAll("[number]");
const operatorbtns = document.querySelectorAll("[operator]");
const equalsbtn = document.getElementById('eqlsbtn');
const clearbutton = document.getElementById('clearbtn');
const deletebtn = document.getElementById('deletebtn');
const pointbtn = document.getElementById('pointbtn');
const currentScreen = document.getElementById('currentscreen');
const previousScreen = document.getElementById('previousscreen');

equalsbtn.addEventListener('click', evaluate);
clearbutton.addEventListener('click', clear);
deletebtn.addEventListener('click', deleteNumber);
pointbtn.addEventListener('click', appendPoint);

numbersbtns.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorbtns.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
    if (currentScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentScreen.textContent += number;
}

function resetScreen(){
    currentScreen.textContent = '';
    shouldResetScreen = false;
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstOperand = currentScreen.textContent;
    currentOperation = operator;
    previousScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}
    
function evaluate() {
    if (currentOperation === null || shouldResetScreen) {
        return;
    }
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentScreen.textContent;
    currentScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    previousScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function clear() {
    currentScreen.textContent = '0';
    previousScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
  }
  
  function appendPoint() {
    if (shouldResetScreen) {
        resetScreen()
    }
    if (currentScreen.textContent === ''){
      currentScreen.textContent = '0';
    }
    if (currentScreen.textContent.includes('.')) {
        return
    }
    currentScreen.textContent += '.';
  }
  
  function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent
      .toString()
      .slice(0, -1);
  }

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

function add(x,y){
    return x + y;
}

function subtract(x,y){
    return x - y;
}

function multiply(x,y){
    return x * y;
}

function divide (x,y) {
    return x / y;
}

function operate (operator,x,y) {
    x = Number(x);
    y = Number(y);
    switch (operator) {
        case '+' :
            return add(x,y);
            break;
        case '-' :
            return subtract(x,y);
            break;
        case '*' :
            return multiply(x,y);
            break;    
        case '/' :
            if (y === 0){
                return null;
            }
            return divide(x,y);
            break;
        default:
            return null;
    }
}

function display(){

}
