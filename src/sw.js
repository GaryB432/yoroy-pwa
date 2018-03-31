
const allAssets = [
  'css/app.ae7522632170d3c8bed5.css',
  'css/app.ae7522632170d3c8bed5.css.map',
  'images/icons/icon-128x128.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-512x512.png',
  'images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/right-chevron.svg',
  'images/thumbs-up.svg',
  'index.html',
  'manifest.json',
  'precache-manifest.5e4b0eb6296dcf698ee1a050827af58e.js',
  'scripts/app.ae7522632170d3c8bed5.js',
  'scripts/app.ae7522632170d3c8bed5.js.map',
  'sw.js'
];

const preCached = [
  'images/icons/icon-128x128.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-512x512.png',
  'images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/right-chevron.svg',
  'images/thumbs-up.svg',
  'index.html',
];

self.__precacheManifest = self.__precacheManifest.concat(
  preCached.map(url => {
    return { url };
  })
);
