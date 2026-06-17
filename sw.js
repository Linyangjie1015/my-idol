var CACHE_NAME = 'my-idol-v1-6-7';
var CACHE_URLS = [
  '/index.html',
  '/v1.6.html',
  '/v1.6.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (event.request.method !== 'GET') return;

  var isApi = url.hostname.indexOf('supabase') !== -1 ||
              url.hostname.indexOf('vercel') !== -1 ||
              url.hostname.indexOf('api') !== -1;

  if (isApi) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return new Response(JSON.stringify({error: 'network'}), {
          headers: {'Content-Type': 'application/json'}
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      var fetchPromise = fetch(event.request).then(function(response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return cached;
      });
      return cached || fetchPromise;
    })
  );
});
