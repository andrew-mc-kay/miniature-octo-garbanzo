const CACHE_NAME = 'family-share-v2';
const ASSETS = [
  '/miniature-octo-garbanzo/icon.png',
  '/miniature-octo-garbanzo/newcastle/',
  '/miniature-octo-garbanzo/newcastle/index.html',
  '/miniature-octo-garbanzo/newcastle/manifest.json',
  '/miniature-octo-garbanzo/trosa/',
  '/miniature-octo-garbanzo/trosa/index.html',
  '/miniature-octo-garbanzo/trosa/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // If any URL in the array 404s, addAll fails entirely.
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === 'POST' && url.pathname.endsWith('/upload')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('photos');
      
      const cache = await caches.open('shared-photos');
      await cache.put('/shared-file', new Response(file));
      
      const pathParts = url.pathname.split('/');
      // Correctly identifying the subfolder from the path
      const folderName = pathParts[pathParts.length - 2]; 

      return Response.redirect(`/miniature-octo-garbanzo/${folderName}/?shared=true`, 303);
    })());
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});