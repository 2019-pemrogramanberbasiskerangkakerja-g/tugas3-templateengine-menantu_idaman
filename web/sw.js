importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('pbkk').then(function(cache) {
      return cache.addAll([
        `/`,
        `/login.html`,
        `/register.html`
      ]);
    })
  );
 });

// self.addEventListener('fetch', function(event) {
//   console.log(event.request.url);

//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
// });

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open('pbkk')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            // .catch(function(err) {       // fallback mechanism
            //   return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
            //     .then(function(cache) {
            //       return cache.match('/offline.html');
            //     });
            // });
        }
      })
  );
});          
