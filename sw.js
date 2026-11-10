// Lets Mochi open without internet. It keeps a copy of the app files (never your data) on the phone.
const CACHE = 'mochi-v1';
const FILES = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/cycle.js',
  './js/content.js',
  './js/mascot.js',
  './js/store.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Show the saved copy straight away, and quietly fetch a fresh copy for next time.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const fresh = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
      if (cached) {
        e.waitUntil(fresh.catch(() => {}));
        return cached;
      }
      return fresh;
    })
  );
});
