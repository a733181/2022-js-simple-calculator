'use strict';

const clearEl = document.querySelector('.clear');
const showCountEl = document.querySelector('.show-county');
const numbersAllEl = document.querySelectorAll('.numbers');
const arithmeticAllEl = document.querySelectorAll('.arithmetic');
const showAllEl = document.querySelector('.show-all');

let countArr = [];

numbersAllEl.forEach((numbersEl) => {
  numbersEl.addEventListener;
  numbersEl.onclick = (e) => {
    const value = e.target.innerText;
    if (value.length > 1) {
      return;
    }

    if (value === 'C') {
      renderPlaceholderHander();
      renderHander();
    } else {
      renderHander(value);
    }
  };
});

arithmeticAllEl.forEach((arithmeticEl) => {
  arithmeticEl.onclick = (e) => {
    const value = e.target.innerText;
    if (value > 1) {
      return;
    }
    arithmeticHander(value);
  };
});

document.body.onkeydown = (e) => {
  if (countArr) {
    showCountEl.setAttribute('placeholder', '');
  }

  if (e.key >= 0 || e.key <= 9 || e.key === '.') {
    renderHander(e.key);
  } else if (e.key === 'c' || e.key === 'C') {
    renderHander();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    arithmeticHander(e.key);
  } else if (e.key === 'Enter') {
    arithmeticHander('=');
  }
};

function renderHander(text = '') {
  let render = text ? showCountEl.value + text : text;
  if (render === 'Infinity' || isNaN(render)) {
    render = 'Error';
  }

  showAllEl.innerText = countArr.join('');
  showCountEl.value = render;
}

function arithmeticHander(arithmetic) {
  countArr.push(+showCountEl.value);
  countArr.push(arithmetic);
  renderHander();

  if (arithmetic === '=') {
    const lastArithmeticIndex = countArr.length - 3;
    const lastIsNaN = isNaN(Number(countArr[lastArithmeticIndex]));

    if (lastIsNaN && countArr[lastArithmeticIndex + 1] === 0) {
      countArr.splice(lastArithmeticIndex, 2);
      renderHander();
    }
    countHander();
  }
}

function countHander() {
  let sum = countArr[0];

  for (let i = 0; i <= countArr.length - 1; i++) {
    if (i % 2 !== 0) {
      if (countArr[i] === '=') {
        break;
      }
      switch (countArr[i]) {
        case '+': {
          sum += countArr[++i];
          break;
        }
        case '-': {
          sum -= countArr[++i];
          break;
        }
        case '*': {
          sum *= countArr[++i];
          break;
        }
        case '/': {
          sum /= countArr[++i];
          break;
        }
      }
    }
  }
  renderPlaceholderHander(sum);
}
function renderPlaceholderHander(text = '') {
  showCountEl.setAttribute('placeholder', text);
  if (text !== '') {
    countArr = [];
  }
}
