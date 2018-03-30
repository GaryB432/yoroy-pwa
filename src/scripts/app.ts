/* tslint:disable:no-var-requires */
import { Worder } from './worder';

const thumbsUp = require('../svg/thumbs-up.svg');
const chevron = require('../svg/right-chevron.svg');

const worder: Worder = new Worder('bugler');

const el = document.getElementById('bugler');

function spinWord() {
  el!.innerHTML = worder.create();
}

const bback = document.querySelector('.back')!;
const backSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
backSvg.innerHTML = chevron;
bback.appendChild(backSvg);
bback.addEventListener('click', () => {
  spinWord();
});

const bup = document.querySelector('.up')!;
const upSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
upSvg.innerHTML = 'thumbsUp';
bup.appendChild(upSvg);
bup.addEventListener('click', () => {
  spinWord();
});

// const bdown = document.querySelector('.down')!;
// const downSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
// downSvg.innerHTML = thumbsUp;
// bdown.appendChild(downSvg);
// bdown.addEventListener('click', () => {
//   spinWord();
// });

const bforth = document.querySelector('.forth')!;
const forthSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
forthSvg.innerHTML = chevron;
bforth.appendChild(forthSvg);
bforth.addEventListener('click', () => {
  spinWord();
});


spinWord();
