const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '0';
let awaitingNextValue = false;

function sendNumberValue(number) {

    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else {
        // If current Display Value is 0,replace it if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {

    // If operator pressed donot add decimal
    if(awaitingNextValue)
    return;

    // If no decimal,add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate First and Second Values
const calculate = {
    '/' : (firstNumber,secondNumber) => firstNumber / secondNumber ,

    '*' : (firstNumber,secondNumber) => firstNumber * secondNumber ,

    '+' : (firstNumber,secondNumber) => firstNumber + secondNumber ,

    '-' : (firstNumber,secondNumber) => firstNumber - secondNumber ,

    '=' : (firstNumber,secondNumber) => secondNumber ,

};

function useOperator(operator) {

    const currentValue = Number(calculatorDisplay.textContent);

    // Prevent Multiple Operators

    if(operatorValue && awaitingNextValue)
    return;

    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        console.log(firstValue,operatorValue,currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue);
        console.log('calculation:',calculation);
    }

    // Ready for next Value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Event Listeners for numbers,operators,decimal buttons

inputBtns.forEach((inputBtn) => {

    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset Display
function resetAll() {
    firstValue = 0;
    operatorValue = '0';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//EventListeners
clearBtn.addEventListener('click', resetAll); 