// tslint:disable:no-console

const CACHE_NAME = 'bugler-cache-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/images/right-chevron.svg',
  '/images/thumbs-up.svg',
];

import 'tslib';

interface WEventMap extends WindowEventMap {
  install: InstallEvent;
  fetch: FetchEvent;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(fn: Promise<Response>): void;
}

interface InstallEvent extends Event {
  waitUntil<T>(fn: Promise<T>): Promise<T>;
}

interface SWorker {
  addEventListener<K extends keyof WEventMap>(
    type: K,
    listener: (this: Window, ev: WEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

const _self = self as SWorker;

async function cacheFirst(req: Request): Promise<Response> {
  const cachedResponse: Promise<Response> = await caches.match(req);
  console.log(cachedResponse, 'hi');
  return cachedResponse || fetch(req);
}

_self.addEventListener('install', async event => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(staticAssets);
});

_self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});
