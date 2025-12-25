const CACHE_NAME = 'family-share-v1.1';
const ASSETS = [
  '/miniature-octo-garbanzo/newcastle/',
  '/miniature-octo-garbanzo/newcastle/small_icon.png',
  '/miniature-octo-garbanzo/newcastle/large_icon.png',
  '/miniature-octo-garbanzo/newcastle/index.html',
  '/miniature-octo-garbanzo/newcastle/manifest.json',

  '/miniature-octo-garbanzo/trosa/',
  '/miniature-octo-garbanzo/trosa/small_icon.png',
  '/miniature-octo-garbanzo/trosa/large_icon.png',
  '/miniature-octo-garbanzo/trosa/index.html',
  '/miniature-octo-garbanzo/trosa/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Skip interception for the Lambda URL
  if (url.hostname.includes('lambda-url.eu-west-1.on.aws')) {
    return; // Let the browser handle this request normally
  }

  // 2. Handle the Share Target POST
  if (event.request.method === 'POST' && url.pathname.endsWith('/upload')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('photos');
      
      const cache = await caches.open('shared-photos');
      await cache.put('/shared-file', new Response(file));
      
      const pathParts = url.pathname.split('/');
      const folderName = pathParts[pathParts.length - 2]; 

      return Response.redirect(`/miniature-octo-garbanzo/${folderName}/?shared=true`, 303);
    })());
  } 
  // 3. Network-First for HTML, Cache-First for others
  else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force update
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});