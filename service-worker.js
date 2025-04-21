const cacheName = 'library-cache-v1';
const assets = [
  '/',
  '/main.html',
  '/catalog.html',
  '/index.html',
  '/style_updated_v2.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Установка
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

// Запросы
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
