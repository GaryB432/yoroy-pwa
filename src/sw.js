// const precacheController = new workbox.precaching.PrecacheController();

function addIndexRevision(urls, defRev) {
  const rando = (Math.random() * 1000000).toPrecision(6);
  const indices = __precacheManifest.filter(m => m.url === '/index.html');
  const revision = indices.length === 1 ? indices[0].revision : defRev || rando;
  return urls.map(url => {
    return { url, revision };
  });
}

workbox.core.setCacheNameDetails({
  prefix: 'yoroy',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

workbox.precaching.precache([
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/right-chevron.svg',
  '/images/thumbs-up.svg',
]);

workbox.precaching.precache(addIndexRevision(['/', '/manifest.json']));

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, { cleanUrls: false });
