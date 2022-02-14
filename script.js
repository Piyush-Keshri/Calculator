const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '0';
let awaitingNextValue = false ; 

function sendNumberValue(number){
    // If current Display Value is 0,replace it if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}

function addDecimal(){
    // If no decimal,add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator){

    const currentValue = Number(calculatorDisplay.textContent);
    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    }
    operatorValue = operator;
    console.log('firstValue',firstValue);
    console.log('operator',operatorValue);

}

// Add Event Listeners for numbers,operators,decimal buttons

inputBtns.forEach((inputBtn) => {

    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));  
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());  
    }
});

// Reset Display
function resetAll(){
    firstValue = 0;
    operatorValue = '0';
    awaitingNextValue = false ; 
    calculatorDisplay.textContent = '0';
}

//EventListeners
clearBtn.addEventListener('click',resetAll);