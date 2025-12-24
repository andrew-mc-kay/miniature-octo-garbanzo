const CACHE_NAME = 'family-share-v1';
const ASSETS = [
  '/miniature-octo-garbanzo/icon.png',
  // Newcastle Assets
  '/miniature-octo-garbanzo/newcastle/',
  '/miniature-octo-garbanzo/newcastle/index.html',
  '/miniature-octo-garbanzo/newcastle/manifest.json',
  // Trosa Assets
  '/miniature-octo-garbanzo/trosa/',
  '/miniature-octo-garbanzo/trosa/index.html',
  '/miniature-octo-garbanzo/trosa/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Dynamic Share Target Handler
  // Matches any path ending in /upload (e.g., .../newcastle/upload)
  if (event.request.method === 'POST' && url.pathname.endsWith('/upload')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('photos');
      
      const cache = await caches.open('shared-photos');
      await cache.put('/shared-file', new Response(file));
      
      // Extract the folder name (newcastle or trosa) from the URL
      // Path format: /miniature-octo-garbanzo/[folder]/upload
      const pathParts = url.pathname.split('/');
      const folderName = pathParts[pathParts.length - 2]; 

      // Redirect back to the specific folder
      return Response.redirect(`/miniature-octo-garbanzo/${folderName}/?shared=true`, 303);
    })());
    return;
  }

  // 2. Standard Offline Support
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});