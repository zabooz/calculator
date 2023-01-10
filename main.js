const allDigits = document.querySelectorAll(".digit");
const screen = document.querySelector(".screen p");
const clearBtn = document.querySelector(".clear");
const allOperators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equal");
const decPoint = document.querySelector('.point');

let a = null;
let b = null;
let op = null;

add = (a, b) => a + b;
sub = (a, b) => a - b;
multiply = (a, b) => a * b;
division = (a, b) => a / b;

clearScreen = () => {
  screen.textContent = "";
  a = null;
  b = null;
  op = null;
  decPoint.disabled = false;
};
point = () => {
  decPoint.disabled = true;
  screen.textContent += decPoint.textContent
}
remove = () => screen.textContent = screen.textContent.slice(0,-1);

change = () => screen.textContent = `-${screen.textContent}`

operator = (a, b, op) => {
  let result = null;
  switch (op) {
    case "+": result = +add(a, b);break;
    case "-": result = +sub(a, b);break;
    case "*": result = +multiply(a, b);break;
    case "/": result = +division(a, b);
  }
   !Number.isInteger(result) ? screen.textContent = result.toFixed(2) : screen.textContent = result
};
equals.addEventListener("click", (event) => {
  operator(a, b, op);
  a = +screen.textContent;
  b = null;
});
allDigits.forEach((numBtn) => {
  numBtn.addEventListener("click", (event) => {
    screen.textContent += numBtn.textContent;
    b = +screen.textContent.split(op)[1]
  });
});
allOperators.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (event) => {
    if(b){
      operator(a,b,op);
      b = null;
      decPoint.disabled = false;
    }
    a = +screen.textContent;
    screen.textContent += operatorBtn.textContent;
    op = operatorBtn.textContent;
    decPoint.disabled = false;
  });
});
