const assets = [
    './',
    './client.js',
    './main.css',
    './service.js',
    './manifest.json',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
];


self.addEventListener('install', function () {
    console.log('Install event at ' + Date.now());
    caches.open('assets')
        .then(function (cache) {
            cache.addAll(assets);
        });
});

self.addEventListener('fetch', function (e) {
    console.log('Fetch event at' + Date.now());
    e.respondWith(async function () {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(e.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return fetch(e.request);
    }());


});