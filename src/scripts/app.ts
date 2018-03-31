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

interface Message {
  command: string;
  hmmmOther?: any;
}

function sendMessage(message: Message) {
  return new Promise((resolve, reject) => {
    if (navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = event => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      navigator.serviceWorker.controller.postMessage(message, [
        messageChannel.port2,
      ]);
    } else {
      reject(
        "This page isn't currently controlled by a service worker. Please reload and try again."
      );
    }
  });
}

const clearButton = document.querySelector('#clear-cache');

if (clearButton) {
  clearButton.addEventListener('click', () => {
    sendMessage({ command: 'delete_all' })
      .then(() => {
        console.log('All caches deleted.');
      })
      .catch(error => {
        console.error('Caches not deleted:', error);
      });
  });
}

getNewWord();
showWord();
