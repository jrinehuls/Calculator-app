let topDisplay = "";
let bottomDisplay = "";
let result = "";
let reset = true;
const digits = 12;
const places = 8;
document.getElementById("bottom-label").innerHTML = bottomDisplay;
const numButtons = document.querySelectorAll(".num-button");
const aritButtons = document.querySelectorAll(".arit-button");
const clearButton = document.getElementById("clear");
const recipButton = document.getElementById("recip");
const expButton = document.getElementById("exp");
const squareButton = document.getElementById("square");
const sqrtButton = document.getElementById("sqrt");
const negButton = document.getElementById("neg");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");


//-----------------The basic operations------------------
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function modulus(a, b) {
    return a % b;
}

function powers(a, b) {
    return Math.pow(a, b);
}

//--------------Switch for choosing operation-------------
function onEquals(operation, a, b) {
    switch (operation) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        case '%':
            return modulus(a, b);
            break;
        case '^':
            return powers(a, b);
            break;
        default:
            return "Over 9000!";
            break;
       }
}

//----------------Some non-math functions----------------
function updateLowerDisplay(bottomDisplay) {
    document.getElementById("bottom-label").innerHTML = bottomDisplay;
}

function updateUpperDisplay(topDisplay) {
    document.getElementById("top-label").innerHTML = topDisplay;
}

//---------------------------Add event listeners---------------------
/* Clicking a number button adds to the bottom display. Also checks if
"reset" is true (at start or because "=" was pushed) to reset top label
and clear out bottom label.
*/
numButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (reset) {
            topDisplay = "";
            updateUpperDisplay(topDisplay);
            bottomDisplay = "";
            reset = false;
        }
        bottomDisplay+=button.innerHTML;
        updateLowerDisplay(bottomDisplay);
    })
});
//--Clicking an operand add to string and moves up to upper display--
aritButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (bottomDisplay != "") {
            topDisplay = bottomDisplay;
            topDisplay +=` ${button.innerHTML} `;
            updateUpperDisplay(topDisplay);
            bottomDisplay = "";
            updateLowerDisplay(bottomDisplay);
            reset = false;
        }
    })
});
//------------------event listener for recip button-------------------
function recip() {
    reset=true;
    if (bottomDisplay != "") {
        bottomDisplay = onEquals('^', bottomDisplay, -1);
        if (bottomDisplay.toString().length > digits) {
            updateLowerDisplay(Number(bottomDisplay).toExponential(places));
        }
        else {
            updateLowerDisplay(bottomDisplay);        
        }
    }    
};

recipButton.addEventListener('click', recip);
//---------------event listener for exponent button-------------------
function exponent() {
    if (bottomDisplay != "") {
        topDisplay = bottomDisplay;
        topDisplay += ' ^ ';
        updateUpperDisplay(topDisplay);
        bottomDisplay = "";
        updateLowerDisplay(bottomDisplay);
        reset = false;
    }   
};

expButton.addEventListener('click', exponent)

//---------------event listener for square button--------------------
function square() {
    reset=true;
    if (bottomDisplay != "") {
        bottomDisplay = onEquals('^', bottomDisplay, 2);
        if (bottomDisplay.toString().length > digits) {
            updateLowerDisplay(Number(bottomDisplay).toExponential(places));
        }
        else {
            updateLowerDisplay(bottomDisplay);        
        }
    }    
};

squareButton.addEventListener('click', square)
//---------------event listener for square root button------------------
function squareRoot() {
    reset=true;
    if (bottomDisplay != "") {
        bottomDisplay = onEquals('^', bottomDisplay, 0.5);
        if (bottomDisplay.toString().length > digits) {
            updateLowerDisplay(Number(bottomDisplay).toExponential(places));
        }
        else {
            updateLowerDisplay(bottomDisplay);        
        }
    }    
};

sqrtButton.addEventListener('click', squareRoot)
//---------------event listener for negation button------------------
function negate() {
    reset=true;
    if (bottomDisplay != "") {
        bottomDisplay = 0 - Number(bottomDisplay);
        if (bottomDisplay.toString().length > digits) {
            updateLowerDisplay(Number(bottomDisplay).toExponential(places));
        }
        else {
            updateLowerDisplay(bottomDisplay);        
        }
    }    
};

negButton.addEventListener('click', negate)
//---------------event listener for decimal button------------------
function decimal() {
    //reset=false;
    if (bottomDisplay != "" && !bottomDisplay.toString().includes('.')) {
        bottomDisplay = bottomDisplay + '.';
        updateLowerDisplay(bottomDisplay);
        reset=false;
    }    
    
};

decimalButton.addEventListener('click', decimal)
//---------------event listener for clear button------------------
function clear() {
    reset=true;
    updateUpperDisplay('');
    updateLowerDisplay('');  
};

clearButton.addEventListener('click', clear)
//-------------Click equals button to display result-----------------

function calculate() {
    let split = topDisplay.split(" ");
    if (split.length == 3) {
        a = Number(split[0]);
        operation = split[1];
        b = Number(bottomDisplay);
        topDisplay = `${topDisplay} ${bottomDisplay} =`;
        bottomDisplay = onEquals(operation,a,b);
        updateUpperDisplay(topDisplay);
        if (bottomDisplay.toString().length > digits) {
            updateLowerDisplay(Number(bottomDisplay).toExponential(places));
        }
        else {
            updateLowerDisplay(bottomDisplay);        
        }
        reset = true;
    }
};

equalsButton.addEventListener('click', calculate);

//---Checks for numeric key and pressed to add to lower display-----
window.addEventListener("keydown", function (e) {
    numButtons.forEach(button => {
        if(button.innerHTML===e.key) {
            if (reset) {
                topDisplay = "";
                updateUpperDisplay(topDisplay);
                bottomDisplay = "";
                reset = false;
            }
            bottomDisplay+=button.innerHTML;
            updateLowerDisplay(bottomDisplay);
        }
    })
    aritButtons.forEach(button => {
        if(button.innerHTML===e.key) {
            if (bottomDisplay != "") {
                topDisplay = bottomDisplay;
                topDisplay+=` ${button.innerHTML} `;
                updateUpperDisplay(topDisplay);
                bottomDisplay="";
                updateLowerDisplay(bottomDisplay);
                reset = false;
            }
        }
    })
    if(e.key === '^') {
        exponent();
    }
    if(e.key === '.') {
        decimal();
    }
    if(e.key === '=' || e.key === "Enter") {
        calculate();
    }
    //--------need to do with squares and stuff--------------
});