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
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', () => {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker
      .register('service-worker.js')
      .then(reg => {
        // updatefound is fired if service-worker.js changes.
        reg.onupdatefound = () => {
          // The updatefound event implies that reg.installing is set; see
          // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
          const installingWorker = reg.installing!;

          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  console.log('New or updated content is available.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  console.log('Content is now available offline!');
                }
                break;

              case 'redundant':
                console.error(
                  'The installing service worker became redundant.'
                );
                break;
            }
          };
        };
      })
      .catch(e => {
        console.error('Error during service worker registration:', e);
      });
  });
}

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
