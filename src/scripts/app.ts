import '../styles/base.scss';

import { Greeter } from './greeter';
import { Worder } from './worder';

const greeter: Worder = new Worder('bugler');

const el = document.getElementById('greeting');
if (el) {
  el.innerHTML = greeter.create();
}

const btn = document.getElementById('go');
btn!.addEventListener('click', () => (el!.innerText = greeter.create()));
