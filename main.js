const allDigits = document.querySelectorAll(".digit");
const screen = document.querySelector(".screen p");
const clearBtn = document.querySelector(".clear");
const allOperators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
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

change = () => {
    if(!b){
      a = -a;
      screen.textContent = `${a}`
    }else{
      if(b >=0){
        b = -b;
        screen.textContent = `${a}${op}(${b})`;
      }else if(b<=0){
        b = Math.abs(b)
        screen.textContent = `${a}${op}${b}`
      }
    }
}

operator = (a, B, operator) => {
  let result = null;
  const regex = /[\-\*\/\+][\-\*\/\+]/g;
  if((regex.test(screen.textContent))){
    return screen.textContent = 'Syntax Error';
  }
  if(!b && b !== 0){
    return a;
  }
  switch (operator) {
    case "+": result = +add(a, B);break;
    case "-": result = +sub(a, B);break;
    case "*": result = +multiply(a, B);break;
    case "/": result = +division(a, B);
  }
   !Number.isInteger(result) ? screen.textContent = result.toFixed(2) : screen.textContent = result;
    b = null;
};

equals.addEventListener("click", (event) => {
  operator(a, b, op);
  a = +screen.textContent;
  b = null;

});

allDigits.forEach((numBtn) => {
  numBtn.addEventListener("click", (event) => {
    if(screen.textContent === 'Syntax Error'){
      clearScreen();
    }
    screen.textContent += numBtn.textContent;
    if(!op){
      a = +screen.textContent
    }
    b = +screen.textContent.split(op).filter(item => item !== '')[1];
  });
});

allOperators.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (event) => {
    if(screen.textContent === 'Syntax Error'){
      clearScreen();
    }
    if(b){
      operator(a,b,op);
      b = null;
      decPoint.disabled = false;
    }
    a = +screen.textContent
    screen.textContent += operatorBtn.textContent;
    op = operatorBtn.textContent;
    decPoint.disabled = false;

  });
});

