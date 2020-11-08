const CACHE_NAME = "VERSION-1";
const urlsToCache = ["index.html", "offline.html"];

//installation of sw
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache Opened");
      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      //for each request that there is return a fetch request
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//activate service worker
this.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
