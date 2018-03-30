import { Worder } from './worder';

// import { stuff } from '../public/images/thumbs-up.svg';

const thumbsUp = require('../public/images/thumbs-up.svg');
const chevron = require('../public/images/right-chevron.svg');

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
const up = document.querySelector('.up')!;
up.addEventListener('click', () => {
  spinWord();
});
const down = document.querySelector('.down')!;
down.addEventListener('click', () => {
  spinWord();
});

spinWord();
