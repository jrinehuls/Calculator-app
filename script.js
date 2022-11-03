let display = "Calculator Output";
document.getElementById("display-label").innerHTML = display;






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

function recip(a) {
    if (a != 0) {
        return 1/a;
    }
    else {
        return "Cannot divide by zero!"
    }
}

function sqrt(a) {
    return Math.sqrt(a);
}

function square(a) {
    return Math.pow(a,2);
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
        default:
            return "0ver 9000!";
            break;
       }
}