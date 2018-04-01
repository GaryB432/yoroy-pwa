const precacheController = new workbox.precaching.PrecacheController();

const preCached = [
  '/',
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
  {
    revision: '1014v',
    url: '/manifest.json',
  },
];

workbox.core.setCacheNameDetails({
  prefix: 'yoroy',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

// workbox.skipWaiting();
// workbox.clientsClaim();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest.concat(preCached), {
  cleanUrls: false,
});
