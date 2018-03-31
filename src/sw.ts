// tslint:disable:no-console

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = ['/', '/images/right-chevron.svg', '/images/thumbs-up.svg'];

interface WEventMap extends WindowEventMap {
  install: InstallEvent;
}

interface InstallEvent extends Event {
  waitUntil(fn: Promise<any>): Promise<any>;
}

interface SWorker {
  addEventListener<K extends keyof WEventMap>(
    type: K,
    listener: (this: Window, ev: WEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

const _self = self as SWorker;

_self.addEventListener('install', async event => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(urlsToCache);
});
