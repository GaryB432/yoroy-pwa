/* tslint:disable:no-var-requires */
import { Worder } from './worder';

const worder: Worder = new Worder();

const wordElement = document.getElementById('bugler');

const disabled = 'disabled';

const words: string[] = [];
let ndx: number = -1;

function enable(control: Element, enabled = true) {
  if (enabled) {
    control.classList.remove(disabled);
  } else {
    control.classList.add(disabled);
  }
}

function getNewWord() {
  ndx = words.push(worder.create()) - 1;
}

function showWord() {
  wordElement!.innerText = words[ndx];
  enable(bback, ndx > 0);
  enable(bforth, ndx < words.length - 1);
}

function dismiss(score: number) {
  // tslint:disable-next-line:no-console
  console.log(words[ndx], score);
  getNewWord();
  showWord();
}

const bback = document.querySelector('.back')!;
const backSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
bback.appendChild(backSvg);
bback.addEventListener('click', () => {
  if (ndx > 0) {
    ndx--;
    showWord();
  }
});

const bup = document.querySelector('.up')!;
bup.addEventListener('click', () => {
  dismiss(10);
});

const bdown = document.querySelector('.down')!;
bdown.addEventListener('click', () => {
  dismiss(0);
});

const bforth = document.querySelector('.forth')!;
bforth.addEventListener('click', () => {
  if (ndx < words.length - 1) {
    ndx++;
    showWord();
  }
});

getNewWord();
showWord();
