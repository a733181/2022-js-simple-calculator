'use strict';
const sumEl = document.querySelector('.sum');
const btnsEl = document.querySelectorAll('.county-box li');
const showAllEl = document.querySelector('.show-all');

let isCount = false;

btnsEl.forEach((btnEl) => {
  btnEl.addEventListener('click', () => {
    calculatorHandler(btnEl.innerText);
  });
});

document.addEventListener('keydown', (e) => {
  if (
    !isNaN(Number(e.key)) ||
    ['+', '-', '*', '/', '.', 'Enter', 'C', 'c'].includes(e.key)
  ) {
    calculatorHandler(e.key);
  }
});

function calculatorHandler(value) {
  const text = value;
  const isString = isNaN(Number(text));
  const sumText = sumEl.innerText;
  const lastIsString = isNaN(Number(sumText[sumText.length - 1]));

  if ((text === '=' || text === 'Enter') && isCount) {
    if (lastIsString) {
      return;
    }
    showAllEl.innerText = sumText;
    sumEl.innerText = eval(sumText);
    isCount = false;
  } else if (text === 'C' || text === 'c') {
    sumEl.innerText = '0';
    showAllEl.innerText = '';
    isCount = false;
  } else if (text !== 'Enter') {
    if ((sumText === '-' || sumText === '.') && isString) {
      return;
    }

    if (lastIsString && isString) {
      return;
    }

    if (sumText !== '0') {
      sumEl.innerText += text;
      if (!isString) {
        isCount = true;
      }
    } else if (!['+', '*', '/'].includes(text)) {
      sumEl.innerText = text;
    }
  }
}
