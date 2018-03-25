import '../styles/base.scss';

import { Greeter } from './greeter';
import { Worder } from './worder';

const greeter: Worder = new Worder('bugler');

const el = document.getElementById('bugler');

function spinWord() {
  el!.innerHTML = greeter.create();
}

const up = document.querySelector('.up');
up!.addEventListener('click', () => {
  spinWord();
});
const down = document.querySelector('.down');
down!.addEventListener('click', () => {
  spinWord();
});

spinWord();
