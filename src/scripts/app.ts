import { Worder } from './worder';

const worder: Worder = new Worder('bugler');

const el = document.getElementById('bugler');

function spinWord() {
  el!.innerHTML = worder.create();
}

const up = document.querySelector('.up')!;
up.addEventListener('click', () => {
  spinWord();
});
const down = document.querySelector('.down')!;
down.addEventListener('click', () => {
  spinWord();
});

spinWord();
