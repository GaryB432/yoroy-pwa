/* tslint:disable:no-var-requires no-console */
import { Worder } from './worder';

const worder: Worder = new Worder();

const wordElement = document.getElementById('bugler');

const disabled = 'disabled';
const selected = 'selected';
const words: string[] = [];
let ndx: number = -1;
let selectedButton: HTMLElement;

function enable(control: Element, enabled = true) {
  if (enabled) {
    control.classList.remove(disabled);
  } else {
    control.classList.add(disabled);
  }
}

function setSelectedButton(elem: HTMLElement) {
  if (selectedButton) {
    selectedButton.classList.remove(selected);
  }
  elem.classList.add(selected);
  selectedButton = elem;
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

const bback = document.querySelector('.back')! as HTMLElement;
bback.addEventListener('click', () => {
  if (ndx > 0) {
    ndx--;
    showWord();
    setSelectedButton(bback);
  }
});

const bup = document.querySelector('.up')! as HTMLElement;
bup.addEventListener('click', e => {
  dismiss(10);
  setSelectedButton(bup);
});

const bdown = document.querySelector('.down')! as HTMLElement;
bdown.addEventListener('click', () => {
  dismiss(0);
  setSelectedButton(bdown);
});

const bforth = document.querySelector('.forth')! as HTMLElement;
bforth.addEventListener('click', () => {
  if (ndx < words.length - 1) {
    ndx++;
    showWord();
    setSelectedButton(bforth);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      },
      err => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}

getNewWord();
showWord();
