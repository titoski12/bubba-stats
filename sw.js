// Bubba Stats — service worker: the app works offline after the first visit.
// When you publish a new version, bump CACHE so phones pick it up.
const CACHE = 'bubba-stats-v3';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Serve from cache immediately; refresh the cache in the background when online.
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, {ignoreSearch: true});
    const fresh = fetch(e.request).then(res => { if(res && res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => null);
    return cached || (await fresh) || cache.match('./index.html');
  }));
});
