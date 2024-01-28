// Names of the two caches used in this version of the service worker.
// Change the cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// List of local resources we always want to be cached.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png', // Add other icons and assets as needed
  '/static/js/bundle.js',
  // Add additional assets you want to cache, like CSS or additional JavaScript files
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Your files were pre-cached successfully!');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache data', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it will fetch the resource from the network.
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('/')) {
    console.log('[ServiceWorker] Fetch (data)', evt.request.url);
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch((err) => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      })
    );
    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      });
    })
  );
});
