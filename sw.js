var cacheName = "nw-v2:static";
var filesToCache = [
    "./",
    "./css/jquery.mobile-1.4.5.min.css",
    "./css/main.css",
    "./js/vendor/modernizr-2.8.3.min.js",
    "./js/vendor/jquery-1.11.2.min.js",
    "./js/vendor/jquery.mobile-1.4.5.min.js",
    "./js/vendor/localforage.min.js",
    "./js/plugins.js",
    "./js/main.js",
    "./js/night.js"
];

//install service worker
self.addEventListener("install", function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
            caches.open(cacheName).then(function(cache) {
                console.log("caching data");
                return cache.addAll(filesToCache);
            })
        );
});

// when the browser fetches a URL
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
