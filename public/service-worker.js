var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
//TODO: which files should be cached? Add them here:
var filesToCache = [
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//TODO: add the event listener for fetch. 
//Step 1: Log the resulting url in the console log
//Step 2: Check if the resulting url matches something from the cache
//Step 3: Return the url from the cache if it exists there, otherwise fetch it

